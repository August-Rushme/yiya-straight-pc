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
      path: "/system/role",
      component: () => import("@/views/system/role/index.vue"),
      name: "Role",
      meta: {
        title: "角色管理"
      }
    }
  ]
}
