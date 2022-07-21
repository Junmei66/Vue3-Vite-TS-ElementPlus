<template>
  <div class="user-box">
    <el-dropdown trigger="click">
    <span class="el-dropdown-link">
      <el-avatar class="avatar" :size="32" :src="circleUrl" />
      <span class="name">{{userInfo.name}}</span>
      <el-icon><CaretBottom /></el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="loginOut">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  </div>
</template>

<script lang="ts">
export default {
    name: "Avatar",
};
</script>

<script lang="ts" setup>
import { computed, reactive, ref, toRefs } from 'vue'
import { useRouter } from 'vue-router';
import { useUserStore } from '@/store';

const state = reactive({
  circleUrl:
    'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
  squareUrl:
    'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
  sizeList: ['small', '', 'large'] as const,
})
const { circleUrl, squareUrl, sizeList } = toRefs(state)

const userStore = useUserStore()
const userInfo = computed(() => {
  return userStore.userProfile
})

const router = useRouter()
const loginOut = () => {
  userStore.handleLogout()
  router.push({path: '/login'})
}


</script>
<style scoped lang="scss">
.user-box{
  background: #545c64;
  height: 58px;
  text-align: right;
}
.avatar{
  margin-top: 12px;
  vertical-align: middle;
}
.name{
  color: #ffffff;
  position: relative;
  top: 8px;
  margin-left: 6px;
}
.el-icon{
  color: #ffffff;
  margin-left: 8px;
  top: 10px;
  margin-right: 10px;
}
</style>
