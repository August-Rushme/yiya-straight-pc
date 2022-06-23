import { getApplyClinic } from "@/api/clinic"
import store from "@/store"
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
    }
  }
})

export function useClinicStoreHook() {
  return useClinicStore(store)
}
