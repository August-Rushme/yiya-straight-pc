/*
 * @Author: Kenny
 * @Date: 2022-06-17 14:54:19
 * @LastEditors: Kenny
 * @LastEditTime: 2022-06-20 17:28:36
 * @FilePath: \yiya-straight-pc\src\base-ui\form\types\index.ts
 */
type IFormType = "input" | "password" | "select" | "datepicker" | "menuIcon" | "treeSelect" | "switch" | "datetimerange"

export interface IFormItem {
  field: string
  type: IFormType
  label: string
  rules?: any[]
  placeholder?: any
  // 针对select
  options?: any[]
  // 针对特殊的属性
  otherOptions?: any
  isHidden?: boolean
}

export interface IForm {
  formItems: IFormItem[]
  labelWidth?: string
  labelPosition?: string
  colLayout?: any
  itemStyle?: any
  title?: string
  rules?: any
}
