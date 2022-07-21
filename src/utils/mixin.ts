
import { ref } from "vue";

export default function () {
  const chart = ref<any>()

  const chartResizeHandler = () => {
    if(chart.value){
      chart.value.resize()
    }
  }

  const initResizeEvent = () => {
    window.addEventListener('resize', chartResizeHandler)
  }

  const destroyResizeEvent = () => {
    window.removeEventListener('resize', chartResizeHandler)
  }

  const mounted = () => {
    initResizeEvent()
  }

  const beforeDestroyed = () => {
    destroyResizeEvent()
  }

  return {
    chart,
    mounted,
    beforeDestroyed
  }

}

