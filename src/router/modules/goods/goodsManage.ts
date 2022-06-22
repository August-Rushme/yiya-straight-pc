/*
 * @Author: Kenny
 * @Date: 2022-06-22 10:46:56
 * @LastEditors: Kenny
 * @LastEditTime: 2022-06-22 10:47:57
 * @FilePath: \yiya-straight-pc\src\router\modules\goods\goodsManage.ts
 */
export default {
  path: "/goods/goodsManage",
  component: () => import("@/views/goods/goodsManage/index.vue"),
  name: "goodsManage",
  meta: {
    title: "商品管理"
  },
  children: []
}
