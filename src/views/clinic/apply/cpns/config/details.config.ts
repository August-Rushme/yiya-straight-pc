import { IForm } from "@/base-ui/form"
export const modalConfig: IForm = {
  formItems: [
    {
      field: "name",
      type: "text",
      label: "诊所名称:"
    },
    {
      field: "address",
      type: "text",
      label: "诊所地址:"
    },
    {
      field: "detailedAddress",
      type: "text",
      label: "诊所详细地址:"
    },
    {
      field: "tel",
      type: "text",
      label: "联系电话:"
    },
    {
      field: "license",
      type: "image",
      label: "诊所执业许可证:",
      otherOptions: {
        style: {
          width: "200px",
          height: "180px"
        }
      }
    },
    {
      field: "idCardFront",
      type: "image",
      label: "身份证正面:",
      otherOptions: {
        style: {
          width: "200px",
          height: "180px"
        }
      }
    },
    {
      field: "idCardBack",
      type: "image",
      label: "身份证反面:",
      otherOptions: {
        style: {
          width: "200px",
          height: "180px"
        }
      }
    }
  ],
  colLayout: { span: 12 },
  itemStyle: {},
  labelPosition: "right",
  labelWidth: "120px"
}
