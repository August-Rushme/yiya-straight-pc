export default {
  path: "/patient/manage",
  component: () => import("@/views/patient-center/patient-manage/index.vue"),
  name: "patientManage",
  meta: {
    title: "患者管理"
  },
  children: []
}
