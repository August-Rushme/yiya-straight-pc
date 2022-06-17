/*
 * @Author: Kenny
 * @Date: 2022-06-16 17:08:02
 * @LastEditors: Kenny
 * @LastEditTime: 2022-06-16 23:09:43
 * @FilePath: \yiya-straight-front-pc\src\store\modules\echats.ts
 */
import store from "@/store"
import { defineStore } from "pinia"
import { ECharts } from "echarts"
interface EchartsObject {
  mark: string
  echartinstance: ECharts
}
interface IEchartsState {
  echartsArray: EchartsObject[]
}
export const useEchartsStore = defineStore({
  id: "echarts",
  state: (): IEchartsState => {
    return {
      echartsArray: []
    }
  },
  actions: {}
})

export function useEchartsStoreHook() {
  return useEchartsStore(store)
}
