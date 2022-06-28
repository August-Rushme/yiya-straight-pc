import { request } from "@/utils/service"

// 获取诊所申请详情
export function getApplyClinic(url: string) {
  return request({
    url,
    method: "get"
  })
}

// 审批操作
export function approveClinic(url: string, data: any) {
  return request({
    url,
    method: "post",
    data
  })
}

// 诊所入驻申请
export function clinicApply(url: string, data: any) {
  return request({
    url,
    method: "post",
    data
  })
}

// 获取医生技能列表
export function getSkills(url: string) {
  return request({
    url,
    method: "get"
  })
}
