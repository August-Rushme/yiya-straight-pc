/*
 * @Author: Kenny
 * @Date: 2022-06-17 14:54:19
 * @LastEditors: Kenny
 * @LastEditTime: 2022-06-22 17:25:44
 * @FilePath: \yiya-straight-pc\src\base-ui\form\types\index.ts
 */
type IFormType =
  | "input"
  | "password"
  | "select"
  | "datepicker"
  | "menuIcon"
  | "treeSelect"
  | "switch"
  | "upload"
  | "text"
  | "image"
  | "numberRange"

export interface IFormItem {
  field: string | string[]
  type: IFormType
  label: string
  rules?: any[]
  placeholder?: any
  // 针对select
  options?: any[]
  // 针对特殊的属性
  otherOptions?: any
  isHidden?: boolean
  size?: number | string
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
