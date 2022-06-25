/*
 * @Author: Kenny
 * @Date: 2022-06-17 14:54:19
 * @LastEditors: Kenny
 * @LastEditTime: 2022-06-24 15:48:44
 * @FilePath: \yiya-straight-pc\src\hooks\use-page-modal.ts
 */
import { ref } from "vue"
import PageModal from "@/components/page-modal"
import { useSystemStore } from "@/store/modules/system"
import { ElMessageBox } from "element-plus"
import message from "@/utils/message"

interface IOtherInfo {
  mode?: "save" | "dialog" | "drawer"
  otherInfo?: any
}
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
  const handleEditData = (item: any, otherInfo?: IOtherInfo) => {
    console.log(item)

    modalTitle.value = "编辑"
    // 判断择编辑模式
    if (otherInfo?.mode == "save") {
      // 非弹窗式
      item.edit = true
    }
    defaultInfo.value = { ...item }
    if (pageModalRef.value && otherInfo?.mode == "dialog") {
      // 弹窗式
      pageModalRef.value.modalVisible = true
    }
    editCb && editCb(item)
  }
  // 保存
  const handleSaveData = (item: any, pageName: string) => {
    store.editPageDataAction({ editData: item, pageName })
    item.edit = false
  }
  // 删除
  const handleDeleteData = (item: any, pageName: string, otherInfo?: IOtherInfo) => {
    ElMessageBox.confirm(`此操作将永久删除该${otherInfo?.otherInfo.tip ?? "数据项"}, 是否继续?`, "提示", {
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
