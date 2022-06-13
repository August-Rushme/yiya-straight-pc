const Layout = () => import("@/layout/index.vue")

export default {
  path: "/system",
  component: Layout,
  name: "System",
  meta: {
    title: "人事管理",
    icon: "personnel",
    roles: ["admin"] // 可以在根路由中设置角色
  },
  children: []
}
