# Vue3-Vite-TS-ElementPlus
Vite构建Vue3+TS+ElementPlus+Pinia+Echarts简易模板，使用Json-server模拟数据，包含用户登录，路由权限，Echart视图化，数据增删改查等基本功能

### 插件备注
1. 预构建插件，处理首次加载慢问题：yarn add -D vite-plugin-optimize-persist vite-plugin-package-config
2. 按需引入ElementPlus: yarn add -D unplugin-auto-import unplugin-vue-components
3. ElementPlus设置为中文：在main.ts中import locale from "element-plus/lib/locale/lang/zh-cn"，并app.use(ElementPlus, {locale})

### 安装json-server
1. yarn add json-server
2. 在根目录创建db.json文件
3. json-server --watch db.json

## 项目安装启动
1. 安装：yarn
2. 运行：yarn dev
3. 运行mock: yarn mock

## 首次进入白屏优化
1. SPA单页面应用首次绘制白屏，在入口文件index.html添加loading动画
2. 路由页面渲染前还有段时间白屏，此时组件已经可以使用，可在APP.vue加Elloading

## 开发环境、测试环境配置
1. 根目录下创建.env.development文件和.env.production文件,在里面创建以VITE开头命名的变量名,注意：根目录和VITE开头2个关键，创建后需要重新启动项目才会起作用
2. 在vite-env.d.ts文件定义上面2个文件中的参数类型
3. 页面引用时，使用 import.meta.env.变量名 即可