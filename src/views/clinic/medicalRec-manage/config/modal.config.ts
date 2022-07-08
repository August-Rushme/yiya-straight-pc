/*
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-07-08 18:23:47
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-07-08 19:18:11
 * @FilePath: \yiya-straight-pc\src\views\clinic\medicalRec-manage\config\modal.config.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { IForm } from "@/base-ui/form"
export const modalConfig: IForm = {
  formItems: [
    {
      field: "userName",
      type: "input",
      label: "用户名",
      placeholder: "请输入用户名",
      rules: [{ type: "string", required: true, message: "请输入用户名", trigger: "blur" }]
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
      rules: [{ required: true, message: "请输入选择性别", trigger: "blur" }]
    },
    {
      field: "age",
      type: "input",
      label: "患者年龄",
      placeholder: "请输入患者年龄",
      rules: [{ required: true, message: "请输入患者年龄", trigger: "blur" }]
    },
    {
      field: "time",
      type: "datepicker",
      label: "就诊时间",
      placeholder: "请输入就诊时间",
      rules: [{ required: true, message: "请输入就诊时间", trigger: "blur" }]
    },
    {
      field: "doctor",
      type: "input",
      label: "医生姓名",
      placeholder: "请输入医生姓名",
      rules: [{ required: true, message: "请输入医生姓名", trigger: "blur" }]
    },
    {
      field: "clinicName",
      type: "input",
      label: "诊所名称",
      placeholder: "请输入诊所名称",
      rules: [{ required: true, message: "请输入诊所名称", trigger: "blur" }]
    },
    {
      field: "handle",
      type: "input",
      label: "处置内容",
      placeholder: "请输入处置内容",
      rules: [{ required: true, message: "请输入处置内容", trigger: "blur" }]
    },
    {
      field: "advice",
      type: "input",
      label: "医嘱",
      placeholder: "请输入医嘱",
      rules: [{ required: true, message: "请输入医嘱", trigger: "blur" }]
    },
    {
      field: "type",
      type: "select",
      label: "是否为初诊",
      placeholder: "请选择诊断类型",
      options: [
        {
          label: "初诊",
          value: 0
        },
        {
          label: "复诊",
          value: 1
        }
      ],
      rules: [{ required: true, message: "请选择诊断类型", trigger: "blur" }]
    },
    {
      field: "status",
      type: "select",
      label: "状态",
      placeholder: "请选择状态",
      options: [
        {
          label: "未写",
          value: 0
        },
        {
          label: "已写",
          value: 1
        }
      ],
      rules: [{ required: true, message: "请输入选择状态", trigger: "blur" }]
    },
    {
      field: "stage",
      type: "input",
      label: "阶段",
      placeholder: "请输入阶段",
      rules: [{ required: true, message: "请输入阶段", trigger: "blur" }]
    }
  ],
  colLayout: { span: 24 },
  itemStyle: {}
}
