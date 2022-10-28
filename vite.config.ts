import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    }),
  ],
  base: "./", // build/index.html 资源路径
  resolve: {
    // extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'], // 默认，可根据需要配置
    alias: {
      "@": path.resolve(__dirname,"src")
    }
  },
  build: {
    assetsDir: "assets",
    sourcemap: false,
    // 配置打包文件路径和命名
    rollupOptions: {
      output: {
        // 超大静态资源拆分
        manualChunks(id){
          if(id.includes('node_modules')){
            return id.toString().split('node_modules/')[1].split('/')[0].toString()
          }
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      }
    },
    
    // // 清除console和debugger
    minify: 'terser', // 使用terserOptions需要配置
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
  }
  
})
