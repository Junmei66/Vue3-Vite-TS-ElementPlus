import { useUserStore } from "@/store";
import { loginParams, postData, PostQuery, UpdateParams } from "@/types/request";
import { UserState } from "@/types/store";
import request from "@/utils/request";

export function login(params: loginParams) {
  return request({
    url: '/users?name='+ params.name,
    method: 'get',
    data: params
  })
}

export function getPosts(query: PostQuery) {
  return request({
    url: '/posts',
    method: 'get',
    params: query
  })
}

export function postPosts(data: postData) {
  return request({
    url: '/posts',
    method: 'post',
    data: data
  })
}

export function putPosts(data: postData, id?: number) {
  return request({
    url: '/posts/' + id,
    method: 'put',
    data: data
  })
}

export function deletePosts(id?: number) {
  return request({
    url: '/posts/' + id,
    method: 'delete',
  })
}

export function getSkills() {
  return request({
    url: '/skills',
    method: 'get'
  })
}

export function getCapability() {
  return request({
    url: '/capabilities',
    method: 'get'
  })
}

export function getProjects() {
  return request({
    url: '/projects',
    method: 'get'
  })
}

export function getUis() {
  return request({
    url: '/uilists',
    method: 'get'
  })
}

export function getUser(id: number) {
  return request({
    url: '/userInfo?id=' + id,
    method: 'get'
  })
}

export function putUser(data: UserState, id?: number) {
  return request({
    url: '/userInfo/' + id,
    method: 'put',
    data: data
  })
}

export function getUpdateRecord() {
  return request({
    url: '/updateRecord',
    method: 'get'
  })
}

export function postUpdateRecord(query: UpdateParams) {
  const y = new Date().getFullYear()
  const m = (new Date().getMonth() + 1)>10?(new Date().getMonth() + 1):"0"+(new Date().getMonth() + 1)
  const d = new Date().getDate()>10?new Date().getDate():"0"+new Date().getDate()
  const hh = new Date().getHours()>10?new Date().getHours():"0"+new Date().getHours()
  const mm = new Date().getMinutes()>10?new Date().getMinutes():"0"+new Date().getMinutes()
  const ss = new Date().getSeconds()>10?new Date().getSeconds():"0"+new Date().getSeconds()

  const timeStr = y + "-" + m + "-" + d + " " + hh + ":" + mm + ":" + ss
  const userStore = useUserStore()
  const author = userStore.userProfile.name
  const data: UpdateParams = {
    time: timeStr,
    author: author,
    name: query.name,
    content: query.content,
    type: query.type
  }
  return request({
    url: '/updateRecord',
    method: 'post',
    data: data
  })
}