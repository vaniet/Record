import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages 部署时，base 路径需要匹配仓库名称
  // 如果仓库名称不是 Record，请修改这里的路径
  base: process.env.NODE_ENV === 'production' ? '/Record/' : '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
})
