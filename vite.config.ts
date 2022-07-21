import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: "./", // build/index.html 资源路径
  resolve: {
    // extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'], // 默认，可根据需要配置
    alias: {
      "@": path.resolve(__dirname,"src")
    }
  },
  server: {
    proxy: {
      "^/api": {
        target: 'http://localhost:3100',
        changeOrigin: true,
        rewrite: (path) => {
          console.log(path,'path')
          return path.replace(/^\/api/,"")
        }
      }
    }
  }
  
})
