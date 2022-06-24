import { approveClinic, getApplyClinic } from "@/api/clinic"
import store from "@/store"
import message from "@/utils/message"

import { defineStore } from "pinia"

interface IClinicState {
  applyDetails: {}
}
export const useClinicStore = defineStore({
  id: "clinic",
  state: (): IClinicState => {
    return {
      applyDetails: {}
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
      return res
    },
    // 审批操作
    async setApplyDetailsAction(payload: any) {
      const pageUrl = "/clinicApply/updateStatus"
      const res: any = await approveClinic(pageUrl, payload)
      if (res.code == 200) {
        message.success("操作成功")
      }
    }
  }
})

export function useClinicStoreHook() {
  return useClinicStore(store)
}
