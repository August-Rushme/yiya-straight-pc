/*
 * @Author: Kenny
 * @Date: 2022-06-19 12:46:32
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-06-27 21:48:03
 * @FilePath: \yiya-straight-pc\src\views\dashboard\workbench\calendar\event-utils.ts
 */
import { EventInput } from "@fullcalendar/vue3"
import dayjs from "dayjs"

import { useCalendarStoreHook } from "@/store/modules/calendar"
export const store = useCalendarStoreHook()
let eventGuid = 0
import LocalCache from "@/utils/cache"
const getEventList = async () => {
  const res = await store.getCalendarEventsAction({
    pageSize: 9999,
    pageNum: 1,
    clinicId: LocalCache.getCache("userInfo").clinicId
  })
  console.log(res)
  const eventLsit = res.list.map((item: any) => {
    return {
      id: item.id,
      start: dayjs(item.startTime).format("YYYY-MM-DD"),
      end: dayjs(item.endTime).format("YYYY-MM-DD"),
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
  return eventLsit
}
export const INITIAL_EVENTS: EventInput[] = await getEventList()
export function createEventId() {
  return String(eventGuid++)
}
