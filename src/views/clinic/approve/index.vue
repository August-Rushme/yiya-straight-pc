<script lang="ts" setup>
import PageContent from "@/components/page-content"
import PageSearch from "@/components/page-search"
import PageModal from "@/components/page-modal"
import applyDetails from "@/components/applyDetails"

import { contentTableConfig } from "./config/content.config"
import { searchFormConfig } from "./config/search.config"
import { modalConfig } from "./config/modal.config"

import { usePageSearch } from "@/hooks/use-page-search"
import { usePageModal } from "@/hooks/use-page-modal"
import { ref } from "vue"
// import { useSystemStore } from "@/store/modules/system"
// import { ref } from "vue"

// const store = useSystemStore()

const pageName = "user"
const flag = ref(false)
const { pageContentRef, handleResetClick, handleQueryClick } = usePageSearch()
// 调用hook获取公共变量和函数
const { pageModalRef, defaultInfo, handleNewData, handleEditData, handleDeleteData, handleSaveData, modalTitle } =
  usePageModal()

// 处理查看审批
const handleView = () => {
  flag.value = true
  console.log("查看审批")
}

// 返回
const handleBack = () => {
  flag.value = false
}
defineExpose({
  handleEditData,
  handleNewData
})
</script>
<template>
  <div class="app-container">
    <div v-if="!flag">
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
          <template #btns="scope">
            <el-button type="primary" @click="handleView">查看</el-button>
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

    <div v-if="flag">
      <applyDetails @handleBack="handleBack" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.searhGroup {
  text-align: left;
  font-size: 16px;
  color: var(--elTableTextColor);
  transition: color 1s ease;
  margin-bottom: 10px;
  margin-left: 20px;
  .title {
    margin-right: 10px;
  }
}
</style>
