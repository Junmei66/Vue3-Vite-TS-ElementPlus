import router from "@/router";
import { ElMessage } from "element-plus";
import { useUserStore } from "./store";
import { PathItem } from "./types/store";

router.beforeEach((to: any , from , next) => {
  const userId = localStorage.getItem('userId')
  if (!userId) {
    if(to.path === '/login'){
      next()
    }else{
      next('/login')
    }
  }else{
    const userStore = useUserStore()
    const hasRoles = userStore.roles && userStore.roles.length
    const name = userStore.name
    if(hasRoles){
      if(to.meta.roles){
        to.meta.roles.filter((item: string)=> {
          if(userStore.roles!.includes(item)){
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
      
    }else{
      userStore.getInfo().then(result=>{
        const { roles } = result
        if(to.meta.roles){
          to.meta.roles!.filter((item: string)=> {
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
      })
    }
  } 
})
