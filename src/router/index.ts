import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Layout from "@/components/Layout.vue"

export const routes: Array<RouteRecordRaw> = [
  { 
    path: '/login', 
    name: 'Login',
    component: () => import("@/views/login/index.vue"),
    meta: {title: '登录', hidden: true},
  },
  { 
    path: '/', 
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import("@/views/home/index.vue"),
        meta: {title: '首页', icon: 'FolderChecked'}
      },
    ]
  },
  { 
    path: '/manage', 
    component: Layout,
    redirect: '/manage/index',
    meta: {title: '管理', icon: 'Edit'},
    children: [
      {
        path: '/manage/index',
        name: 'Manage',
        component: () => import("@/views/manage/index.vue"),
        meta: {title: '表格数据'}
      },
      {
        path: '/manage/record',
        name: 'Setting',
        component: () => import("@/views/manage/record.vue"),
        meta: {title: '更新记录', roles: ["admin"]},
      }
    ]
  },
  { 
    path: '/user-center',
    component: Layout,
    redirect: '/user-center/index',
    children: [
      {
        path: '/user-center/index',
        name: 'UserCenter',
        component: () => import("@/views/user-center/index.vue"),
        meta: {title: '个人中心', icon: 'User'},
      }
    ]
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})


export default router