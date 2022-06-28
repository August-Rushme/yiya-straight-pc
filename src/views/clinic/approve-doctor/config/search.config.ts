/*
 * @Author: Kenny
 * @Date: 2022-06-22 18:12:11
 * @LastEditors: Kenny
 * @LastEditTime: 2022-06-22 20:17:23
 * @FilePath: \yiya-straight-pc\src\views\clinic\approve\config\search.config.ts
 */
import { IForm } from "@/base-ui/form"

export const searchFormConfig: IForm = {
  title: "",
  labelWidth: "120px",
  itemStyle: {
    padding: "10px 20px"
  },
  formItems: [
    {
      field: "userName",
      type: "input",
      label: "姓名",
      placeholder: "请输入姓名"
    },
    {
      field: "gender",
      type: "select",
      label: "性别",
      placeholder: "请选择性别",
      options: [
        {
          label: "男",
          value: "男"
        },
        {
          label: "女",
          value: "女"
        }
      ]
    },

    {
      field: "status",
      type: "select",
      label: "审批状态",
      placeholder: "请选择审批状态",
      options: [
        {
          value: "所有",
          label: "所有"
        },
        {
          value: "待审批",
          label: "待审批"
        },
        {
          value: "审批中",
          label: "审批中"
        },
        {
          value: "审批拒绝",
          label: "审批拒绝"
        },
        {
          value: "审批通过",
          label: "审批通过"
        }
      ]
    }
  ]
}
