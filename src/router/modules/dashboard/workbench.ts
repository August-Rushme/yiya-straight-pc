const Layout = () => import("@/layout/index.vue")

export default {
  path: "/",
  component: Layout,
  meta: {
    title: "Dashboard",
    icon: "dashboard",
    roles: ["admin"]
  },
  children: [
    {
      path: "/dashboard/workbench",
      component: () => import("@/views/dashboard/workbench/index.vue"),
      name: "Workbench",
      meta: {
        title: "工作台",
        roles: ["admin"]
      }
    }
  ]
}
