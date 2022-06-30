/*
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-06-25 15:56:26
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-06-27 20:37:29
 * @FilePath: \yiya-straight-pc\src\store\modules\calendar.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { getCalendarEvents, createCalendarEvent, deleteCalendarEvent, editCalendarEvent } from "@/api/calendar"
import store from "@/store"
import { defineStore } from "pinia"
import dayjs from "dayjs"
import LocalCache from "@/utils/cache"
const params = {
  pageSize: 9999,
  pageNum: 1,
  clinicId: LocalCache.getCache("userInfo").clinicId
}

export const useCalendarStore = defineStore({
  id: "calendar",
  state: () => {
    return {}
  },
  actions: {
    // 获取日历列表
    async getCalendarEventsAction() {
      const res = await getCalendarEvents(params)
      const list = res.data.list.map((item: any) => {
        return {
          id: item.id,
          start: dayjs(item.appointmentStartDate).format("YYYY-MM-DD HH:mm:ss"),
          end: dayjs(item.appointmentEndDate).format("YYYY-MM-DD HH:mm:ss"),
          allDay: item.isFullday,
          formData: {
            patientName: item.patientName,
            doctorName: item.doctorName,
            appiontmentTime: [item.appointmentStartDate, item.appointmentEndDate],
            patientGender: item.patientGender,
            patientPhone: item.patientPhone,
            project: item.project,
            remark: item.remark
          }
        }
      })
      return list
    },
    // 创建日历事件
    async createCalendarEventAction(data: any) {
      const res = await createCalendarEvent(data)
      return res.data
    },
    async deleteCalendarEventAction(id: number) {
      const res = await deleteCalendarEvent(id)
      return res.data
    },
    async editCalendarEventAction(data: any) {
      const res = await editCalendarEvent(data)
      return res.data
    }
  }
})

export function useCalendarStoreHook() {
  return useCalendarStore(store)
}
