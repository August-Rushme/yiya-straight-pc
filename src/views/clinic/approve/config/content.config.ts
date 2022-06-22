import { ITablePropsType } from "@/base-ui/table/types"

export const contentTableConfig: ITablePropsType = {
  title: "审批列表",
  propList: [
    { prop: "name", label: "诊所名称", minWidth: "100" },
    { prop: "address", label: "诊所地址", minWidth: "100" },
    { prop: "detailedAddress", label: "诊所详细地址", minWidth: "100" },
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
    { label: "操作", minWidth: "120", slotName: "handler" }
  ],
  showFooter: true,
  showSelectColumn: true,
  showIndexColumn: false,
  isBorder: false
}
