/*
 * @Author: Kenny
 * @Date: 2022-06-22 17:09:42
 * @LastEditors: Kenny
 * @LastEditTime: 2022-06-22 17:10:05
 * @FilePath: \yiya-straight-pc\src\router\modules\goods\goodsAdd.ts
 */
export default {
  path: "/goods/goodsAdd",
  component: () => import("@/views/goods/goodsAdd/index.vue"),
  name: "goodsAdd",
  meta: {
    title: "添加商品"
  },
  children: []
}
