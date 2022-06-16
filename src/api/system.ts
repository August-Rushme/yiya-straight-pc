import { request } from "@/utils/service"

interface pageInfo {
  pageNum: number
  pageSize: number
  clinicId: number
}
export function getPageList(url: string, data: pageInfo) {
  return request({
    url: url,
    method: "post",
    data
  })
}

// 获取全部角色
export function getAllRole(url: string, data: pageInfo) {
  return request({
    url,
    method: "post",
    data
  })
}

// 获取用户的角色
export function getUserRole(url: string) {
  return request({
    url,
    method: "get"
  })
}

// 分配角色
export function setUserRole(url: string, data: any) {
  return request({
    url,
    method: "post",
    data
  })
}

// 编辑操作
export function editPageData(url: string, data: any) {
  return request({
    url,
    method: "post",
    data
  })
}

// 删除操作
export function deletePageData(url: string) {
  return request({
    url,
    method: "delete"
  })
}

// 新增操作
export function addPageData(url: string, data: any) {
  return request({
    url,
    method: "post",
    data
  })
}

// 获取所有的菜单
export function getMenuAll(url: string) {
  return request({
    url,
    method: "get"
  })
}
