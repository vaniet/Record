# 部署说明

## GitHub Pages 部署步骤

### 1. 准备工作

确保你的 GitHub 仓库名称为 `Record`（如果不同，需要修改 `vite.config.js` 中的 `base` 路径）

### 2. 启用 GitHub Pages

1. 进入 GitHub 仓库的 Settings
2. 找到 Pages 选项
3. 在 Source 中选择 `gh-pages` 分支
4. 保存设置

### 3. 配置 GitHub Actions

项目已包含 `.github/workflows/deploy.yml` 文件，会自动：
- 监听 `main` 分支的推送
- 自动构建项目
- 部署到 `gh-pages` 分支

### 4. 首次部署

1. 将代码推送到 GitHub：
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. GitHub Actions 会自动运行，大约 2-3 分钟后完成部署

3. 访问 `https://[你的用户名].github.io/Record/` 查看网站

### 5. 后续更新

每次推送到 `main` 分支，GitHub Actions 都会自动重新构建和部署。

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器（使用 / 作为 base）
npm run dev

# 构建生产版本（使用 /Record/ 作为 base）
npm run build

# 预览生产构建
npm run preview
```

## 注意事项

- 项目使用 HashRouter 以确保在 GitHub Pages 上正常工作
- 生产环境的 base 路径为 `/Record/`，开发环境为 `/`
- 如果仓库名称不是 `Record`，需要修改 `vite.config.js` 中的 `base` 配置

## 故障排除

### 问题：页面显示空白

如果部署后页面显示空白，请按以下步骤排查：

1. **检查仓库名称**
   - 确认 GitHub 仓库名称是否为 `Record`
   - 如果不同，修改 `vite.config.js` 中的 `base` 路径为 `/[你的仓库名]/`

2. **检查 GitHub Actions 部署状态**
   - 进入仓库的 Actions 标签页
   - 确认最新的 workflow 运行是否成功（显示绿色 ✓）
   - 如果失败，查看错误日志

3. **检查 GitHub Pages 设置**
   - 进入仓库 Settings > Pages
   - 确认 Source 选择的是 `gh-pages` 分支
   - 确认分支已正确部署

4. **检查浏览器控制台**
   - 按 F12 打开开发者工具
   - 查看 Console 标签是否有 JavaScript 错误
   - 查看 Network 标签，确认资源文件（.js, .css）是否正确加载（状态码应为 200）
   - 如果资源文件返回 404，可能是 base 路径配置错误

5. **清除浏览器缓存**
   - 按 Ctrl+Shift+R（Windows）或 Cmd+Shift+R（Mac）强制刷新页面
   - 或者在浏览器设置中清除缓存

6. **本地预览生产构建**
   ```bash
   npm run build
   npm run preview
   ```
   在本地预览生产版本，确认构建是否有问题

7. **验证构建输出**
   - 检查 `dist/index.html` 中的资源路径是否包含 `/Record/` 前缀
   - 例如：`<script src="/Record/assets/index-xxx.js"></script>`

8. **重新部署**
   - 如果问题持续，可以尝试重新触发部署：
     - 在 Actions 页面，点击失败的 workflow，选择 "Re-run jobs"
     - 或者推送一个空提交：`git commit --allow-empty -m "Trigger rebuild" && git push`

