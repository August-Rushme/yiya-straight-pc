<script lang="ts" setup>
import PageContent from "@/components/page-content"
import PageSearch from "@/components/page-search"
import PageModal from "@/components/page-modal"

import { searchFormConfig } from "./config/search.config"
import { contentTableConfig } from "./config/content.config"
import { modalConfig } from "./config/modal.config"

import { usePageSearch } from "@/hooks/use-page-search"
import { usePageModal } from "@/hooks/use-page-modal"

const pageName = "menu"
// pageModal相关的hook逻辑
const { pageContentRef, handleResetClick, handleQueryClick } = usePageSearch()
// 调用hook获取公共变量和函数
const { pageModalRef, defaultInfo, handleNewData, handleEditData, handleDeleteData, handleSaveData, modalTitle } =
  usePageModal()

defineExpose({
  handleEditData,
  handleNewData
})
</script>
<template>
  <div class="app-container">
    <el-card>
      <page-search
        :searchFormConfig="searchFormConfig"
        @resetBtnClick="handleResetClick(pageName)"
        @queryBtnClick="handleQueryClick"
      />
    </el-card>
    <el-card class="mt-5">
      <page-content
        :contentTableConfig="contentTableConfig"
        :pageName="pageName"
        @editBtnClick="handleEditData"
        @saveBtnClick="handleSaveData($event, pageName)"
        @deleteBtnClick="handleDeleteData($event, pageName)"
        ref="pageContentRef"
      >
        <template #handlerHeader>
          <el-button type="primary" size="small" @click="handleNewData('添加角色')"> 添加角色 </el-button>
        </template>
      </page-content>
    </el-card>
    <page-modal
      :defaultInfo="defaultInfo"
      ref="pageModalRef"
      :pageName="pageName"
      :pageModalConfig="modalConfig"
      :title="modalTitle"
    />
  </div>
</template>

<style lang="scss" scoped></style>
