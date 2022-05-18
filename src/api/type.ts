export interface IDataType<T = any> {
  success: boolean
  data: T
  message: string
}
