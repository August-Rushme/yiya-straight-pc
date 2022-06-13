const Layout = () => import("@/layout/index.vue")

export default {
  path: "/system",
  component: Layout,
  redirect: "/system/user",
  name: "System",
  meta: {
    title: "人事管理",
    icon: "personnel",
    roles: ["admin"] // 可以在根路由中设置角色
  },
  children: [
    {
      path: "/system/user",
      component: () => import("@/views/system/user/index.vue"),
      name: "User",
      meta: {
        title: "员工管理",
        roles: ["admin"]
      }
    }
  ]
}
