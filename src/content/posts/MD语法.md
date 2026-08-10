---
title: MD语法
published: 2025-02-27T21:00:03.481Z
description: 本博客支持的 Markdown 写法速查：基础语法、提示框、卡片组件、数学公式等。
image: ./cover.webp
tags: [教程, MD]
category: 教程
draft: false
---

## Frontmatter

每篇文章开头需要 YAML 头信息：

```yaml
---
title: 文章标题
published: 2025-02-27T21:00:03.481Z
updated: 2025-03-01T12:00:00.000Z   # 可选
description: 列表页摘要，不写则自动截取正文
image: ./cover.webp                  # 封面：相对路径 / 站点路径 / 完整 URL
tags: [教程, MD]
category: 教程
draft: false                         # true 时生产环境不展示
lang: zh_CN                          # 可选，默认跟随站点语言
---
```

新建文章可用：

```bash
pnpm new-post 文件名
```

## 基础 Markdown

### 标题

```md
# 一级标题
## 二级标题
### 三级标题
```
![[about]]
![[Screenshot_2026-08-10-20-15-08-346_fan.astral.next.game.jpg]]
### 强调与行内

```md
**加粗** *斜体* ~~删除线~~ `行内代码`
[链接文字](https://acg-n.cn)
![图片说明](./image.png)
```

### 列表

```md
- 无序一项
- 无序二项

1. 有序一项
2. 有序二项

- [ ] 待办
- [x] 已完成
```

### 引用与分隔

```md
> 这是引用文字

---
```

### 代码块

````md
```js
console.log('hello')
```
````

### 表格

```md
| 名称 | 说明 |
|------|------|
| Astro | 静态站点框架 |
| Markdown | 文章书写格式 |
```

## 提示框（Admonition）

支持两种写法。

### 指令写法

```md
:::note[自定义标题]
普通说明
:::

:::tip
提示信息
:::

:::important
重要信息
:::

:::warning
警告信息
:::

:::caution
危险 / 谨慎操作
:::
```

### GitHub 风格写法

```md
> [!NOTE]
> 说明

> [!TIP]
> 提示，例如 [acg-n.cn](https://acg-n.cn)

> [!IMPORTANT]
> 重要

> [!WARNING]
> 警告

> [!CAUTION]
> 危险
```

### 示例

:::note[自定义标题]
这是 note 提示框。
:::

:::tip
这是 tip 提示框。
:::

:::important
这是 important 提示框。
:::

:::warning
这是 warning 提示框。
:::

:::caution
这是 caution 提示框。
:::

> [!TIP]
> GitHub 风格 TIP，可内嵌 [链接](https://acg-n.cn)。

## GitHub 卡片

叶子指令，只填仓库 `owner/repo`，会请求 GitHub API 展示简介、Star 等：

```md
::github{repo="ldoubil/ldoubil"}
```

### 示例

::github{repo="ldoubil/ldoubil"}

## 下载卡片（夸克网盘等）

容器指令：`[]` 里写大标题，正文每行一个 Markdown 链接——文字是行标题，括号里是下载 URL（夸克、蓝奏、直链均可）。

```md
:::download[夸克网盘资源]
- [Windows 安装包](https://pan.quark.cn/s/xxxx)
- [Mac 安装包](https://pan.quark.cn/s/yyyy)
- [使用说明 PDF](https://pan.quark.cn/s/zzzz)
:::
```

### 示例

:::download[夸克网盘资源]
- [Windows 安装包](https://pan.quark.cn/s/xxxx)
- [Mac 安装包](https://pan.quark.cn/s/yyyy)
- [使用说明 PDF](https://pan.quark.cn/s/zzzz)
:::

## Bilibili 视频卡

叶子指令，填 BV 号即可嵌入播放器；可选 `p` 指定分 P：

```md
::bilibili{bvid="BV1GJ411x7h7"}
::bilibili{bvid="BV1GJ411x7h7" p="1"}
```

### 示例

::bilibili{bvid="BV1GJ411x7h7"}

## 外链预览卡

叶子指令，手动填写标题/描述（静态站不做 OG 抓取）：

```md
::link{url="https://acg-n.cn" title="未闻花名" desc="个人博客"}
::link{url="https://astro.build" title="Astro" desc="Web framework for content-driven websites" image="https://astro.build/og/astro.jpg"}
```

### 示例

::link{url="https://acg-n.cn" title="未闻花名" desc="个人博客"}

## 相册 / 多图卡

容器指令：大标题 + 多张 Markdown 图片，点击可走站内灯箱：

```md
:::gallery[示例相册]
![示例图 A](https://t.alcy.cc/pc)
![示例图 B](https://t.alcy.cc/acg)
:::
```

### 示例

:::gallery[示例相册]
![示例图 A](https://t.alcy.cc/pc)
![示例图 B](https://t.alcy.cc/acg)
:::

## 数学公式（KaTeX）

行内：`$E = mc^2$` → $E = mc^2$

块级：

```md
$$
\int_0^1 x^2 \, dx = \frac{1}{3}
$$
```

$$
\int_0^1 x^2 \, dx = \frac{1}{3}
$$

## 图片

封面写在 frontmatter 的 `image`；正文图片：

```md
![说明文字](./相对路径.png)
![说明文字](/public下的路径.png)
![说明文字](https://example.com/a.png)
```

本地相对路径会走 Astro 图片优化；外链直接加载。加载中会显示骨架动画。

## 常用约定

1. 文章文件名即 URL slug，例如 `MD语法.md` → `/posts/MD语法/`
2. `draft: true` 只在本地开发可见，正式构建会隐藏
3. 自定义卡片、提示框都属于 **指令语法**，注意 `::` / `:::` 与结尾 `:::`
4. 单行叶子指令：`::github` / `::bilibili` / `::link`
5. 多行容器指令：`:::download` / `:::gallery` / `:::note`
