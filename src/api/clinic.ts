import { request } from "@/utils/service"

// 获取诊所申请详情
export function getApplyClinic(url: string) {
  return request({
    url,
    method: "get"
  })
}
