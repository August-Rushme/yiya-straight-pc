/*
 * @Author: Kenny
 * @Date: 2022-06-19 12:46:32
 * @LastEditors: Kenny
 * @LastEditTime: 2022-06-19 13:46:34
 * @FilePath: \yiya-straight-pc\src\views\dashboard\workbench\calendar\event-utils.ts
 */
import { EventInput } from "@fullcalendar/vue3"

let eventGuid = 0
const todayStr = new Date().toISOString().replace(/T.*$/, "") // YYYY-MM-DD of today

export const INITIAL_EVENTS: EventInput[] = [
  {
    id: createEventId(),
    title: "All-day event",
    start: todayStr
  },
  {
    id: createEventId(),
    title: "Timed event",
    start: todayStr + "T12:00:00"
  }
]

export function createEventId() {
  return String(eventGuid++)
}
