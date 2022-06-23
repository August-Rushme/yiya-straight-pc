export interface ITablePropsType {
  title?: string
  propList: IPropItem[]
  listData?: any[]
  childrenProps?: Record<string, unknown>
  showFooter?: boolean
  showSelectColumn?: boolean
  showIndexColumn?: boolean
  isBorder?: boolean
}

export interface IPropItem {
  prop?: string | any
  label: string
  minWidth?: string
  slotName?: string
  isHidden?: boolean
}
