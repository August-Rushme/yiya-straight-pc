/*
 * @Author: Kenny
 * @Date: 2022-06-24 10:19:12
 * @LastEditors: Kenny
 * @LastEditTime: 2022-06-24 21:42:20
 * @FilePath: \yiya-straight-pc\src\api\goods.ts
 */
import { request } from "@/utils/service"

/**
 * 根据角色数状菜单
 */
export function addProduct(data: any) {
  return request({
    url: "/product/add",
    data,
    method: "post"
  })
}
