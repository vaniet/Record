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

