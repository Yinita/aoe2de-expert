# 共享训练档案：Apps Script + Drive

**当前只有可部署源码，尚未部署 Apps Script、接通真实 Drive，也未验证真实 GitHub Pages 跨域请求。** 把这些文件推送到 GitHub 不会自动创建云端服务。

这是一个供小规模内测使用的共享房间：管理员授权一次 Google，普通使用者不需要验证码或 Google 登录。知道共享 `roomKey` 的人可以切换、读取和更新房间里所有档案；没有个人账号或档案级权限。

## 管理员部署：6 步

1. 在 [Apps Script](https://script.google.com/) 新建**独立项目**，把本目录 `Code.gs` 复制进去。
2. 打开“项目设置 → 在编辑器中显示 appsscript.json”，复制本目录的清单。代码使用 `DriveApp`，管理员会看到其所需的 Drive 授权；代码仅创建本项目 JSON，之后只访问属性指定的该文件，不扫描或修改其它 Drive 文件。
3. 在编辑器选择 `setup` 并手工运行，按 Google 界面授权。它创建 `aoe2de-expert-training-profiles.json`，设置为受限，并生成 `ROOM_KEY`。重复运行会保留已有 key 和资料；文件不可访问或损坏时停止，不会用空库替换。
4. 在“项目设置 → 脚本属性”复制 `ROOM_KEY`，保留 `DB_FILE_ID`。到 Drive 确认新文件“常规访问权限”为“受限”。不要分享该文件、移入共享文件夹、修改 DB_FILE_ID 或公开属性截图；PRIVATE 不会撤销管理员后来单独添加的共享人员。
5. 选择“部署 → 新建部署 → Web 应用”，执行身份选“我”，访问权限选“任何人（包括未登录者）”。复制 **`https://script.google.com/macros/s/.../exec`**，不是只供编辑者测试的 `/dev`。若组织策略不允许匿名访问，需要管理员处理或更换后端，网页不能绕过。
6. 在网站云端连接框填入 `/exec` 和 `ROOM_KEY`，完成下方真实部署验收。更新代码后，在“管理部署”编辑现有部署并选择新版本，否则 `/exec` 可能仍使用旧代码。

口令只由 `setup()` 写进 Script Properties；不进入仓库、Drive JSON、日志或健康响应。邀请链接如使用 fragment，仍是可转发的房间凭据，不要公开。泄露时在编辑器运行 `rotateRoomKey()`，再从属性复制新 key 并让设备重新连接；已有档案保留。公开路由不能运行 setup 或轮换。

## API

所有资料操作都是 **POST**，body 是 JSON；浏览器头使用 `Content-Type: text/plain;charset=UTF-8`。每个请求都携带运行时填写的 `roomKey`。

| action | 其它参数 | 成功响应 |
| --- | --- | --- |
| `catalog` | 无 | `{ok:true,profiles:[{id,name,focus,revision}]}`；仅目录，不含 state |
| `get` | `profileId` | `{ok:true,profile,revision}` |
| `put` | `profile:{id,name,focus,state}`, `baseRevision` | `{ok:true,profile,revision}` |

`profile` 成功返回时另含服务器生成的 `revision`、`createdAt`、`updatedAt`。ID 为 `/^[A-Za-z0-9_-]{1,100}$/`，拒绝 `__proto__`、`constructor`、`prototype`；name 1–80 个 UTF-16 字符，不含控制字符；focus 仅 `solo/team/mixed`；state 为前端归一化后的 JSON 对象。

新建示例：

```json
{"action":"put","roomKey":"<运行时填写>","baseRevision":0,"profile":{"id":"player-example","name":"训练档案示例","focus":"mixed","state":{}}}
```

更新必须使用最近读取/写入成功的 revision 作为 baseRevision。后端在 `ScriptLock` 内读取文件、比较**该档案**版本、写回；成功后版本加一，保留 createdAt 和其它档案。put 替换整个 state，不自动合并数组或字段。

过期写入返回 `{"ok":false,"error":"revision_conflict","currentRevision":2}`，不写文件。前端应保留本地草稿、重新读取并提示用户比较/合并；**不能自动换成 currentRevision 重发旧 state**。网络失败也不证明写入未发生，重试前先读取云端。

兼容别名：`getCatalog → catalog`，`getProfile/read → get`，`upsertProfile → put`。GET 仅健康信息，任何 GET 参数都不能读写档案；没有删除、重置、任意 Drive ID 接口。

应用错误为 `{ok:false,error:"错误码"}`，不能仅用 HTTP 200 判断成功：

- 授权/配置：`not_configured`、`unauthorized`。
- 请求：`invalid_action`、`invalid_request`、`invalid_json`、`unsupported_content_type`、`invalid_profile_id`、`invalid_profile`、`invalid_focus`、`invalid_state`、`invalid_revision`。
- 档案/容量：`not_found`、`revision_conflict`、`revision_limit`、`request_too_large`、`profile_too_large`、`profile_limit`、`storage_full`。
- 运行/存储：`busy`、`storage_unavailable`、`storage_corrupt`、`storage_write_failed`、`internal_error`。错误不回显输入、口令或底层异常。

## CORS 与客户端请求

ContentService 将响应重定向到一次性的 `script.googleusercontent.com` 地址，客户端需跟随重定向。TextOutput 没有自定义响应头或状态码 API；本实现不虚构 `setHeader()` 或 `doOptions()`。

`text/plain` 简单 POST 用于避免预检；它本身**不证明响应已经可跨域读取**。Google 的真实响应头、部署权限和浏览器环境须现场验证。禁止用 `no-cors` 的不透明响应假装保存成功。收到登录 HTML、CORS 阻止或错误重定向时，应显示失败并保留本地数据。

```js
async function callCloud(endpoint, roomKey, payload) {
  const response = await fetch(endpoint, {
    method: 'POST', mode: 'cors', credentials: 'omit', redirect: 'follow',
    headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
    body: JSON.stringify({ ...payload, roomKey })
  });
  if (!response.ok) throw new Error('cloud_transport_error');
  let result;
  try { result = JSON.parse(await response.text()); }
  catch { throw new Error('cloud_invalid_response'); }
  if (!result || typeof result.ok !== 'boolean') throw new Error('cloud_invalid_response');
  return result; // 保存成功还必须检查 result.ok === true
}
```

## 验证与限制

本地 VM 使用两个隔离客户端共享锁/文件 stub，已验证：创建/更新、锁争用、旧 revision 被拒且不写、错误 key 无法读取、不覆盖其它档案、createdAt 保留、非法 ID/focus/state、容量限制、损坏库不覆盖、setup 幂等和 key 轮换。**这不是实际 Apps Script、Drive 或 CORS 测试。**

真实部署后需完成：

1. 未登录 Google 打开 `/exec`，看到健康 JSON，且无 key、Drive ID 或资料。
2. 从**实际 GitHub Pages origin** 发 catalog，JavaScript 可读 JSON，确认重定向后不是登录 HTML。
3. 错误/缺少 key 返回 unauthorized；GET `?action=put` 不写；目录无 state。
4. 设备 A/B 都读取 revision 1；A 保存到 2，B 用 1 保存必须 conflict，A 内容仍在；另一设备可切换读取其它档案。
5. 断网时不显示已同步；恢复后先读取版本。Drive 文件始终受限，内容只属于本项目。

内测上限：200 档案、单档案 500 KiB、请求 2 MiB、整库 4 MiB；整库限额可能先于档案数到达。所有操作读取一个 JSON 文件，并受 Apps Script/Drive 配额和执行限制影响；更大规模应迁移数据库。不要在 Drive 里直接编辑 JSON，否则会绕过版本保护。

官方依据：[Web Apps](https://developers.google.com/apps-script/guides/web)、[Content Service / 重定向](https://developers.google.com/apps-script/guides/content)、[TextOutput](https://developers.google.com/apps-script/reference/content/text-output)、[Web App manifest](https://developers.google.com/apps-script/manifest/web-app-api-executable)、[DriveApp](https://developers.google.com/apps-script/reference/drive/drive-app)、[File](https://developers.google.com/apps-script/reference/drive/file)、[PropertiesService](https://developers.google.com/apps-script/reference/properties/properties-service)、[LockService](https://developers.google.com/apps-script/reference/lock/lock-service)、[Lock](https://developers.google.com/apps-script/reference/lock/lock)、[Utilities](https://developers.google.com/apps-script/reference/utilities/utilities)。
