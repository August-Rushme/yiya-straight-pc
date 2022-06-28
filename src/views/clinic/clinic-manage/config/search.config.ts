import { IForm } from "@/base-ui/form"

export const searchFormConfig: IForm = {
  title: "",
  labelWidth: "120px",
  itemStyle: {
    padding: "10px 20px"
  },
  formItems: [
    {
      field: "name",
      type: "input",
      label: "诊所名称",
      placeholder: "请输入诊所名称"
    },
    {
      field: "label",
      type: "input",
      label: "诊所类型",
      placeholder: "请输入诊所类型"
    },
    {
      field: "tel",
      type: "input",
      label: "电话号码",
      placeholder: "请输入电话号码"
    },
    {
      field: "status",
      type: "select",
      label: "诊所状态",
      placeholder: "请选择诊所状态",
      options: [
        { label: "启用中", value: "1" },
        { label: "下架中", value: "0" }
      ]
    }
  ]
}
