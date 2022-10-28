const TOKEN_KEY = 'token'
const USER_KEY = 'userId'


// 获取 token
export function getToken() {
    return localStorage.getItem(TOKEN_KEY)
}
// 保存 token
export function setToken(token: string) {
    return localStorage.setItem(TOKEN_KEY, token)
}

// 获取用户信息
export function getUserId() {
    return JSON.parse(localStorage.getItem(USER_KEY)!)
}
//保存用户信息
export function setUserId(user: any) {
    localStorage.setItem(USER_KEY, JSON.stringify(user))
}
//移除用户信息
export function removeToken() {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
}