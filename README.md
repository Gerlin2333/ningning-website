# 官网（静态单页）

手机优先的纯静态页面，无构建步骤。入口 `index.html`，图片在 `img/`。

## 上线前要填的内容

只改 `index.html` 底部 `SITE` 对象：

- `apkUrl`：安卓安装包地址。可以是 `downloads/xxx.apk`（把 APK 放进本目录），也可以是外链。留空时按钮显示「即将上线」。
- `apkVersion`、`apkSize`：按钮下方的版本与大小说明，可留空。
- `contacts`：小红书、抖音，用户名都是「白菜抽子」。`url` 留空时点击复制用户名，填了主页链接则直接跳转。

## 本地预览

```bash
cd website && python3 -m http.server 8765
```

## 部署

- Cloudflare Pages：构建命令留空，输出目录填 `website`。
- GitHub Pages：把 `website/` 目录发布为站点根目录（例如用 Actions 的 `upload-pages-artifact`，`path: website`）。

APK 在 GitHub Pages 上受单文件 100 MB 限制，较大时建议放 Cloudflare R2 或其他对象存储，再把外链填进 `apkUrl`。
