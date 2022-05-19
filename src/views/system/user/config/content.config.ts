export const contentTableConfig = {
  title: "用户列表",
  propList: [
    { prop: "username", label: "用户名", minWidth: "100" },
    { prop: "realname", label: "真实姓名", minWidth: "100" },
    { prop: "cellphone", label: "手机号码", minWidth: "100" },
    { prop: "enable", label: "状态", minWidth: "100", slotName: "status" },
    {
      prop: "created",
      label: "创建时间",
      minWidth: "160",
      slotName: "created"
    },
    {
      prop: "updated",
      label: "更新时间",
      minWidth: "160",
      slotName: "updated"
    },
    { label: "操作", minWidth: "280", slotName: "handler" }
  ],
  showFooter: true,
  showSelectColumn: true,
  showIndexColumn: true
}
