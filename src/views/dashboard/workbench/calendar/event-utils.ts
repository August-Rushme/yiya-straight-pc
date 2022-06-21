/*
 * @Author: Kenny
 * @Date: 2022-06-19 12:46:32
 * @LastEditors: Kenny
 * @LastEditTime: 2022-06-21 17:49:38
 * @FilePath: \yiya-straight-pc\src\views\dashboard\workbench\calendar\event-utils.ts
 */
import { EventInput } from "@fullcalendar/vue3"

let eventGuid = 0
const todayStr = new Date().toISOString().replace(/T.*$/, "") // YYYY-MM-DD of today

export const INITIAL_EVENTS: EventInput[] = [
  {
    id: createEventId(),
    formData: {
      patientName: "张三",
      doctorName: "李四",
      appiontmentTime: [todayStr, todayStr],
      phone: "18888888888",
      sex: "男",
      remark: "无"
    },
    start: todayStr
  }
]

export function createEventId() {
  return String(eventGuid++)
}
