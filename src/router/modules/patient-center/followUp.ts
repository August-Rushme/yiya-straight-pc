export default {
  path: "/patient/follow-up",
  component: () => import("@/views/patient-center/follow-up/index.vue"),
  name: "followUp",
  meta: {
    title: "随访管理"
  },
  children: []
}
