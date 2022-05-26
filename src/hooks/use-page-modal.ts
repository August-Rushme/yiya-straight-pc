import { ref } from "vue"
import PageModal from "@/components/page-modal"
import message from "@/utils/message"

type CallbackFn = (item?: any) => void
const modalTitle = ref("编辑")
export function usePageModal(newCb?: CallbackFn, editCb?: CallbackFn) {
  const pageModalRef = ref<InstanceType<typeof PageModal>>()
  const defaultInfo = ref({})
  const handleNewData = () => {
    modalTitle.value = "新增"
    defaultInfo.value = {}
    if (pageModalRef.value) {
      pageModalRef.value.modalVisible = true
    }
    newCb && newCb()
  }
  const handleEditData = (item: any) => {
    console.log(item)
    modalTitle.value = "编辑"
    item.edit = true
    defaultInfo.value = { ...item }
    // if (pageModalRef.value) {
    //   pageModalRef.value.modalVisible = true
    // }
    editCb && editCb(item)
  }
  const handleSaveData = (item: any) => {
    item.edit = false
    message.success("保存成功")
    console.log(item)
  }
  return { pageModalRef, defaultInfo, handleNewData, handleEditData, modalTitle, handleSaveData }
}
