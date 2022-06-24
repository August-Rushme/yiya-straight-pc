/*
 * @Author: Kenny
 * @Date: 2022-06-24 16:02:56
 * @LastEditors: Kenny
 * @LastEditTime: 2022-06-24 21:42:01
 * @FilePath: \yiya-straight-pc\src\store\modules\goods.ts
 */
import { addProduct } from "@/api/goods"
import store from "@/store"
import { defineStore } from "pinia"

export const useGoodsStore = defineStore({
  id: "goods",
  state: () => {
    return {}
  },
  actions: {
    // 获取申请详情
    async addProductAction(data: any) {
      const res = await addProduct(data)
      return res
    }
  }
})

export function useGooodsStoreHook() {
  return useGoodsStore(store)
}
