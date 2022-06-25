export default {
  path: "/clinic/approveDoctor",
  component: () => import("@/views/clinic/approve-doctor/index.vue"),
  name: "ApproveDoctor",
  meta: {
    title: "审批管理"
  },
  children: []
}
