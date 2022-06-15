/*
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-06-10 16:34:35
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-06-15 16:00:27
 * @FilePath: \yiya-straight-pc\src\store\modules\permission.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import store from "@/store"
import { defineStore } from "pinia"
import { RouteRecordRaw } from "vue-router"
import { constantRoutes, asyncRoutes } from "@/router"
import { mapMenusToRoutes } from "@/utils/menus-map"
import cache from "@/utils/cache"
// import { getUserMenus } from "@/api/login"
// import cache from "@/utils/cache"
// import { mapMenusToRoutes } from "@/utils/menus-map"
interface IPermissionState {
  routes: RouteRecordRaw[]
  dynamicRoutes: RouteRecordRaw[]
}

const hasPermission = (roles: string[], route: RouteRecordRaw) => {
  if (route.meta && route.meta.roles) {
    return roles.some((role) => {
      if (route.meta?.roles !== undefined) {
        return route.meta.roles.includes(role)
      } else {
        return false
      }
    })
  } else {
    return true
  }
}

const filterAsyncRoutes = (routes: RouteRecordRaw[], roles: string[]) => {
  const res: RouteRecordRaw[] = []
  routes.forEach((route) => {
    const r = { ...route }
    if (hasPermission(roles, r)) {
      if (r.children) {
        r.children = filterAsyncRoutes(r.children, roles)
      }
      res.push(r)
    }
  })
  return res
}

export const usePermissionStore = defineStore({
  id: "permission",
  state: (): IPermissionState => {
    return {
      routes: [],
      dynamicRoutes: []
    }
  },
  actions: {
    async setRoutes(roles: string[]) {
      // 清空asyncRoutes
      let newAsyncRoutes: RouteRecordRaw[] = []
      newAsyncRoutes = asyncRoutes
      const resMenu = cache.getCache("userMenus")
      const { newUserMenus } = await mapMenusToRoutes(resMenu)
      newAsyncRoutes.unshift(...newUserMenus)
      // 获取用户的菜单
      let accessedRoutes
      if (roles.includes("admin")) {
        accessedRoutes = asyncRoutes
      } else {
        accessedRoutes = filterAsyncRoutes(newAsyncRoutes, roles)
      }
      this.routes = constantRoutes.concat(accessedRoutes)
      console.log(this.routes)

      this.dynamicRoutes = accessedRoutes
    }
  }
})

/** 在 setup 外使用 */
export function usePermissionStoreHook() {
  return usePermissionStore(store)
}
