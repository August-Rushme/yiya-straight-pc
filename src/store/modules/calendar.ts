/*
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-06-25 15:56:26
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-06-27 20:37:29
 * @FilePath: \yiya-straight-pc\src\store\modules\calendar.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { getCalendarEvents, createCalendarEvent } from "@/api/calendar"
import store from "@/store"
import { defineStore } from "pinia"

export const useCalendarStore = defineStore({
  id: "calendar",
  state: () => {
    return {}
  },
  actions: {
    // 获取日历列表
    async getCalendarEventsAction(data: any) {
      const res = await getCalendarEvents(data)
      return res.data
    },
    // 创建日历事件
    async createCalendarEventAction(data: any) {
      const res = await createCalendarEvent(data)
      return res.data
    }
  }
})

export function useCalendarStoreHook() {
  return useCalendarStore(store)
}
