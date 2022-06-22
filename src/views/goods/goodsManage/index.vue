<!--
 * @Author: Kenny
 * @Date: 2022-06-22 10:45:58
 * @LastEditors: Kenny
 * @LastEditTime: 2022-06-22 17:16:27
 * @FilePath: \yiya-straight-pc\src\views\goods\goodsManage\index.vue
-->
<script setup lang="ts">
import { useRouter } from "vue-router"
import PageContent from "@/components/page-content"
import PageSearch from "@/components/page-search"
import PageModal from "@/components/page-modal"

import { searchFormConfig } from "./config/search.config"
import { contentTableConfig } from "./config/content.config"
import { modalConfig } from "./config/modal.config"

import { usePageSearch } from "@/hooks/use-page-search"
import { usePageModal } from "@/hooks/use-page-modal"
const pageName = "user"
const router = useRouter()
const { pageContentRef, handleResetClick, handleQueryClick } = usePageSearch()
const goAddGoodPage = () => {
  router.push({ path: "/goods/goodsAdd" })
}
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
          @editBtnClick="handleEditData($event, { mode: 'drawer' })"
          @saveBtnClick="handleSaveData($event, pageName)"
          @deleteBtnClick="handleDeleteData($event, pageName)"
          ref="pageContentRef"
        >
          <template #handlerHeader>
            <el-button type="primary" size="small" @click="goAddGoodPage"> 添加商品 </el-button>
          </template>
          <template #image>
            <el-image
              style="width: 100px; height: 100px"
              src="https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg"
              :preview-src-list="['https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg']"
              fit="cover"
            />
          </template>
          <template #status="scope">
            <el-switch v-model="scope.row.status" active-color="#13ce66" inactive-color="#ff4949" />
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
  </div>
</template>

<style lang="scss" scoped></style>
