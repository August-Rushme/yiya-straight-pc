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
      field: "name",
      type: "input",
      label: "诊所名称",
      placeholder: "请输入诊所名称"
    },
    {
      field: "label",
      type: "input",
      label: "申请编号",
      placeholder: "请输入申请编号"
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
          value: "已挂起",
          label: "已挂起"
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
