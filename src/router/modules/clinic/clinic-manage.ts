export default {
  path: "/clinic/manage",
  component: () => import("@/views/clinic/clinic-manage/index.vue"),
  name: "ClinicManage",
  meta: {
    title: "诊所管理"
  },
  children: []
}
