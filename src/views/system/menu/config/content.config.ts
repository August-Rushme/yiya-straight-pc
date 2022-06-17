export const contentTableConfig = {
  title: "菜单列表",
  propList: [
    { prop: "name", label: "菜单名称", minWidth: "120" },
    { prop: "icon", label: "图标", minWidth: "120", slotName: "icon" },
    { prop: "menuType", label: "菜单类型", minWidth: "80", slotName: "menuType" },
    { prop: "component", label: "组件", minWidth: "160" },
    { prop: "url", label: "路径", minWidth: "100" },
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
  childrenProps: {
    rowKey: "id",
    treeProps: {
      children: "children"
    }
  },
  showFooter: false,
  showSelectColumn: true,
  showIndexColumn: false,
  isBorder: false
}
