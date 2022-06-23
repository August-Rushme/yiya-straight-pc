import { ITablePropsType } from "@/base-ui/table/types"

export const contentTableConfig: ITablePropsType = {
  title: "角色列表",
  propList: [
    { prop: "name", label: "角色名", minWidth: "100" },
    { prop: "code", label: "角色编码", minWidth: "100" },
    { prop: "description", label: "权限", minWidth: "120" },
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
  showIndexColumn: false,
  isBorder: false
}
