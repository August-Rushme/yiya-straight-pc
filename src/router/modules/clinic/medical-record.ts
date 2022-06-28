export default {
  path: "/clinic/medical-record",
  component: () => import("@/views/clinic/medicalRec-manage/index.vue"),
  name: "MedicalRecordManage",
  meta: {
    title: "病历管理"
  },
  children: []
}
