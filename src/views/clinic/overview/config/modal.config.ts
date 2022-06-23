import { IForm } from "@/base-ui/form"

export const modalConfig: IForm = {
  formItems: [
    {
      field: "name",
      type: "text",
      label: "机构简称:"
    },
    {
      field: "code",
      type: "text",
      label: "机构编码:"
    },
    {
      field: "tel",
      type: "text",
      label: "联系电话:"
    },
    {
      field: "institutionCode",
      type: "text",
      label: "医疗代码:"
    },
    {
      field: "workTime",
      type: "text",
      label: "营业时间:"
    },
    {
      field: "website",
      type: "text",
      label: "企业网址:"
    },
    {
      field: "address",
      type: "text",
      label: "所在地址:"
    },
    {
      field: "detailedAddress",
      type: "text",
      label: "详细地址:"
    },
    {
      field: "img",
      type: "image",
      label: "诊所头像:",
      otherOptions: {
        style: {}
      }
    }
  ],
  colLayout: { span: 8 },
  labelPosition: "left",
  labelWidth: "auto"
}

export const modalAppendixConfig: IForm = {
  formItems: [
    {
      field: "img",
      type: "image",
      label: "诊所头像:"
    }
  ],
  colLayout: { span: 8 },
  labelPosition: "left",
  labelWidth: "auto"
}
