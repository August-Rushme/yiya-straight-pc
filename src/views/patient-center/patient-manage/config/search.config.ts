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
      label: "患者姓名",
      placeholder: "请输入患者姓名"
    },
    {
      field: "doctor",
      type: "input",
      label: "医生姓名",
      placeholder: "请输入医生姓名"
    },
    {
      field: "gender",
      type: "select",
      label: "患者性别",
      placeholder: "请选择患者性别",
      options: [
        { label: "男", value: "男" },
        { label: "女", value: "女" }
      ]
    }
  ]
}
