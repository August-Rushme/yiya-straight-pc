import microApps from "@/microApps"
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"

const Layout = () => import("@/layout/index.vue")
const Empty = () => import("@/layout/components/empty.vue")

/** 常驻路由 */
export const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: "/redirect",
    component: Layout,
    meta: {
      hidden: true
    },
    children: [
      {
        path: "/redirect/:path(.*)",
        component: () => import("@/views/redirect/index.vue")
      }
    ]
  },
  {
    path: "/login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      hidden: true
    }
  },
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard/home",
    meta: {
      title: "首页",
      icon: "ic ic-qrcode-fill"
    },
    children: [
      {
        path: "/dashboard/home",
        component: () => import("@/views/dashboard/home/index.vue"),
        name: "Home",
        meta: {
          title: "首页",
          affix: true
        }
      },
      {
        path: "/dashboard/workbench",
        component: () => import("@/views/dashboard/workbench/index.vue"),
        name: "Workbench",
        meta: {
          title: "工作台"
        }
      }
    ]
  },
  {
    path: "/base/app1/file",
    name: "base",
    component: Layout,
    meta: {
      title: "我的空间",
      hidden: true
    }
  },
  {
    path: "/base/app1/file/preview",
    component: Empty
  },
  {
    path: "/base/app1/share/:shareBatchNum",
    name: "Share",
    component: Empty,
    meta: {
      title: "分享",
      content: {
        description: "查看他人分享"
      },
      hidden: true
    },
    props: true
  }

  // { name: "TRY", path: "/base", component: AppMain, meta: { title: "TRY" } }
]

/**
 * 动态路由
 * 用来放置有权限（roles 属性）的路由
 * 必须带有 name 属性
 */
export const asyncRoutes: Array<RouteRecordRaw> = [
  {
    path: "/:pathMatch(.*)*", // 必须将 'ErrorPage' 路由放在最后, Must put the 'ErrorPage' route at the end
    component: Layout,
    redirect: "/404",
    name: "ErrorPage",
    meta: {
      title: "错误页面",
      icon: "404",
      hidden: true
    },
    children: [
      {
        path: "401",
        component: () => import("@/views/error-page/401.vue"),
        name: "401",
        meta: {
          title: "401"
        }
      },
      {
        path: "404",
        component: () => import("@/views/error-page/404.vue"),
        name: "404",
        meta: {
          title: "404"
        }
      }
    ]
  }
]
const microRoutes: any = [{ name: "系统管理", path: "/base" }]
microApps.forEach((micro: { activeRule: any }) => {
  microRoutes.push({
    path: `${micro.activeRule}/:morePath*`,
    component: Layout
  })
})

const router = createRouter({
  history: createWebHistory(),
  routes: microRoutes.concat(constantRoutes)
})
// constantRoutes
/** 重置路由 */
export function resetRouter() {
  // 注意：所有动态路由路由必须带有 name 属性，否则可能会不能完全重置干净
  try {
    window.location.reload()
    router.getRoutes().forEach((route) => {
      const { name, meta } = route
      if (name && meta.roles?.length) {
        router.hasRoute(name) && router.removeRoute(name)
      }
    })
  } catch (error) {
    // 强制刷新浏览器
    window.location.reload()
  }
}

export default router
