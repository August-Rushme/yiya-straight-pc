import { ref } from "vue"
import PageModal from "@/components/page-modal"
import { useSystemStore } from "@/store/modules/system"
import { ElMessageBox } from "element-plus"
import message from "@/utils/message"

type CallbackFn = (item?: any) => void
const store = useSystemStore()
const modalTitle = ref("编辑")
export function usePageModal(newCb?: CallbackFn, editCb?: CallbackFn) {
  const pageModalRef = ref<InstanceType<typeof PageModal>>()
  const defaultInfo = ref({})
  // 添加
  const handleNewData = (title: string) => {
    modalTitle.value = title
    defaultInfo.value = {}
    if (pageModalRef.value) {
      pageModalRef.value.modalVisible = true
    }
    newCb && newCb()
  }
  // 编辑
  const handleEditData = (item: any) => {
    console.log("item", item)

    modalTitle.value = "编辑"
    item.edit = true
    defaultInfo.value = { ...item }
    // if (pageModalRef.value) {
    //   pageModalRef.value.modalVisible = true
    // }
    editCb && editCb(item)
  }
  // 保存
  const handleSaveData = (item: any, pageName: string) => {
    store.editPageDataAction({ editData: item, pageName })
    item.edit = false
  }
  // 删除
  const handleDeleteData = (item: any, pageName: string) => {
    ElMessageBox.confirm("此操作将永久删除该员工, 是否继续?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    })
      .then(() => {
        store.deletePageDataAction({ pageName, id: item.id })
      })
      .catch(() => {
        message.info("已取消删除")
      })
  }
  return { handleNewData, handleEditData, handleDeleteData, handleSaveData, modalTitle, pageModalRef, defaultInfo }
}
