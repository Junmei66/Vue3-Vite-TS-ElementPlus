<template>
  <div class="top-box">
    <div class="left-box"><side-bar /></div>
    <div class="right-box"><avatar /></div>
  </div>
  <div class="nav-box">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SideBar from "./SideBar/index.vue";
import Avatar from "./Avatar/index.vue";
export default defineComponent({
  name: 'Layout',
  components: {SideBar, Avatar},
})
</script>

<style lang="scss">
.nav-box{
  margin: 12px 12px 0;
}

.top-box{
  display: flex;
}
.left-box{
  width: calc(100% - 120px);
}
.right-box{
  width: 120px;
}
</style>