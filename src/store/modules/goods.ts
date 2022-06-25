/*
 * @Author: Kenny
 * @Date: 2022-06-24 16:02:56
 * @LastEditors: Kenny
 * @LastEditTime: 2022-06-24 16:04:16
 * @FilePath: \yiya-straight-pc\src\store\modules\goods.ts
 */
import { addProduct } from "@/api/goods"
import store from "@/store"
import { defineStore } from "pinia"

export const useClinicStore = defineStore({
  id: "goods",
  state: () => {
    return {}
  },
  actions: {
    // 获取申请详情
    async getApplyDetailsAction(data: any) {
      const { data: res } = await addProduct(data)
      return res
    }
  }
})

export function useClinicStoreHook() {
  return useClinicStore(store)
}
