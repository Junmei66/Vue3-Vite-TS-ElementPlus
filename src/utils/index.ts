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
  // console.log(typeof null) // 返回 object, 其他的基本类型返回对应的
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

// type _typeObj = { [anyKey: string]: any }

// /**
//  * @param deepClone 深拷贝
//  * @param _object 如果不传返回为空对象 必须是js的{}对象
//  * @param _obj 可选 返回传入的@param _object 必须是js的{}对象,
//  */
// export const deepClone = (_object: _typeObj, _obj: _typeObj = {}): _typeObj => {
//     if (!(Object.prototype === Object.getPrototypeOf(_object))) {
//         return new Error('传入参数***_object***类型错误')
//     }
//     for (let key in _object) {
//         if (Object.prototype === Object.getPrototypeOf(_object[key])) {
//             _obj[key] = deepClone(_object[key])
//         } else {
//             _obj[key] = _object[key]
//         }
//     }
//     console.log(_obj,'测试深拷贝')
//     return _obj
// }


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
          count += 1
        }
      }
      if(count){
        keyArr.push(k)
        result[k] = newObj[k]
      }
    }
  }
  // console.log(keyArr,result, '为啥没有值了')
  return {keyArr, result}
}