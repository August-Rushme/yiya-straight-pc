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
      label: "角色",
      placeholder: "请输入角色名名"
    },
    {
      field: "code",
      type: "input",
      label: "角色编码",
      placeholder: "请输入角色编码"
    }
  ]
}
