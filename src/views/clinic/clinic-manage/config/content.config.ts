export const contentTableConfig = {
  title: "诊所列表",
  propList: [
    { prop: "name", label: "名称", minWidth: "160" },
    { prop: "detailedAddress", label: "地址", minWidth: "180" },
    { prop: "label", label: "类型", minWidth: "110" },
    { prop: "tel", label: "手机号码", minWidth: "130" },
    {
      prop: "status",
      label: "状态",
      minWidth: "110",
      slotName: "status"
    },
    {
      prop: "createAt",
      label: "创建时间",
      minWidth: "140",
      slotName: "created"
    },
    {
      prop: "updateAt",
      label: "更新时间",
      minWidth: "140",
      slotName: "updated"
    },
    { label: "操作", minWidth: "240", slotName: "handler" }
  ],
  showFooter: true,
  showSelectColumn: true,
  showIndexColumn: false,
  isBorder: false
}
