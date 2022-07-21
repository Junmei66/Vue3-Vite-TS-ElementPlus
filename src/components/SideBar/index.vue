<template>
  <el-menu
    :default-active="activeMenu"
    mode="horizontal"
    class="el-menu-demo"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
  <template v-for="(item, k) in showRoutes" :key="k">
    <!-- <el-sub-menu v-if="item.children?.length>1" :index="(k + 1).toString()"> -->
    <el-sub-menu v-if="item.children?.length>1" :index="item.redirect? item.redirect:item.path">
      <template #title>
        <el-icon>
          <component :is="item.meta?item.meta.icon:item.children[0].meta.icon" />
        </el-icon>
        <span>{{ item.meta ? item.meta.title : item.children[0].meta.title }}</span>
      </template>
      <el-menu-item
          v-for="(row, i) in item.children"
          :key="k+'-'+i"
          :index="row.path">
          <router-link :to="row.redirect? row.redirect:row.path">{{ row.meta.title }}</router-link>
      </el-menu-item>
    </el-sub-menu>
    <!-- <el-menu-item v-else :index="(k + 1).toString()"> -->
    <el-menu-item v-else :index="item.redirect? item.redirect:item.path">
      <router-link :to="item.path">
        <el-icon>
          <component :is="item.meta?item.meta.icon:item.children[0].meta.icon" />
        </el-icon>
        <span>{{ item.meta?item.meta.title:item.children[0].meta.title }}</span>
      </router-link>
    </el-menu-item>
  </template>
  </el-menu>
</template>

<script lang="ts">
import { useUserStore } from "@/store";
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { routes } from "../../router";
export default defineComponent({
  name: "SideBar",
  setup: () => {
    const router = useRouter();
    // console.log(router, "router");
    const curRt = router.currentRoute.value
    const activeRoute = ref(curRt);
    const activeMenu = ref(curRt.path);

    // console.log(curRt,activeMenu, "activeRoute");
    const userStore = useUserStore()
    const showRoutes = routes.filter((route: any)=>{
      // console.log(route,'route')
        if(route.meta?.hidden){
          return false
        }else{
          if(route.meta?.roles){
              const {roles} = userStore.userProfile
              console.log(roles,'有吗')
              debugger
              route.meta?.roles.filter((item: string) => {
                if(roles.includes(item)){
                  return true
                }else{
                  return false
                }
              })
          }else{
            return true
          }
        }
      })
    
    console.log(showRoutes,'showRoutes')
    return { showRoutes, activeRoute, activeMenu };
  },
});
</script>

<style scoped lang="scss">
a {
  text-decoration: none;
  color: #ffffff;
}
.el-menu-item.is-active a {
  color: #ffd04b;
}
</style>
