<script lang="ts" setup>
import { reactive } from "vue"

import PageContent from "@/components/page-content"
import PageSearch from "@/components/page-search"
import PageModal from "@/components/page-modal"

import { searchFormConfig } from "./config/search.config"
import { contentTableConfig } from "./config/content.config"
import { modalConfig } from "./config/modal.config"

import { usePageSearch } from "@/hooks/use-page-search"
import { usePageModal } from "@/hooks/use-page-modal"

// pageModal相关的hook逻辑
// 1.处理密码的逻辑
const newCallback = () => {
  const passwordItem = modalConfig.formItems.find((item) => item.field === "password")
  passwordItem!.isHidden = false
}
const editCallback = () => {
  const passwordItem = modalConfig.formItems.find((item) => item.field === "password")
  passwordItem!.isHidden = true
}

const { pageContentRef, handleResetClick, handleQueryClick } = usePageSearch()
// 调用hook获取公共变量和函数
const { pageModalRef, defaultInfo, handleNewData, handleEditData, handleSaveData, modalTitle } = usePageModal(
  newCallback,
  editCallback
)

const state = reactive({
  // 处理编辑
  handleEditData: () => {
    console.log("编辑")
  },
  // 删除
  handleDeleteData: () => {
    console.log("删除")
  },
  // 添加用户
  handleAddUser: () => {
    console.log("添加用户")
  },
  // 处理角色分配
  handleRoleClick: (row: any) => {
    console.log("角色分配" + row)
  }
})
defineExpose({
  handleEditData,
  handleNewData
})
</script>
<template>
  <div app-container class="user">
    <el-card>
      <page-search
        :searchFormConfig="searchFormConfig"
        @resetBtnClick="handleResetClick"
        @queryBtnClick="handleQueryClick"
      />
    </el-card>
    <el-card mt-5>
      <page-content
        :contentTableConfig="contentTableConfig"
        pageName="user"
        @editBtnClick="handleEditData"
        @saveBtnClick="handleSaveData"
        @deleteBtnClick="state.handleDeleteData"
        ref="pageContentRef"
      >
        <template #handlerHeader>
          <el-button type="primary" size="small" @click="handleNewData"> 添加用户 </el-button>
        </template>
        <template #role="scope">
          <el-button size="default" type="warning" style="font-size: 10px" @click="state.handleRoleClick(scope.row)">
            <el-icon mr1><setting /></el-icon>
            分配角色
          </el-button>
        </template>
      </page-content>
    </el-card>
    <page-modal
      :defaultInfo="defaultInfo"
      ref="pageModalRef"
      pageName="users"
      :pageModalConfig="modalConfig"
      :title="modalTitle"
    />
  </div>
</template>

<style lang="scss" scoped></style>
