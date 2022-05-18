<script lang="ts" setup>
import { reactive } from "vue"

import PageContent from "@/components/page-content"
import PageSearch from "@/components/page-search"

import { searchFormConfig } from "./config/search.config"
import { contentTableConfig } from "./config/content.config"

import { usePageSearch } from "@/hooks/use-page-search"

const { pageContentRef, handleResetClick, handleQueryClick } = usePageSearch()
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
        @editBtnClick="state.handleEditData"
        @deleteBtnClick="state.handleDeleteData"
        ref="pageContentRef"
      >
        <template #handlerHeader>
          <el-button type="primary" size="small" @click="state.handleAddUser"> 添加用户 </el-button>
        </template>
        <template #role="scope">
          <el-button size="small" type="warning" style="font-size: 10px" @click="state.handleRoleClick(scope.row)">
            <el-icon mr1><setting /></el-icon>
            分配角色
          </el-button>
        </template>
      </page-content>
    </el-card>
  </div>
</template>

<style lang="scss" scoped></style>
