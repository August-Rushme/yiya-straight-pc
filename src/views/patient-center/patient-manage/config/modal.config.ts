import { IForm } from "@/base-ui/form"
export const modalConfig: IForm = {
  formItems: [
    {
      field: "name",
      type: "input",
      label: "患者姓名",
      placeholder: "请输入患者姓名",
      rules: [{ type: "string", required: true, message: "请输入患者姓名", trigger: "blur" }]
    },
    {
      field: "gender",
      type: "select",
      label: "患者性别",
      placeholder: "请选择患者性别",
      options: [
        {
          label: "男",
          value: "男"
        },
        {
          label: "女",
          value: "女"
        }
      ],
      rules: [{ required: true, message: "请选择性别", trigger: "blur" }]
    },
    {
      field: "age",
      type: "input",
      label: "患者年龄",
      placeholder: "请输入患者年龄",
      rules: [{ required: true, message: "请输入患者年龄", trigger: "blur" }]
    },
    {
      field: "phone",
      type: "input",
      label: "患者电话",
      placeholder: "请输入患者电话",
      rules: [{ required: true, message: "请输入患者电话", trigger: "blur" }]
    },
    {
      field: "doctor",
      type: "input",
      label: "医生姓名",
      placeholder: "请输入医生姓名",
      rules: [{ required: true, message: "请输入医生姓名", trigger: "blur" }]
    },
    {
      field: "project",
      type: "input",
      label: "预约项目",
      placeholder: "请输入预约项目",
      rules: [{ required: true, message: "请输入预约项目", trigger: "blur" }]
    },
    {
      field: "appointmentTime",
      type: "datepicker",
      label: "预约时间",
      placeholder: "请选择预约时间",
      rules: [{ required: true, message: "请选择预约时间", trigger: "blur" }]
    },
    {
      field: "clinic",
      type: "input",
      label: "诊所",
      placeholder: "请输入诊所",
      rules: [{ required: true, message: "诊所", trigger: "blur" }]
    },
    {
      field: "isStore",
      type: "select",
      label: "是否到店",
      options: [
        {
          label: "未到店",
          value: 0
        },
        {
          label: "已到店",
          value: 1
        }
      ]
    },
    {
      field: "isConsumption",
      type: "select",
      label: "是否消费",
      options: [
        {
          label: "未消费",
          value: 0
        },
        {
          label: "已消费",
          value: 1
        }
      ]
    }
  ],
  colLayout: { span: 24 },
  itemStyle: {}
}
