/**
 * AoE2DE Expert — small shared-room JSON store for a GitHub Pages client.
 * Copy this file to a standalone Apps Script project, then run setup() manually.
 * No Google credentials, room keys, profile content or Drive IDs are logged.
 * See README.md for deployment, CORS validation, and API examples.
 */
var STORE_ = Object.freeze({
  project: 'aoe2de-expert',
  schemaVersion: 1,
  fileName: 'aoe2de-expert-training-profiles.json',
  maxProfiles: 200,
  maxProfileBytes: 500 * 1024,
  maxRequestBytes: 2 * 1024 * 1024,
  maxDatabaseBytes: 4 * 1024 * 1024,
  lockWaitMs: 15000
});

/** Editor-only initialization: the web routes never dispatch to this function. */
function setup() {
  var lock = LockService.getScriptLock();
  if (!lock.tryLock(STORE_.lockWaitMs)) {
    throw new Error('Initialization busy. Try setup again later.');
  }
  try {
    var properties = PropertiesService.getScriptProperties();
    var fileId = properties.getProperty('DB_FILE_ID');
    var file;
    if (fileId) {
      // Never replace an unavailable/corrupt store with an empty one.
      file = DriveApp.getFileById(fileId);
      readDatabase_(file);
    } else {
      file = DriveApp.createFile(STORE_.fileName, JSON.stringify({
        project: STORE_.project,
        schemaVersion: STORE_.schemaVersion,
        profiles: {}
      }), 'application/json');
      // Persist immediately so a partial setup retry reuses the same file.
      properties.setProperty('DB_FILE_ID', file.getId());
    }
    // This file has no public/link/domain grant. Do not share it or move it into
    // a shared folder. This does not revoke separately granted individual access.
    file.setSharing(DriveApp.Access.PRIVATE, DriveApp.Permission.NONE);
    if (!properties.getProperty('ROOM_KEY')) {
      properties.setProperty('ROOM_KEY', newRoomKey_());
    }
    return {
      ok: true,
      ready: true,
      instructions: [
        'Copy ROOM_KEY from Project Settings > Script properties; do not log it.',
        'Deploy as a web app: Execute as Me; access Anyone (including anonymous).',
        'Put the /exec URL and ROOM_KEY into the website cloud connection dialog.',
        'Verify a readable JSON response from the deployed GitHub Pages origin.'
      ]
    };
  } finally {
    lock.releaseLock();
  }
}

/** Optional editor-only key rotation. Existing clients must reconnect. */
function rotateRoomKey() {
  var lock = LockService.getScriptLock();
  if (!lock.tryLock(STORE_.lockWaitMs)) throw new Error('Room busy. Try again later.');
  try {
    var properties = PropertiesService.getScriptProperties();
    if (!properties.getProperty('DB_FILE_ID') || !properties.getProperty('ROOM_KEY')) {
      throw new Error('Run setup first.');
    }
    properties.setProperty('ROOM_KEY', newRoomKey_());
    return {ok: true, instructions: 'Copy the new ROOM_KEY from Script properties and reconnect clients.'};
  } finally {
    lock.releaseLock();
  }
}

/** GET is health only. Query parameters cannot read or mutate profiles. */
function doGet() {
  return jsonOutput_({ok: true, service: STORE_.project, apiVersion: 1, transport: 'POST text/plain JSON'});
}

/** All data operations use POST, including authenticated reads. */
function doPost(e) {
  try {
    var request = parseRequest_(e);
    var properties = PropertiesService.getScriptProperties();
    var expectedKey = properties.getProperty('ROOM_KEY');
    var fileId = properties.getProperty('DB_FILE_ID');
    if (!expectedKey || !fileId) fail_('not_configured');
    if (!sameKey_(request.roomKey, expectedKey)) fail_('unauthorized');
    var action = canonicalAction_(request.action);
    if (!action) fail_('invalid_action');

    // Script-wide lock: every reader and writer observes the single Drive file
    // consistently, and a write reads + compares + replaces under this lock.
    var lock = LockService.getScriptLock();
    if (!lock.tryLock(STORE_.lockWaitMs)) fail_('busy');
    try {
      // Recheck after waiting, so an editor key rotation invalidates queued work.
      if (!sameKey_(request.roomKey, properties.getProperty('ROOM_KEY'))) fail_('unauthorized');
      var file;
      try {
        file = DriveApp.getFileById(fileId);
      } catch (ignored) {
        fail_('storage_unavailable');
      }
      var database = readDatabase_(file);
      if (action === 'catalog') {
        return jsonOutput_({ok: true, profiles: catalog_(database)});
      }
      if (action === 'get') {
        var profileId = validId_(request.profileId);
        if (!own_(database.profiles, profileId)) fail_('not_found');
        var profile = database.profiles[profileId];
        return jsonOutput_({ok: true, profile: profile, revision: profile.revision});
      }
      return jsonOutput_(putProfile_(database, file, request));
    } finally {
      lock.releaseLock();
    }
  } catch (error) {
    // Do not return exception text: platform messages can contain file IDs or
    // input fragments. Application errors use a small, predictable envelope.
    var result = {ok: false, error: error && error.apiCode_ || 'internal_error'};
    if (error && typeof error.currentRevision_ === 'number') {
      result.currentRevision = error.currentRevision_;
    }
    return jsonOutput_(result);
  }
}

