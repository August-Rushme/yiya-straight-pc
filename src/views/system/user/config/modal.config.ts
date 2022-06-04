import { IForm } from "@/base-ui/form"

export const modalConfig: IForm = {
  formItems: [
    {
      field: "userName",
      type: "input",
      label: "用户名",
      placeholder: "请输入用户名"
    },
    {
      field: "name",
      type: "input",
      label: "真实姓名",
      placeholder: "请输入真实姓名"
    },
    {
      field: "password",
      type: "password",
      label: "用户密码",
      placeholder: "请输入密码",
      isHidden: false
    },
    {
      field: "tel",
      type: "input",
      label: "电话号码",
      placeholder: "请输入电话号码"
    }
  ],
  colLayout: { span: 24 },
  itemStyle: {}
}
