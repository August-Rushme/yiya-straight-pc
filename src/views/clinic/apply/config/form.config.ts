import { IForm } from "@/base-ui/form"
export const modalConfig: IForm = {
  formItems: [
    {
      field: "name",
      type: "input",
      label: "诊所名称",
      placeholder: "请输入诊所名称",
      rules: [
        { required: true, message: "请输入诊所名称", trigger: "blur" },
        {
          min: 2,
          max: 15,
          pattern: /[\u4e00-\u9fa5]/,
          message: "只能是中文名称",
          trigger: "blur"
        }
      ]
    },
    {
      field: "address",
      type: "input",
      label: "诊所地址",
      placeholder: "请输入诊所地址",
      rules: [{ type: "string", required: true, message: "请输入诊所地址", trigger: "blur" }]
    },
    {
      field: "detailedAddress",
      type: "input",
      label: "诊所详细地址",
      placeholder: "请输入诊所详细地址",
      rules: [{ type: "string", required: true, message: "请输入诊所详细地址", trigger: "blur" }]
    },
    {
      field: "tel",
      type: "input",
      label: "联系电话",
      placeholder: "请输入联系电话",
      isHidden: false,
      rules: [
        { required: true, message: "请输入联系电话", trigger: "blur" },
        {
          pattern: /^1[3456789]\d{9}$/,
          message: "请输入正确的手机号码",
          trigger: "blur"
        }
      ]
    }
  ],
  colLayout: { span: 24 },
  itemStyle: {}
}

export const modalFileConfig: IForm = {
  formItems: [
    {
      field: "license",
      type: "upload",
      label: "诊所执业许可证",
      rules: [{ required: true, message: "请上传诊所执业许可证", trigger: "blur" }]
    },
    {
      field: "idCardFront",
      type: "upload",
      label: "个人身份证(正面)",
      rules: [{ required: true, message: "请上传个人身份证", trigger: "blur" }]
    },
    {
      field: "idCardBack",
      type: "upload",
      label: "个人身份证(反面)",
      rules: [{ required: true, message: "请上传个人身份证", trigger: "blur" }]
    }
  ],
  colLayout: { span: 24 },
  itemStyle: {}
}
