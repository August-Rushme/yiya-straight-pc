import { request } from "@/utils/service"

/**
 * 根据角色数状菜单
 */
export function getMenuByRole(id: number) {
  return request({
    url: "/role/getRoleMenu/" + id,
    method: "get"
  })
}
