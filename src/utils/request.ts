import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { ElMessage } from "element-plus";


const service = axios.create({
  // baseURL: 'http://localhost:3100',
  baseURL: 'http://localhost:3100',
  timeout: 5000,
  headers: {
    authorization: ""
  }
})


service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // console.log(config,'config')
    if(localStorage.getItem('token')){
      if(config?.headers){
        // config.headers["authorization"] = localStorage.getItem('token')
      }
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response: AxiosResponse) => {
    if(response.headers.authorization){
      localStorage.setItem('token', response.headers.authorization)
    }

    if(response.status == 0){
      return response
    }else{
      localStorage.removeItem('token')
      if(response.data.detail){
        ElMessage({
          showClose: true,
          message: response.data.detail,
          type: 'warning',
        })
      }
    }
    return Promise.resolve(response)
  },
  error => {
    return Promise.reject(error)
  }
)

export default service 