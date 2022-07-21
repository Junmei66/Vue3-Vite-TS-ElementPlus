import { getUser, login } from "@/api";
import { loginParams } from "@/types/request";
import { UserState } from "@/types/store";
import { createPinia, defineStore } from "pinia";
import { useRouter } from "vue-router";

const pinia = createPinia()

export const useUserStore = defineStore("user",{
  state: (): UserState => ({
      id: 1,
      name: "mm",
      sex: "女",
      age: 20,
      tel: "15500000000",
      address: "深圳",
      tags: [],
      roles: []
  }),
  getters: {
    userProfile(state: UserState): UserState {
      return {...state}
    }
  },
  actions: {
    setInfo(partial: Partial<UserState>){
      this.$patch(partial)
      // this.$patch({
      //   id: partial.id,
      //   name: partial.name,
      //   sex: partial.sex,
      //   age: partial.age,
      //   tel: partial.tel,
      //   address: partial.address,
      //   tags: partial.tags,
      //   roles: partial.roles
      // })
    },
    resetInfo(){
      this.$reset()
    },
    async getInfo(){
      const userId = Number(localStorage.getItem('userId'))
      if(userId){
        const result = await getUser(userId)
        if(result.data?.length){
          const userInfo = result.data[0]
          this.setInfo(userInfo)
          return userInfo
        }
      }else{
        const router = useRouter()
        this.handleLogout()
        router?.push({path: '/login'})
      }
    },
    async handleLogin(loginForm: loginParams){
      const result = await login(loginForm)
      if(result.status == 200){
        // console.log(result.data, 'result.data')
        localStorage.setItem('userId', result.data[0].id)
        this.getInfo()
      }
      return result
    },

    async handleLogout(){
      localStorage.clear()
      this.resetInfo()
    }
  }
})

export const useSidebarStore = defineStore("sidebar",{
  state: () => {
    return {
      collapse: false
    }
  },
  getters: {},
  actions: {
    handleCollapse(){
      this.collapse = !this.collapse
    }
  }
})

export default pinia

