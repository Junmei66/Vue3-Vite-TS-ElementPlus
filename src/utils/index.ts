import { postUpdateRecord } from "@/api"
import { UpdateParams } from "@/types/request"

// 新增更新记录
export function updateRecord(params: UpdateParams){
  const result = postUpdateRecord(params)
  // console.log(result, "更新日志结果")
  return result
}

// 深拷贝
type _typeObj = { [anyKey: string]: any }
export function deepClone(obj: _typeObj = {}) {
  if(typeof obj != 'object' || obj == null){
    return obj
  }
  
  let result: _typeObj
  if(obj instanceof Array){
    result = []
  }else{
    result = {}
  }

  for(let key in obj){
    if(obj.hasOwnProperty(key)){
      result[key] = deepClone(obj[key])
    }
  }
  return result
}


export function getChanged(prevObj: _typeObj = {}, newObj: _typeObj = {}) {
  let keyArr = []
  let result: _typeObj = {}
  for(let k in prevObj){
    if(typeof prevObj[k] != 'object' || prevObj[k] == null){
      if(prevObj[k] && newObj[k] && prevObj[k] != newObj[k]){
        keyArr.push(k)
        result[k] = newObj[k]
      }
    }else{
      let count = 0
      console.log(prevObj[k], newObj[k],'数组或对象')
      for(let k2 in prevObj[k]){
        if(prevObj[k][k2] && newObj[k][k2] && prevObj[k][k2] != newObj[k][k2]){
          console.log(prevObj[k][k2], k, "有值的吧")
          count += 1
        }
      }
      if(count){
        keyArr.push(k)
        result[k] = newObj[k]
      }
    }
  }
  console.log(keyArr,result, '为啥没有值了')
  return {keyArr, result}
}

// 防抖-下拉框输入搜索
export function debounce(fn: {apply: (arg0: any, arg1: any[])=>void }, delay: number=300) {
  let timeout: any = null
  return function(_this: any, ...args: any){
    if(timeout){
      clearTimeout(timeout)
    }
    timeout = setTimeout(function(){
      fn.apply(_this, args)
    },delay)
  }
}

// 节流-下拉框滚动刷新
export function throttle(fn: {apply: (arg0: any, arg1: any[])=>void }, delay: number=300) {
  let flag: boolean = true
  return function(_this: any, ...args: any){
    if(!flag) return
    flag = false
    setTimeout(function(){
      fn.apply(_this, args)
      flag = true
    },delay)
  }
}