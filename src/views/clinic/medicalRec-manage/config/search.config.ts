/*
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-07-08 18:23:47
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-07-08 19:34:06
 * @FilePath: \yiya-straight-pc\src\views\clinic\medicalRec-manage\config\search.config.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
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
      label: "患者姓名",
      placeholder: "请输入患者姓名"
    },
    {
      field: "label",
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
