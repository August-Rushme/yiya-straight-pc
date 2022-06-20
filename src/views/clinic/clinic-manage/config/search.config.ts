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
      field: "enable",
      type: "select",
      label: "用户状态",
      placeholder: "请选择用户状态",
      options: [
        { label: "启用", value: "启用" },
        { label: "禁用", value: "禁用" }
      ]
    }
  ]
}
