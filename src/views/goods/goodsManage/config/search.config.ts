/*
 * @Author: Kenny
 * @Date: 2022-06-22 15:00:04
 * @LastEditors: Kenny
 * @LastEditTime: 2022-06-22 17:27:54
 * @FilePath: \yiya-straight-pc\src\views\goods\goodsManage\config\search.config.ts
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
      label: "商品名称",
      placeholder: "请输入商品名称"
    },
    {
      field: "type",
      type: "select",
      label: "商品类型",
      placeholder: "请选择商品类型",
      options: [
        {
          label: "牙齿美白",
          value: "0"
        },
        {
          label: "牙齿矫正",
          value: "1"
        },
        {
          label: "口腔检查",
          value: "2"
        },
        {
          label: "牙齿治疗",
          value: "3"
        }
      ]
    },
    {
      field: "status",
      type: "select",
      label: "商品状态",
      placeholder: "请选择商品状态",
      options: [
        {
          label: "上架",
          value: "0"
        },
        {
          label: "下架",
          value: "1"
        }
      ]
    },
    {
      field: ["minNumber", "maxNumber"],
      type: "numberRange",
      label: "商品金额",
      placeholder: "请输入商品金额"
    }
  ]
}
