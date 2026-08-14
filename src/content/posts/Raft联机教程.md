---
title: Raft 联机教程
published: 2026-08-14T14:19:00.000Z
updated: 2026-08-14T14:22:00.000Z
description: 用 Astral 自研 AstralRaftNet.dll 给新版 Raft 做局域网联机：自动注入、启用 Astral 局域网、LAN 发现加入。
image: ''
tags: [教程, AstralGame, Raft, 联机]
category: AstralGame
draft: false
lang: zh_CN
---

新版 Raft 走 PlayFab P2P，没法直接用虚拟 IP 联机。Astral 为此写了适配插件 **AstralRaftNet.dll**：把对战改成 TCP `IP:端口`，进 **Raft** 房间后会自动注入到 `Raft.exe`。

软件操作见 [AstralGame 使用教程](/posts/AstralGame使用教程/)。下载：[AstralGame](https://next.astral.fan/game/)

视频演示：

::bilibili{bvid="BV1cjgw6iENY"}

[B 站打开](https://www.bilibili.com/video/BV1cjgw6iENY/)

:::important
房主和加入者必须用 **不同 Steam 账号**。
:::

## 一、Astral 里开 Raft 房间

1. 打开 AstralGame，左侧进入 **联机**
2. **房主**点 **创建**，游戏选 **Raft**（不要选「其他」，否则不会注入 DLL）
3. 把短码 / 分享链接发给好友
4. **成员**在 **联机 → 加入** 里粘贴短码
5. 等所有人显示已连接

:::tip
房主建议先加一台可用服务器。成员一般只需加入短码。
:::

## 二、启动游戏，等自动注入

1. 连接成功后再开 `Raft.exe`
2. 等几秒，Astral 会检测进程并注入 `AstralRaftNet.dll`
3. 游戏首页右上角出现 **Astral已注入** 即成功

没出现徽章时：确认房间类型是 Raft、防火墙没拦、过几秒再看。备用面板按 **F7**。

## 三、房主：开世界

1. **新世界** 或 **载入世界**
2. 勾选 **启用Astral局域网**（Steam 离线也能建房）
3. 联机权限不要选「不允许」
4. 进入世界即可

插件会在 TCP **6488** 听连接，并用 UDP **6489** 做局域网发现。

## 四、成员：加入世界

1. 点 **加入世界**
2. 会发现加入世界的UI不同 说明成功了
3. 列表是 **lan发现**，点刷新
4. 选中房主房间再加入

第一次加入会等场景加载完再向房主要世界，避免 Connecting 超时被踢回主页（简单说就是如果第一次加入失败不要紧张正常 第二次就成功了）。

:::note
列表刷不出来时，用 **F7** 打开备用 IP 面板，填房主在 Astral 里显示的 **虚拟 IP**（端口默认 6488），不要填本机回环地址。
:::

## 常见问题

| 现象 | 处理 |
| --- | --- |
| 没有「Astral已注入」 | 房间必须选 Raft；先连 Astral 再开游戏 |
| 加入列表是空的 | 房主是否勾了启用 Astral 局域网；点刷新； |
| 提示不能加入自己 | 换另一个 Steam 账号 / 另一台电脑，不要填 `127.0.0.1` |
| 当前窗口已经是房主 | 加入请用另一个 Raft 客户端 |
| 进世界超时踢回主页 | 等注入完成后再加；第一次加载世界会稍慢，属正常 |
