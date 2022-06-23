<!--
 * @Author: Kenny
 * @Date: 2022-06-22 10:45:58
 * @LastEditors: Kenny
 * @LastEditTime: 2022-06-23 16:16:05
 * @FilePath: \yiya-straight-pc\src\views\goods\orderManage\index.vue
-->
<script setup lang="ts">
import PageContent from "@/components/page-content"
import PageSearch from "@/components/page-search"
import PageModal from "@/components/page-modal"

import { searchFormConfig } from "./config/search.config"
import { contentTableConfig } from "./config/content.config"
import { modalConfig } from "./config/modal.config"

import { usePageSearch } from "@/hooks/use-page-search"
import { usePageModal } from "@/hooks/use-page-modal"
const pageName = "user"
const { pageContentRef, handleResetClick, handleQueryClick } = usePageSearch()
// 调用hook获取公共变量和函数
const { pageModalRef, defaultInfo, handleEditData, handleDeleteData, handleSaveData, modalTitle } = usePageModal()
</script>
<template>
  <div app-container>
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
          @editBtnClick="handleEditData($event, { mode: 'dialog' })"
          @saveBtnClick="handleSaveData($event, pageName)"
          @deleteBtnClick="handleDeleteData($event, pageName)"
          ref="pageContentRef"
        />
      </el-card>
      <page-modal
        :defaultInfo="defaultInfo"
        ref="pageModalRef"
        :pageName="pageName"
        :pageModalConfig="modalConfig"
        :title="modalTitle"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
