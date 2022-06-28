import store from "@/store"
import message from "@/utils/message"

import { defineStore } from "pinia"

import { approveClinic, getApplyClinic, clinicApply, getSkills } from "@/api/clinic"

interface IClinicState {
  applyDetails: {}
  skills: string[]
}
export const useClinicStore = defineStore({
  id: "clinic",
  state: (): IClinicState => {
    return {
      applyDetails: {},
      skills: []
    }
  },
  actions: {
    // 获取申请详情
    async getApplyDetailsAction(payload: any) {
      const pageUrl = "/clinicApply/select/" + payload.id
      const { data: res } = await getApplyClinic(pageUrl)
      this.$patch({
        applyDetails: res
      })
    },
    // 审批操作
    async setApplyDetailsAction(payload: any) {
      const pageUrl = "/clinicApply/updateStatus"
      const res: any = await approveClinic(pageUrl, payload)
      if (res.code != 200) {
        return message.error("操作失败请稍后再试")
      }
      message.success("操作成功")
    },
    // 诊所入驻申请
    async clinicApplyAction(payload: any) {
      const pageUrl = "/clinicApply/save"
      const res: any = await clinicApply(pageUrl, payload)
      if (res.code != 200) {
        return message.error("申请失败,请稍后再试")
      }
      message.success("申请成功，请等待审批")
    },
    // 获取医生技能列表
    async getSkillsAction() {
      const pageUrl = "/qualification/getDoctorLabels"
      const res: any = await getSkills(pageUrl)
      if (res.code != 200) {
        return message.error("获取数据失败,请稍后再试")
      }
      this.$patch({
        skills: res.data
      })
    }
  }
})

export function useClinicStoreHook() {
  return useClinicStore(store)
}
