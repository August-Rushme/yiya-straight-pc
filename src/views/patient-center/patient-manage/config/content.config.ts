import { ITablePropsType } from "@/base-ui/table/types"

export const contentTableConfig: ITablePropsType = {
  title: "患者列表",
  propList: [
    { prop: "name", label: "姓名", minWidth: "100" },
    { prop: "gender", label: "性别", minWidth: "80" },
    { prop: "age", label: "年龄", minWidth: "80" },
    { prop: "phone", label: "电话号码", minWidth: "80" },
    { prop: "doctor", label: "医生", minWidth: "100" },
    {
      prop: "status",
      label: "状态",
      minWidth: "80",
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
    { label: "操作", minWidth: "200", slotName: "handler" }
  ],
  showFooter: true,
  showSelectColumn: true,
  showIndexColumn: false,
  isBorder: false
}
