export default {
  path: "/system/user",
  component: () => import("@/views/system/user/index.vue"),
  name: "User",
  meta: {
    title: "员工管理",
    roles: ["admin"]
  },
  children: []
}
