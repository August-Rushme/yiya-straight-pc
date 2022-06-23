/*
 * @Author: Kenny
 * @Date: 2022-06-22 15:00:04
 * @LastEditors: Kenny
 * @LastEditTime: 2022-06-23 15:47:30
 * @FilePath: \yiya-straight-pc\src\views\goods\orderManage\config\search.config.ts
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
      field: "orderNumber",
      type: "input",
      label: "订单编号",
      placeholder: "请输入订单编号"
    },
    {
      field: "userName",
      type: "input",
      label: "用户姓名",
      placeholder: "请输入用户姓名"
    },
    {
      field: "status",
      type: "select",
      label: "订单状态",
      placeholder: "请选择订单状态",
      options: [
        {
          label: "发货中",
          value: "0"
        },
        {
          label: "已发货",
          value: "1"
        },
        {
          label: "已收货",
          value: "2"
        }
      ]
    },
    {
      field: ["minNumber", "maxNumber"],
      type: "numberRange",
      label: "订单金额",
      placeholder: "请输入订单金额"
    }
  ]
}
