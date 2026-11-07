# HTML 学习笔记（练习站）

![HTML 学习笔记](cover.png)

一个练手用的多页静态网站，纯 HTML + CSS + 原生 JavaScript，没有框架、没有构建步骤，双击 `index.html` 就能打开。

## 页面

| 文件 | 内容 | 练的知识点 |
| --- | --- | --- |
| `index.html` | 首页：介绍、四张卡片、学习清单 | 语义化标签、Grid 布局 |
| `project.html` | 三个练习项目 + 踩过的坑 | 列表、`code`、内部链接 |
| `quotes.html` | 四句名言 | `blockquote`、`cite` |
| `tips.html` | 网页设计小知识：六条法则 + 正反示例 | 对比、留白、对齐、配色 |
| `machine.html` + `machine.js` | 加减乘除小工具 | 表单、`select`、JS 计算与错误处理 |
| `contact.html` | 留言表单（不会真的发送） | `label`、`required`、`preventDefault` |

## 其他文件

- `styles.css`：全站统一样式，蓝灰配色、卡片布局，600px 以下单列
- `nav.js`：点亮当前导航、填写页脚年份、注册 Service Worker、显示安装按钮
- `manifest.webmanifest`：PWA 清单（名称、图标、全屏显示）
- `sw.js`：Service Worker，缓存页面让它离线可用
- `favicon.svg` / `favicon.ico`：浏览器标签页图标（`.ico` 也用于 Windows 快捷方式）
- `icon-192.png` / `icon-512.png` / `icon-maskable-512.png` / `apple-touch-icon.png`：装到桌面后的应用图标

## 手机端 / 安装到桌面

页面在 600px 以下自动切换单列布局，导航换行、卡片堆叠、对比示例变成上下两栏。

**怎么装到手机桌面**

- **Android / Chrome**：打开页面后浏览器会提示，或点右下角「安装到手机」，或在菜单里选「安装应用」
- **iOS / Safari**：点底部「分享」→「添加到主屏幕」（iOS 不支持网页一键安装）

装好后点开是全屏的，没有地址栏；断网也能打开，因为 `sw.js` 缓存了页面。

> 改了页面内容后，记得把 `sw.js` 里的 `CACHE = 'html-notes-v1'` 改成 `v2`、`v3`，否则访问过的设备还是旧缓存。

## 怎么打开

直接双击 `index.html`，或者在 VSCode 里用 Live Server 打开。页面之间用相对路径链接，不依赖服务器。

## 注意

- `contact.html` 的表单只做前端演示，**不会真的发送**数据
- `machine.html` 里除以 0、输入非数字都会给出提示，不会出现 `Infinity`
