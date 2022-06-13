const Layout = () => import("@/layout/index.vue")

export default {
  path: "/",
  redirect: "/dashboard/home",
  component: Layout,
  meta: {
    title: "Dashboard",
    icon: "dashboard",
    roles: ["admin"]
  },
  children: [
    {
      path: "/dashboard/home",
      component: () => import("@/views/dashboard/home/index.vue"),
      name: "Home",
      meta: {
        title: "首页",
        roles: ["admin"],
        affix: true
      }
    }
  ]
}
