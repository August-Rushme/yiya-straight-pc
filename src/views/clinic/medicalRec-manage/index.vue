<script setup lang="ts">
import PageContent from "@/components/page-content"
import PageSearch from "@/components/page-search"
import PageModal from "@/components/page-modal"

import { searchFormConfig } from "./config/search.config"
import { contentTableConfig } from "./config/content.config"
import { modalConfig } from "./config/modal.config"

import { usePageSearch } from "@/hooks/use-page-search"
import { usePageModal } from "@/hooks/use-page-modal"
import cache from "@/utils/cache"

const pageName = "medicalRecord"
const userInfo = cache.getCache("userInfo")
const { pageContentRef, handleResetClick, handleQueryClick } = usePageSearch()
// 调用hook获取公共变量和函数
const { pageModalRef, defaultInfo, handleNewData, handleEditData, handleDeleteData, handleSaveData, modalTitle } =
  usePageModal()

// 搜索需要的其它参数
const searchOtherInfo = {
  buk: userInfo.buk,
  clinicId: userInfo.clinicId,
  useAdvanceSelect: true,
  pageNum: 1,
  pageSize: 6
}
</script>
<template>
  <div app-container>
    <el-card>
      <page-search
        :searchFormConfig="searchFormConfig"
        @resetBtnClick="handleResetClick(pageName)"
        @queryBtnClick="handleQueryClick($event, pageName, searchOtherInfo)"
      />
    </el-card>
    <el-card class="mt-5">
      <page-content
        :contentTableConfig="contentTableConfig"
        :pageName="pageName"
        @editBtnClick="handleEditData($event, { mode: 'dialog' })"
        @saveBtnClick="handleSaveData($event, pageName)"
        @deleteBtnClick="handleDeleteData($event, pageName, { otherInfo: { tip: '诊所' } })"
        :isShowBtn="true"
        ref="pageContentRef"
      >
        <template #handlerHeader>
          <el-button type="primary" size="small" @click="handleNewData('添加病例')"> 添加病例 </el-button>
        </template>
        <!-- 状态 -->
        <template #status="scope">
          <el-tag size="small" :type="scope.row.status == 1 ? 'success' : 'danger'">
            {{ scope.row.status == 1 ? "已写" : "未写" }}
          </el-tag>
        </template>
        <template #type="scope">
          <el-tag size="small" :type="scope.row.type == 1 ? 'success' : 'danger'">
            {{ scope.row.type == 1 ? "初诊" : "复诊" }}
          </el-tag>
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
