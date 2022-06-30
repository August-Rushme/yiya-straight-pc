/*
 * @Author: Kenny
 * @Date: 2022-06-19 19:48:36
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-06-27 21:26:42
 * @FilePath: \yiya-straight-pc\src\views\dashboard\workbench\calendar\config\form.config.ts
 */
import { IForm } from "@/base-ui/form"
export const modalConfig: IForm = {
  formItems: [
    {
      field: "patientName",
      type: "input",
      label: "患者姓名:",
      placeholder: "请输入患者姓名",
      otherOptions: {
        clearable: true
      },
      rules: [{ type: "string", required: true, message: "请输入患者姓名", trigger: "blur" }]
    },
    {
      field: "doctorName",
      type: "input",
      label: "医生姓名:",
      placeholder: "请输入医生姓名",
      otherOptions: {
        clearable: true
      },
      rules: [{ type: "string", required: true, message: "请输入医生姓名", trigger: "blur" }]
    },
    {
      field: "appiontmentTime",
      type: "datepicker",
      label: "预约时间:",
      otherOptions: {
        type: "datetimerange",
        rangeSeparator: "到",
        startPlaceholder: "开始时间",
        endPlaceholder: "结束时间"
      },
      rules: [{ required: true, message: "请选择预时间", trigger: "blur" }]
    },
    {
      field: "patientGender",
      type: "treeSelect",
      label: "患者性别:",
      placeholder: "请选择患者性别",
      options: [
        {
          value: "男",
          label: "男"
        },
        {
          value: "女",
          label: "女"
        }
      ],
      rules: [{ required: true, message: "请输选择患者性别", trigger: "blur" }]
    },
    {
      field: "patientPhone",
      type: "input",
      label: "患者手机号:",
      placeholder: "请输入患者手机号",
      otherOptions: {
        clearable: true
      },
      rules: [
        { required: true, message: "请输入手机号", trigger: "blur" },
        {
          pattern: /^1(3\d|4[5-9]|5[0-35-9]|6[2567]|7[0-8]|8\d|9[0-35-9])\d{8}$/,
          message: "请输入正确的手机号",
          trigger: "blur"
        }
      ]
    },
    {
      field: "project",
      type: "treeSelect",
      label: "预约项目:",
      placeholder: "请选择预约项目",
      options: [
        {
          value: "种植牙",
          label: "种植牙"
        },
        {
          value: "烤瓷牙",
          label: "烤瓷牙"
        },
        {
          value: "龋齿",
          label: "龋齿"
        },
        {
          value: "牙齿美白",
          label: "牙齿美白"
        },
        {
          value: "牙齿矫正",
          label: "牙齿矫正"
        }
      ],
      rules: [{ required: true, message: "请输选择预约项目", trigger: "blur" }]
    },
    {
      field: "remark",
      type: "input",
      label: "备注:",
      placeholder: "输入备注",
      otherOptions: {
        type: "textarea",
        clearable: true
      },
      rules: [{ required: true, message: "输入备注", trigger: "blur" }]
    }
  ],
  colLayout: { span: 24 },
  itemStyle: {},
  labelPosition: "right",
  labelWidth: "auto"
}
