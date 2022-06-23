import { IForm } from "@/base-ui/form"
export const modalConfig: IForm = {
  formItems: [
    {
      field: "clinicName",
      type: "text",
      label: "诊所名称:"
    },
    {
      field: "address",
      type: "text",
      label: "诊所地址:"
    },
    {
      field: "detailAddress",
      type: "text",
      label: "诊所详细地址:"
    },
    {
      field: "phone",
      type: "text",
      label: "联系电话:"
    },
    {
      field: "license",
      type: "image",
      label: "诊所执业许可证:",
      otherOptions: {
        style: {
          width: "140px",
          height: "100px"
        }
      }
    },
    {
      field: "idCardFront",
      type: "image",
      label: "身份证正面:",
      otherOptions: {
        style: {
          width: "140px",
          height: "100px"
        }
      }
    },
    {
      field: "idCardBack",
      type: "image",
      label: "身份证反面:",
      otherOptions: {
        style: {
          width: "140px",
          height: "100px"
        }
      }
    }
  ],
  colLayout: { span: 12 },
  itemStyle: {},
  labelPosition: "right",
  labelWidth: "120px"
}