function putProfile_(database, file, request) {
  var incoming = request.profile;
  if (!isObject_(incoming)) fail_('invalid_profile');
  var id = validId_(incoming.id);
  var name = validText_(incoming.name, 80, false);
  var focus = incoming.focus;
  if (['solo', 'team', 'mixed'].indexOf(focus) === -1) fail_('invalid_focus');
  if (!isObject_(incoming.state)) fail_('invalid_state');
  if (!Number.isSafeInteger(request.baseRevision) || request.baseRevision < 0) {
    fail_('invalid_revision');
  }
  if (byteLength_(JSON.stringify(incoming)) > STORE_.maxProfileBytes) {
    fail_('profile_too_large');
  }
  var exists = own_(database.profiles, id);
  var current = exists ? database.profiles[id] : null;
  var currentRevision = current ? current.revision : 0;
  if (request.baseRevision !== currentRevision) {
    fail_('revision_conflict', currentRevision);
  }
  if (!exists && Object.keys(database.profiles).length >= STORE_.maxProfiles) {
    fail_('profile_limit');
  }
  if (currentRevision >= Number.MAX_SAFE_INTEGER) fail_('revision_limit');
  var now = new Date().toISOString();
  var next = {
    id: id,
    name: name,
    focus: focus,
    state: incoming.state,
    revision: currentRevision + 1,
    createdAt: current ? current.createdAt : now,
    updatedAt: now
  };
  database.profiles[id] = next;
  var serialized = JSON.stringify(database);
  if (byteLength_(serialized) > STORE_.maxDatabaseBytes) fail_('storage_full');
  try {
    // The only public-route mutation. No writes occur before the revision check.
    file.setContent(serialized);
  } catch (ignored) {
    // The client must reread after a transport/write uncertainty, never assume
    // failure means the server could not have accepted the write.
    fail_('storage_write_failed');
  }
  return {ok: true, profile: next, revision: next.revision};
}

function parseRequest_(e) {
  if (!e || !e.postData || typeof e.postData.contents !== 'string') fail_('invalid_request');
  var type = String(e.postData.type || '').split(';')[0].trim().toLowerCase();
  if (type !== 'text/plain' && type !== 'application/json') fail_('unsupported_content_type');
  var text = e.postData.contents;
  // UTF-16 check before allocating UTF-8 bytes for very large requests.
  if (text.length > STORE_.maxRequestBytes || byteLength_(text) > STORE_.maxRequestBytes) {
    fail_('request_too_large');
  }
  var parsed;
  try { parsed = JSON.parse(text); } catch (ignored) { fail_('invalid_json'); }
  if (!isObject_(parsed)) fail_('invalid_request');
  return parsed;
}

function readDatabase_(file) {
  var text;
  try { text = file.getBlob().getDataAsString('UTF-8'); } catch (ignored) { fail_('storage_unavailable'); }
  if (text.length > STORE_.maxDatabaseBytes || byteLength_(text) > STORE_.maxDatabaseBytes) {
    fail_('storage_corrupt');
  }
  var database;
  try { database = JSON.parse(text); } catch (ignored) { fail_('storage_corrupt'); }
  if (!isObject_(database) || database.project !== STORE_.project ||
      database.schemaVersion !== STORE_.schemaVersion || !isObject_(database.profiles)) {
    fail_('storage_corrupt');
  }
  var ids = Object.keys(database.profiles);
  if (ids.length > STORE_.maxProfiles) fail_('storage_corrupt');
  ids.forEach(function (id) {
    var p = database.profiles[id];
    if (!idIsValid_(id) || !isObject_(p) || p.id !== id || !isObject_(p.state) ||
        typeof p.name !== 'string' || ['solo', 'team', 'mixed'].indexOf(p.focus) === -1 ||
        !Number.isSafeInteger(p.revision) || p.revision < 1 ||
        typeof p.createdAt !== 'string' || typeof p.updatedAt !== 'string') {
      fail_('storage_corrupt');
    }
  });
  return database;
}

function catalog_(database) {
  return Object.keys(database.profiles).sort().map(function (id) {
    var p = database.profiles[id];
    return {id: p.id, name: p.name, focus: p.focus, revision: p.revision};
  });
}

function canonicalAction_(action) {
  if (action === 'catalog' || action === 'getCatalog') return 'catalog';
  if (action === 'get' || action === 'getProfile' || action === 'read') return 'get';
  if (action === 'put' || action === 'upsertProfile') return 'put';
  return null;
}

function validId_(value) {
  if (!idIsValid_(value)) fail_('invalid_profile_id');
  return value;
}

function idIsValid_(value) {
  return typeof value === 'string' && /^[A-Za-z0-9_-]{1,100}$/.test(value) &&
    value !== '__proto__' && value !== 'prototype' && value !== 'constructor';
}

function validText_(value, max, allowEmpty) {
  if (typeof value !== 'string' || value.length > max || /[\u0000-\u001f\u007f]/.test(value)) {
    fail_('invalid_profile');
  }
  var text = value.trim();
  if (!allowEmpty && !text) fail_('invalid_profile');
  return text;
}

function isObject_(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function own_(value, key) {
  return Object.prototype.hasOwnProperty.call(value, key);
}

function sameKey_(supplied, expected) {
  if (typeof supplied !== 'string' || typeof expected !== 'string' || !expected) return false;
  var mismatch = supplied.length ^ expected.length;
  for (var i = 0; i < expected.length; i++) {
    mismatch |= (supplied.charCodeAt(i) || 0) ^ expected.charCodeAt(i);
  }
  return mismatch === 0;
}

function newRoomKey_() {
  return Utilities.getUuid().replace(/-/g, '') + Utilities.getUuid().replace(/-/g, '');
}

function byteLength_(text) {
  return Utilities.newBlob(text).getBytes().length;
}

function fail_(code, currentRevision) {
  var error = new Error(code);
  error.apiCode_ = code;
  if (typeof currentRevision === 'number') error.currentRevision_ = currentRevision;
  throw error;
}

function jsonOutput_(data) {
  // TextOutput has no setHeader()/setStatusCode(); do not invent those APIs.
  // Google handles its ContentService redirect and response CORS headers.
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
