import { IForm } from "@/base-ui/form"
import { reactive } from "vue"

export const modalConfig: IForm = {
  formItems: [
    {
      field: "userName",
      type: "input",
      label: "用户名",
      placeholder: "请输入用户名",
      rules: [
        { required: true, message: "请输入用户名", trigger: "blur" },
        {
          min: 3,
          max: 10,
          pattern: /^[a-zA-Z]\w{5,12}$/,
          message: "长度在 6 到 12 个字符,只能是字母、数字、下划线，且必须以字母开头",
          trigger: "blur"
        }
      ]
    },
    {
      field: "name",
      type: "input",
      label: "真实姓名",
      placeholder: "请输入真实姓名",
      rules: [
        { type: "string", required: true, message: "请输入真实姓名", trigger: "blur" },
        {
          min: 2,
          max: 5,
          pattern: /[\u4e00-\u9fa5]/,
          message: "只能是中文姓名",
          trigger: "blur"
        }
      ]
    },
    {
      field: "password",
      type: "password",
      label: "用户密码",
      placeholder: "请输入密码",
      isHidden: false,
      rules: [
        { required: true, message: "请输入密码", trigger: "blur" },
        {
          min: 6,
          max: 12,
          message: "密码长度在 6 到 12 个字符",
          trigger: "blur"
        }
      ]
    },
    {
      field: "tel",
      type: "input",
      label: "电话号码",
      placeholder: "请输入电话号码",
      rules: [
        { required: true, message: "请输入电话号码", trigger: "blur" },
        {
          pattern: /^1[3456789]\d{9}$/,
          message: "请输入正确的手机号码",
          trigger: "blur"
        }
      ]
    }
  ],
  rules: reactive({
    name: [
      { required: true, message: "请输入用户名", trigger: "blur" },
      { type: "number", message: "age must be a number" }
    ]
  }),
  colLayout: { span: 24 },
  itemStyle: {}
}
