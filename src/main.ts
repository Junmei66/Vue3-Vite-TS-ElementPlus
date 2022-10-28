import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "./permission.ts";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import locale from "element-plus/lib/locale/lang/zh-cn" // 设置组件默认为中文

import { createPinia } from 'pinia'

const pinia = createPinia()
const app = createApp(App)

for(const [key, comp] of Object.entries(ElementPlusIconsVue)){
  app.component(key, comp as any)
}

app.use(ElementPlus, {locale})
app.use(router)
app.use(pinia)
app.mount('#app')
