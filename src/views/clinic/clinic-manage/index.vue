<script setup lang="ts">
import PageContent from "@/components/page-content"
import PageSearch from "@/components/page-search"
import PageModal from "@/components/page-modal"

import { searchFormConfig } from "./config/search.config"
import { contentTableConfig } from "./config/content.config"
import { modalConfig } from "./config/modal.config"

import { usePageSearch } from "@/hooks/use-page-search"
import { usePageModal } from "@/hooks/use-page-modal"

const pageName = "clinic"
const { pageContentRef, handleResetClick, handleQueryClick } = usePageSearch()
// 调用hook获取公共变量和函数
const { pageModalRef, defaultInfo, handleNewData, handleEditData, handleDeleteData, handleSaveData, modalTitle } =
  usePageModal()

// const handleStatusChange = (row: any) => {
//   const r = window.confirm(`确定${row.status === 1 ? "禁用" : "启用"}该用户吗？`)
//   if (r) {
//     row.status === 1 ? (row.status = 0) : (row.status = 1)
//   }
// }

// 下架诊所
// const handleOff = () => {
//   console.log("下架诊所")
// }
</script>
<template>
  <div app-container>
    <el-card>
      <page-search
        :searchFormConfig="searchFormConfig"
        @resetBtnClick="handleResetClick"
        @queryBtnClick="handleQueryClick"
      />
    </el-card>
    <el-card class="mt-5">
      <page-content
        :contentTableConfig="contentTableConfig"
        :pageName="pageName"
        @editBtnClick="handleEditData($event, { mode: 'dialog' })"
        @saveBtnClick="handleSaveData($event, pageName)"
        @deleteBtnClick="handleDeleteData($event, pageName, { otherInfo: { tip: '诊所' } })"
        ref="pageContentRef"
      >
        <template #handlerHeader>
          <el-button type="primary" size="small" @click="handleNewData('添加诊所')"> 添加诊所 </el-button>
        </template>
        <!-- 状态 -->
        <template #status="scope">
          <el-tag size="small" :type="scope.row.status == 1 ? 'success' : 'danger'">
            {{ scope.row.status == 1 ? "启用中" : "下架中" }}
          </el-tag>
        </template>
        <!-- <template #default>
          <el-button type="warning" style="font-size: 10px" size="default" @click="handleOff">
            <el-icon mr1><Hide /></el-icon>下架
          </el-button>
        </template> -->
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
