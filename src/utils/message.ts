import { ElMessage } from "element-plus"
class Message {
  success(msg: string) {
    ElMessage.success({
      message: msg,
      type: "success"
    })
  }
  error(msg: string) {
    ElMessage.error(msg)
  }
  warning(msg: string) {
    ElMessage.warning({
      message: msg,
      type: "warning"
    })
  }
  tips(msg: string) {
    ElMessage(msg)
  }
  info(msg: string) {
    ElMessage.info(msg)
  }
}
export default new Message()
