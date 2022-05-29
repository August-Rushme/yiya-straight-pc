import { ref } from "vue"
import PageModal from "@/components/page-modal"
import { useSystemStore } from "@/store/modules/system"

type CallbackFn = (item?: any) => void
const store = useSystemStore()
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
    modalTitle.value = "编辑"
    item.edit = true
    defaultInfo.value = { ...item }
    // if (pageModalRef.value) {
    //   pageModalRef.value.modalVisible = true
    // }
    editCb && editCb(item)
  }
  const handleSaveData = (item: any, pageName: string) => {
    store.editPageDataAction({ editData: item, pageName })
    item.edit = false
  }
  return { pageModalRef, defaultInfo, handleNewData, handleEditData, modalTitle, handleSaveData }
}
