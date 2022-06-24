export const contentTableConfig = {
  title: "商品列表",
  propList: [
    { prop: "name", label: "商品名称", minWidth: "120" },
    { prop: "img", label: "商品图片", minWidth: "140", slotName: "image" },
    { prop: "status", label: "商品状态", minWidth: "80", slotName: "status" },
    { prop: "price", label: "商品价格", minWidth: "80" },
    { prop: "count", label: "库存", minWidth: "80" },
    { prop: "type", label: "商品类型", minWidth: "100" },
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
