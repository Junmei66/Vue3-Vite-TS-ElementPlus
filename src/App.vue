<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { ElLoading } from 'element-plus'
import { defineComponent, onMounted } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'App',
  components: {
  },
  setup(){
    const route = useRoute()
    // 挂载前的一段空白优化
    const openFullScreen = () => {
      const loading = ElLoading.service({
        lock: true,
        text: '加载中......',
        background: 'rgba(0, 0, 0, 0.4)',
      })
      setTimeout(() => {
        loading.close()
      }, 2500)
    }
    onMounted(()=>{
      openFullScreen()
    })
    return { openFullScreen, route }
  }
})
</script>

<style lang="scss" >

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;

}
body {
  margin: 0;
  padding: 0;
}
</style>
