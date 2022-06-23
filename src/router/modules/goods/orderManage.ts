/*
 * @Author: Kenny
 * @Date: 2022-06-23 14:55:19
 * @LastEditors: Kenny
 * @LastEditTime: 2022-06-23 14:55:56
 * @FilePath: \yiya-straight-pc\src\router\modules\goods\orderManage.ts
 */
export default {
  path: "/goods/orderManage",
  component: () => import("@/views/goods/orderManage/index.vue"),
  name: "orderManage",
  meta: {
    title: "订单管理"
  },
  children: []
}
