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
          label: "洗牙",
          value: "洗牙"
        },
        {
          label: "补牙",
          value: "补牙"
        },
        {
          label: "美白",
          value: "美白"
        },
        {
          label: "拔牙",
          value: "拔牙"
        },
        {
          label: "儿童齿科",
          value: "儿童齿科"
        },
        {
          label: "检查",
          value: "检查"
        },
        {
          label: "矫正",
          value: "矫正"
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
          label: "下架",
          value: "0"
        },
        {
          label: "上架",
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
