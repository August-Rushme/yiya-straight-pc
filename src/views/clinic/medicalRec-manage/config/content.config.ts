import { ITablePropsType } from "@/base-ui/table/types"

export const contentTableConfig: ITablePropsType = {
  title: "病历列表",
  propList: [
    { prop: "userName", label: "姓名", minWidth: "100" },
    { prop: "gender", label: "性别", minWidth: "80" },
    { prop: "age", label: "年龄", minWidth: "80" },
    { prop: "doctor", label: "医生", minWidth: "100" },
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
