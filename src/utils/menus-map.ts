import type { RouteRecordRaw } from "vue-router"
const Layout = () => import("@/layout/index.vue")
export async function mapMenusToRoutes(userMenus: any[]) {
  const routes: RouteRecordRaw[] = []
  //1. 加载所有路由
  const allRoutes: RouteRecordRaw[] = []
  // debugger
  const routeFiles = import.meta.glob("../router/modules/**/*.ts")

  for (const file in routeFiles) {
    await routeFiles[file]().then((mod) => {
      const route = mod.default
      allRoutes.push(route)
    })
  }

  //2. 根据菜单添加需要的routes
  // debugger

  const _recurseGetRoute = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.menuType == 0) {
        allRoutes.forEach((item: RouteRecordRaw) => {
          if (item.path == menu.path) {
            routes.push(item)
          }
        })
      }
      if (menu.menuType == 1) {
        // 遍历allRoutes，找到对应的路由
        allRoutes.forEach((item: RouteRecordRaw) => {
          if (item.path == menu.path) {
            routes.push(item)
          }
        })
      } else {
        if (menu.children) {
          _recurseGetRoute(menu.children)
        }
      }
    }
  }
  _recurseGetRoute(userMenus)
  const _recurseMenus = (menus: any[]) => {
    const newUserMenus = menus.map((item: any) => {
      const components = routes.find((route: any) => route.path == item.path)?.component ?? Layout
      const newItem = {
        path: item.path,
        name: item.name,
        component: components,
        redirect: item.redirect,
        meta: item.meta,
        children: item.children
      }
      if (item.children && item.children.length > 0) {
        newItem.children = _recurseMenus(item.children)
      }
      return newItem
    })
    return newUserMenus
  }

  const newUserMenus: RouteRecordRaw[] = _recurseMenus(userMenus)

  return {
    routes,
    newUserMenus
  }
}

// 映射叶子节点
export function menuMapLeafKeys(menuList: any[]) {
  const leafKeys: number[] = []
  // 如果menuList为空，则直接返回
  if (menuList?.length == 0 || menuList == null) {
    return leafKeys
  } else {
    const _recurseMapLeafKeys = (menus: any[]) => {
      for (const menu of menus) {
        if (menu.children && menu.children.length > 0) {
          _recurseMapLeafKeys(menu.children)
        } else {
          leafKeys.push(menu.id)
        }
      }
    }
    _recurseMapLeafKeys(menuList)
    return leafKeys
  }
}
