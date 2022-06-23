import store from "@/store"
import { defineStore } from "pinia"
import { usePermissionStore } from "./permission"
import { getToken, removeToken, setToken } from "@/utils/cookies"
import router, { resetRouter } from "@/router"
import { accountLogin, getUserMenus, userInfoRequest } from "@/api/login"
import { RouteRecordRaw } from "vue-router"

import cache from "@/utils/cache"
import { mapMenusToRoutes } from "@/utils/menus-map"

interface IUserState {
  token: string
  roles: string[]
  userInfo: any
  userMenus: RouteRecordRaw[]
}

export const useUserStore = defineStore({
  id: "user",
  state: (): IUserState => {
    return {
      token: getToken() || "",
      roles: [],
      userInfo: {},
      userMenus: []
    }
  },
  actions: {
    /** 设置角色数组 */
    setRoles(roles: string[]) {
      this.roles = roles
    },
    /** 登录 */

    login(userInfo: { username: string; password: string; buk: string; verCode: string; verKey: string }) {
      return new Promise((resolve, reject) => {
        accountLogin({
          buk: userInfo.buk,
          userName: userInfo.username.trim(),
          password: userInfo.password,
          verCode: userInfo.verCode.trim(),
          verKey: userInfo.verKey
        })
          .then((res: any) => {
            setToken(res.token)
            this.token = res.token
            this.userInfo = res.userInfo
            cache.setCache("userInfo", res.user)
            this.getUserMenusAction()
            resolve(true)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    async getUserMenusAction() {
      // 获取用户的菜单
      const { data: resMenu } = await getUserMenus({ userId: cache.getCache("userInfo").id })

      const { newUserMenus } = await mapMenusToRoutes(resMenu)
      this.userMenus = newUserMenus
      cache.setCache("userMenus", this.userMenus)
      return this.userMenus
    },
    /** 获取用户详情 */ getInfo() {
      return new Promise((resolve, reject) => {
        const id = cache.getCache("userInfo").id
        userInfoRequest(id)
          .then((res: any) => {
            // 遍历获取角色
            res.data.forEach((item: any) => {
              this.roles.push(item.code)
            })
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    /** 切换角色 */
    async changeRoles(role: string) {
      const token = role + "-token"
      this.token = token
      setToken(token)
      await this.getInfo()
      const permissionStore = usePermissionStore()
      permissionStore.setRoutes(this.roles)
      resetRouter()
      permissionStore.dynamicRoutes.forEach((item: RouteRecordRaw) => {
        router.addRoute(item)
      })
    },
    /** 登出 */
    logout() {
      removeToken()
      this.token = ""
      this.roles = []
      resetRouter()
    },
    /** 重置 token */
    resetToken() {
      removeToken()
      this.token = ""
      this.roles = []
    }
  }
})

/** 在 setup 外使用 */
export function useUserStoreHook() {
  return useUserStore(store)
}
