import store from "@/store"
import { defineStore } from "pinia"
import { RouteRecordRaw } from "vue-router"
import { constantRoutes, asyncRoutes } from "@/router"
import { getUserMenus } from "@/api/login"
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
      asyncRoutes.splice(0, asyncRoutes.length)
      const { data: resMenu } = await getUserMenus({ userId: cache.getCache("userInfo").id })

      const { newUserMenus } = await mapMenusToRoutes(resMenu)
      asyncRoutes.push(...newUserMenus)
      // 获取用户的菜单
      let accessedRoutes
      if (roles.includes("admin")) {
        accessedRoutes = asyncRoutes
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
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
