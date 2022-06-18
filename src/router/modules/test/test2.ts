export default {
  path: "/test/test3",
  component: () => import("@/views/test/test2.vue"),
  name: "Test2",
  meta: {
    title: "测试2"
  },
  children: []
}
