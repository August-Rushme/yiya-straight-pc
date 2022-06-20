import { IForm } from "@/base-ui/form"
export const modalConfig: IForm = {
  formItems: [
    {
      field: "name",
      type: "input",
      label: "诊所名称",
      placeholder: "请输入诊所名称",
      rules: [
        { type: "string", required: true, message: "请输入诊所名称s", trigger: "blur" },
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
      field: "detailedAddress",
      type: "input",
      label: "详细地址",
      placeholder: "请输入详细地址",
      isHidden: false,
      rules: [{ required: true, message: "请输入详细地址", trigger: "blur" }]
    },
    {
      field: "label",
      type: "input",
      label: "诊所类型",
      placeholder: "请输入诊所类型",
      rules: [{ required: true, message: "请输入诊所类型", trigger: "blur" }]
    }
  ],
  colLayout: { span: 24 },
  itemStyle: {}
}
