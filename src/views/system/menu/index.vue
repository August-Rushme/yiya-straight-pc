<script lang="ts" setup>
import PageContent from "@/components/page-content"

import PageModal from "@/components/page-modal"

import { contentTableConfig } from "./config/content.config"
import { modalConfig } from "./config/modal.config"

import { usePageModal } from "@/hooks/use-page-modal"
import { useSystemStoreHook } from "@/store/modules/system"
import { computed, ref } from "vue"
import message from "@/utils/message"

const pageName = "menu"
const store = useSystemStoreHook()

// 调用hook获取公共变量和函数
const { pageModalRef, defaultInfo, handleNewData, handleEditData, handleDeleteData, handleSaveData, modalTitle } =
  usePageModal()

// 动态添加菜单列表
const modalConfigRef = computed(() => {
  const parentId = modalConfig.formItems.find((item) => item.field === "parentId")
  parentId!.options = store.menuList.map((item) => {
    // 如果有children则递归添加
    const newMenuList = {
      value: item.id,
      label: item.name,
      children: item.children
        ? item.children.map((child: any) => {
            return {
              value: child.id,
              label: child.name
            }
          })
        : []
    }
    return newMenuList
  })

  return {
    ...modalConfig,
    title: modalTitle.value
  }
})

// 选项改变
const menuIds = ref<number[]>([])
const handleCheckChange = (row: any) => {
  if (row.length > 0) {
    menuIds.value = row.map((item: any) => item.id)
  } else {
    menuIds.value = []
  }
}
// 删除多个菜单
const handleDeleteMore = () => {
  if (menuIds.value.length > 0) {
    store.deletePageDataMoreAction({ pageName, menuIds: menuIds.value })
  } else {
    message.info("请选择要删除的菜单")
  }
}
defineExpose({
  handleEditData,
  handleNewData,
  modalConfigRef
})
</script>
<template>
  <div class="app-container">
    <el-card class="mt-5">
      <page-content
        :contentTableConfig="contentTableConfig"
        :pageName="pageName"
        @editBtnClick="handleEditData($event, { mode: 'dialog' })"
        @saveBtnClick="handleSaveData($event, pageName)"
        @deleteBtnClick="handleDeleteData($event, pageName)"
        @checkBtnClick="handleCheckChange($event)"
        ref="pageContentRef"
      >
        <template #handlerHeader>
          <el-button type="primary" size="small" @click="handleNewData('添加菜单')">添加菜单</el-button>
          <el-button type="danger" size="small" @click="handleDeleteMore">删除选中</el-button>
        </template>
        <template #menuType="scope">
          <el-tag v-if="scope.row.menuType == 0">一级菜单</el-tag>
          <el-tag v-else-if="scope.row.menuType == 1" type="success">二级菜单</el-tag>
          <el-tag v-else-if="scope.row.menuType == 2" type="warning">三级菜单</el-tag>
        </template>
        <template #icon="scope">
          <i :class="scope.row.icon" style="font-size: 18px" />
        </template>
      </page-content>
    </el-card>
    <page-modal
      :defaultInfo="defaultInfo"
      ref="pageModalRef"
      :pageName="pageName"
      :pageModalConfig="modalConfigRef"
      :title="modalTitle"
    />
  </div>
</template>

<style lang="scss" scoped></style>
