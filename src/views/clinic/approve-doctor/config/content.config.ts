import { ITablePropsType } from "@/base-ui/table/types"

export const contentTableConfig: ITablePropsType = {
  title: "审批列表",
  propList: [
    { prop: "userName", label: "姓名", minWidth: "100" },
    { prop: "gender", label: "性别", minWidth: "100" },
    { prop: "age", label: "年龄", minWidth: "100" },
    { prop: "phone", label: "电话号码", minWidth: "100" },
    { prop: "practiceDuration", label: "执业时长", minWidth: "100" },
    { prop: "status", label: "状态", minWidth: "100", slotName: "status" },
    {
      prop: "applyDate",
      label: "创建时间",
      minWidth: "120",
      slotName: "created"
    },

    { label: "操作", minWidth: "120", slotName: "handler" }
  ],
  showFooter: true,
  showSelectColumn: true,
  showIndexColumn: false,
  isBorder: false
}
