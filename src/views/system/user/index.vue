<script lang="ts" setup>
import { reactive, ref } from "vue"

import PageContent from "@/components/page-content"
import PageSearch from "@/components/page-search"
import PageModal from "@/components/page-modal"

import { searchFormConfig } from "./config/search.config"
import { contentTableConfig } from "./config/content.config"
import { modalConfig } from "./config/modal.config"

import { usePageSearch } from "@/hooks/use-page-search"
import { usePageModal } from "@/hooks/use-page-modal"
import { useSystemStore } from "@/store/modules/system"
import cache from "@/utils/cache"

const store = useSystemStore()
const userInfo = cache.getCache("userInfo")
const pageName = "user"
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
const { pageModalRef, defaultInfo, handleNewData, handleEditData, handleDeleteData, handleSaveData, modalTitle } =
  usePageModal(newCallback, editCallback)

// 获取全部角色
const pageInfo = ref({
  pageNum: 1,
  pageSize: 6
})
const selectValue = ref<number[]>([]) // 已选中的角色
const options = ref<any>([]) // 所有的角色
const getRoleList = async () => {
  const res = await store.getAllRoleAction(pageInfo.value)
  res.list.map((role: any) => {
    options.value.push({
      value: role.id,
      label: role.name
    })
  })
}
getRoleList()
// 处理用户角色改变
const handleRoleChange = (value: any) => {
  console.log(value)
}
// 添加用户的其他逻辑
const addOtherInfo = {
  buk: userInfo.buk,
  clinicId: userInfo.clinicId
}

const state = reactive({
  userId: "",
  dialogVisible: false,
  // 删除

  handleStatusChange: (row: any) => {
    const r = window.confirm(`确定${row.status === 1 ? "禁用" : "启用"}该用户吗？`)
    if (r) {
      row.status === 1 ? (row.status = 0) : (row.status = 1)
    }
  },
  // 处理角色分配
  handleRoleClick: async (row: any) => {
    state.userId = row.id
    // 先清空已选中的角色
    selectValue.value = []
    // 获取已分配的角色
    await store.getUserRoleAction(row.id)
    selectValue.value = store.roles
    state.dialogVisible = true
  },
  // 确认分配角色
  handleRoleConfirm: () => {
    store.setUserRoleAction({ roleIds: selectValue.value, userId: state.userId })
    state.dialogVisible = false
  }
})

// 搜索需要的其它参数
const searchOtherInfo = {
  buk: userInfo.buk,
  clinicId: userInfo.clinicId,
  type: "search",
  pageNum: 1,
  pageSize: 6
}
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
        @queryBtnClick="handleQueryClick($event, pageName, searchOtherInfo)"
      />
    </el-card>
    <el-card class="mt-5">
      <page-content
        :contentTableConfig="contentTableConfig"
        :pageName="pageName"
        @editBtnClick="handleEditData($event, { mode: 'save' })"
        @saveBtnClick="handleSaveData($event, pageName)"
        @deleteBtnClick="handleDeleteData($event, pageName)"
        ref="pageContentRef"
      >
        <template #handlerHeader>
          <el-button type="primary" size="small" @click="handleNewData('添加用户')"> 添加用户 </el-button>
        </template>
        <!-- 状态 -->
        <template #status="scope">
          <el-button
            size="small"
            :type="scope.row.status == 1 ? 'success' : 'danger'"
            @click="state.handleStatusChange(scope.row)"
          >
            {{ scope.row.status == 1 ? "启用" : "禁用" }}
          </el-button>
        </template>
        <template #password="scope">
          <span v-if="!scope.row.edit">******</span>
          <el-input v-else size="small" v-model="scope.row.password" />
        </template>
        <!-- 分配角色 -->
        <template #role="scope">
          <el-button size="default" type="warning" style="font-size: 10px" @click="state.handleRoleClick(scope.row)">
            <el-icon class="mr1"><setting /></el-icon>
            分配角色
          </el-button>
        </template>
      </page-content>
    </el-card>
    <page-modal
      :defaultInfo="defaultInfo"
      :otherInfo="addOtherInfo"
      ref="pageModalRef"
      :pageName="pageName"
      :pageModalConfig="modalConfig"
      :title="modalTitle"
    />

    <!-- 角色分配对话框 -->
    <el-dialog v-model="state.dialogVisible" title="角色分配" width="25%">
      <el-select v-model="selectValue" multiple placeholder="Select" style="width: 100%" @change="handleRoleChange">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          {{ item.label }}
        </el-option>
      </el-select>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="state.dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="state.handleRoleConfirm">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped></style>
