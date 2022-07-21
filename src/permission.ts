import router from "@/router";
import { ElMessage } from "element-plus";
import { useUserStore } from "./store";
import { PathItem } from "./types/store";

router.beforeEach((to , from , next) => {
  // console.log(to,'路由拦截')
  const userId = localStorage.getItem('userId')
  console.log(userId,'路由拦截userId')
  if(!userId && to.path !== '/login'){
    next('/login')
  }else{
    const userStore = useUserStore()
    userStore.getInfo()
    if(to.meta.roles){
      const { roles, name } = userStore.userProfile
      console.log(roles, to.meta.roles, "对比")
      to.meta.roles.filter((item: string)=> {
        if(roles.includes(item)){
          next()
        }else{
          ElMessage({
            type: 'warning',
            message: "用户" + name + "没有"+ to.meta.title + "页面访问权限",
          })
        }
      })
    }else{
      next()
    }
  } 
})
