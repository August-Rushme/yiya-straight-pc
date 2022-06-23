/*
 * @Author: Kenny
 * @Date: 2022-06-22 18:47:51
 * @LastEditors: Kenny
 * @LastEditTime: 2022-06-23 09:30:38
 * @FilePath: \yiya-straight-pc\src\views\goods\goodsAdd\config\form.config.ts
 */
import { IForm } from "@/base-ui/form"
export const modalConfig: IForm = {
  formItems: [
    {
      field: "name",
      type: "input",
      label: "商品名称",
      placeholder: "请输入商品名称",
      rules: [
        { required: true, message: "请输入诊所名称", trigger: "blur" },
        {
          min: 1,
          max: 15,
          pattern: /[\u4e00-\u9fa5]/,
          message: "只能是中文名称",
          trigger: "blur"
        }
      ]
    },
    {
      field: "price",
      type: "input",
      label: "商品价格",
      placeholder: "请输入商品价格",
      rules: [
        { required: true, message: "请输入诊商品价格", trigger: "blur" },
        {
          pattern: /(^[1-9][0-9]{0,7}$)|(^((0\.0[1-9]$)|(^0\.[1-9]\d?)$)|(^[1-9][0-9]{0,7}\.\d{1,2})$)/,
          message: "商品价格应该大于0小于1亿且最多保留2位小数",
          trigger: "blur"
        }
      ]
    },
    {
      field: "oldPrice",
      type: "input",
      label: "商品虚拟价格",
      placeholder: "请输入商品虚拟价格(即打折前的价格)",
      rules: [
        { required: true, message: "请输入诊商品价格", trigger: "blur" },
        {
          pattern: /(^[1-9][0-9]{0,7}$)|(^((0\.0[1-9]$)|(^0\.[1-9]\d?)$)|(^[1-9][0-9]{0,7}\.\d{1,2})$)/,
          message: "商品价格应该大于0小于1亿且最多保留2位小数",
          trigger: "blur"
        }
      ]
    },
    {
      field: "type",
      type: "select",
      label: "商品类型",
      placeholder: "请选择商品类型",
      options: [
        {
          label: "测试",
          value: "测试"
        }
      ],
      rules: [{ required: true, message: "请选择商品类型", trigger: "change" }]
    },
    {
      field: "clinicId",
      type: "select",
      label: "所属诊所",
      placeholder: "请选择所属诊所",
      options: [
        {
          label: "测试",
          value: "1"
        }
      ],
      rules: [{ required: true, message: "请选择所属诊所", trigger: "change" }]
    },
    {
      field: "count",
      type: "input",
      label: "商品库存",
      placeholder: "请输入商品库存",
      rules: [
        { required: true, message: "请输入诊商品价格", trigger: "blur" },
        {
          pattern: /^[1-9]\d*$/,
          message: "库存应该大于0",
          trigger: "blur"
        }
      ]
    },
    {
      field: "label",
      type: "input",
      label: "商品标签",
      placeholder: "请输入商品标签(例如：工作日|限成人)",
      rules: [{ required: true, message: "请输入商品标签", trigger: "blur" }]
    },
    {
      field: "avaPerson",
      type: "select",
      label: "适用人群",
      placeholder: "请选择适用人群",
      options: [
        {
          label: "限儿童",
          value: "限儿童"
        },
        {
          label: "限成人",
          value: "限成人"
        },
        {
          label: "成人儿童通用",
          value: "成人儿童通用"
        }
      ],
      rules: [{ required: true, message: "请选择适用人群", trigger: "change" }]
    },
    {
      field: "avaTime",
      type: "input",
      label: "适用时间",
      placeholder: "请输入适用时间(例如: 周一到周五)",
      rules: [{ required: true, message: "请输入适用时间", trigger: "blur" }]
    }
  ],
  colLayout: { span: 24 },
  itemStyle: {}
}

export const modalFileConfig: IForm = {
  formItems: [
    {
      field: "img",
      type: "upload",
      label: "商品封面",
      rules: [{ required: true, message: "请上传诊商品封面", trigger: "blur" }]
    },
    {
      field: "imgDetail",
      type: "upload",
      label: "商品详细长图",
      rules: [{ required: true, message: "请上传商品详细长图", trigger: "blur" }]
    },
    {
      field: "idCardBack",
      type: "upload",
      label: "个人身份证(反面)",
      rules: [{ required: true, message: "请上传个人身份证", trigger: "blur" }]
    }
  ],
  colLayout: { span: 24 },
  itemStyle: {}
}
