import { request } from "@/utils/service"

interface IUserRequestData {
  buk: string
  userName: string
  password: string
}

/** 登录，返回 token */
export function accountLogin(data: IUserRequestData) {
  return request({
    url: "user/loginByAccount",
    method: "post",
    data
  })
}
/** 获取用户详情 */
export function userInfoRequest(id: number) {
  return request({
    url: "user/getUserRole/" + id,
    method: "get"
  })
}

/**获取用户的菜单  */
export function getUserMenus(data: { userId: number }) {
  return request({
    url: "menu/list",
    method: "post",
    data
  })
}
