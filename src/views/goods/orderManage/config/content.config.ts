/*
 * @Author: Kenny
 * @Date: 2022-06-23 15:29:47
 * @LastEditors: Kenny
 * @LastEditTime: 2022-06-23 15:48:04
 * @FilePath: \yiya-straight-pc\src\views\goods\orderManage\config\content.config.ts
 */
export const contentTableConfig = {
  title: "订单列表",
  propList: [
    { prop: "orderNumber", label: "订单编号", minWidth: "140" },
    { prop: "userName", label: "用户姓名", minWidth: "100" },
    { prop: "price", label: "订单金额", minWidth: "80" },
    { prop: "status", label: "订单状态", minWidth: "100" },
    {
      prop: "createAt",
      label: "创建时间",
      minWidth: "150",
      slotName: "created"
    },
    {
      prop: "updateAt",
      label: "更新时间",
      minWidth: "150",
      slotName: "updated"
    },
    { label: "操作", minWidth: "200", slotName: "handler" }
  ],
  showFooter: true,
  showSelectColumn: true,
  showIndexColumn: true,
  isBorder: false
}
