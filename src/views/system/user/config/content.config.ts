export const contentTableConfig = {
  title: "员工列表",
  propList: [
    { prop: "userName", label: "用户名", minWidth: "100" },
    { prop: "password", label: "密码", minWidth: "100", slotName: "password" },
    { prop: "name", label: "真实姓名", minWidth: "100" },
    { prop: "tel", label: "手机号码", minWidth: "100" },
    { prop: "status", label: "状态", minWidth: "100", slotName: "status" },
    {
      prop: "createAt",
      label: "创建时间",
      minWidth: "120",
      slotName: "created"
    },
    {
      prop: "updateAt",
      label: "更新时间",
      minWidth: "120",
      slotName: "updated"
    },
    { label: "操作", minWidth: "280", slotName: "handler" }
  ],
  showFooter: true,
  showSelectColumn: true,
  showIndexColumn: true,
  isBorder: false
}
