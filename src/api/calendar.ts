/*
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-06-25 15:46:29
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-06-27 20:34:48
 * @FilePath: \yiya-straight-pc\src\api\calendar.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { request } from "@/utils/service"

// 获取所有日历事件
export function getCalendarEvents(data: any) {
  return request({
    url: "/clinicCalendar/list",
    method: "post",
    data
  })
}

export function createCalendarEvent(data: any) {
  return request({
    url: "/clinicCalendar/add",
    method: "post",
    data
  })
}

export function deleteCalendarEvent(id: number) {
  return request({
    url: `/clinicCalendar/${id}`,
    method: "delete"
  })
}

export function editCalendarEvent(data: any) {
  return request({
    url: "clinicCalendar/edit",
    method: "post",
    data
  })
}
