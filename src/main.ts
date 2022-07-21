import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "./permission.ts";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import { createPinia } from 'pinia'

const pinia = createPinia()
const app = createApp(App)

for(const [key, comp] of Object.entries(ElementPlusIconsVue)){
  app.component(key, comp as any)
}


app.use(ElementPlus)
app.use(router)
app.use(pinia)
app.mount('#app')
