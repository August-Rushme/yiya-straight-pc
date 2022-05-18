import { request } from "@/utils/service"

interface pageInfo {
  pageNum: number
  pageSize: number
}
export function getPageList(data: pageInfo) {
  return request({
    url: "users/list",
    method: "post",
    data
  })
}
