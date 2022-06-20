type IFormType = "input" | "password" | "select" | "datepicker" | "menuIcon" | "treeSelect" | "switch" | "upload"

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
