import { IForm } from "@/base-ui/form"
export const modalConfig: IForm = {
  formItems: [
    {
      field: "name",
      type: "input",
      label: "角色名",
      placeholder: "请输入角色名",
      rules: [
        { type: "string", required: true, message: "请输入角色名", trigger: "blur" },
        {
          min: 2,
          max: 5,
          pattern: /[\u4e00-\u9fa5]/,
          message: "只能是中文",
          trigger: "blur"
        }
      ]
    },
    {
      field: "code",
      type: "input",
      label: "角色编码",
      placeholder: "请输入角色编码",
      isHidden: false,
      rules: [{ required: true, message: "请输入角色编码", trigger: "blur" }]
    },
    {
      field: "description",
      type: "input",
      label: "权限描述",
      placeholder: "请输入权限描述",
      rules: [{ required: true, message: "请输入权限描述", trigger: "blur" }]
    }
  ],
  colLayout: { span: 24 },
  itemStyle: {}
}
