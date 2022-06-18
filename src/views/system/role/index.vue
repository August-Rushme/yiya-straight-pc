<script lang="ts" setup>
import PageContent from "@/components/page-content"
import PageSearch from "@/components/page-search"
import PageModal from "@/components/page-modal"

import { searchFormConfig } from "./config/search.config"
import { contentTableConfig } from "./config/content.config"
import { modalConfig } from "./config/modal.config"

import { usePageSearch } from "@/hooks/use-page-search"
import { usePageModal } from "@/hooks/use-page-modal"
import { useSystemStoreHook } from "@/store/modules/system"
import { computed, nextTick, ref } from "vue"
import { ElTree } from "element-plus"
import { menuMapLeafKeys } from "@/utils/menus-map"

const pageName = "role"
const store = useSystemStoreHook()
// pageModal相关的hook逻辑
const { pageContentRef, handleResetClick, handleQueryClick } = usePageSearch()
// 调用hook获取公共变量和函数
const { pageModalRef, defaultInfo, handleNewData, handleEditData, handleDeleteData, handleSaveData, modalTitle } =
  usePageModal()
// 授权相关

const getEntireMenu = async () => {
  await store.getPageListAction({ pageName: "menu", pageInfo: {} })
}
getEntireMenu()
const menus = computed(() => store.menuList)
const elTreeRef = ref<InstanceType<typeof ElTree>>()
// 是否显示
const drawerVisible = ref(false)
const roleId = ref()
const handleAuthorize = async (row: any) => {
  roleId.value = row.id
  drawerVisible.value = true
  // 获取角色的菜单
  await store.getMenuByRoleIdAction(row.id)
  // 处理默认选中的节点
  const leafKeys = menuMapLeafKeys(store.roleMenus)
  // 执行延迟回调
  nextTick(() => {
    elTreeRef.value?.setCheckedKeys(leafKeys, false)
  })
}
const menuIds = ref<number[]>([])
// 树形菜单选择
const handleCheckChange = (val1: any, val2: any) => {
  const checkedKeys = val2.checkedKeys
  const halfCheckedKeys = val2.halfCheckedKeys
  menuIds.value = [...checkedKeys, ...halfCheckedKeys]
}
// 处理确认分配权限
const handleMenuConfirm = () => {
  store.setRoleMenuAction({ roleId: roleId.value, menuIds: menuIds.value })
  drawerVisible.value = false
}
// 处理抽屉关闭
const handleClose = () => {
  // 清空选中的节点
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
        <template #default="scope">
          <el-button type="warning" style="font-size: 10px" @click="handleAuthorize(scope.row)"
            ><el-icon mr1><Setting /></el-icon>授权</el-button
          >
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

    <!-- 授权抽屉 -->
    <el-drawer v-model="drawerVisible" direction="rtl" title="角色授权" @close="handleClose">
      <el-tree
        ref="elTreeRef"
        :data="menus"
        show-checkbox
        node-key="id"
        default-expand-all
        :props="{ children: 'children', label: 'name' }"
        @check="handleCheckChange"
      />
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="drawerVisible = false">取消</el-button>
          <el-button type="primary" @click="handleMenuConfirm">确认</el-button>
        </span>
      </template>
    </el-drawer>
  </div>
</template>

<style lang="scss" scoped></style>
