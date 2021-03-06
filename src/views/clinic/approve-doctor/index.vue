<script lang="ts" setup>
import PageContent from "@/components/page-content"
import PageSearch from "@/components/page-search"
import PageModal from "@/components/page-modal"
import applyDetails from "@/components/applyDetails"

import { contentTableConfig } from "./config/content.config"
import { searchFormConfig } from "./config/search.config"
import { modalConfig } from "./config/modal.config"
import { detailsConfig } from "./config/details.config"

import { usePageSearch } from "@/hooks/use-page-search"
import { usePageModal } from "@/hooks/use-page-modal"
import { ref } from "vue"
import { useClinicStoreHook } from "@/store/modules/clinic"
import cache from "@/utils/cache"
// import { useSystemStore } from "@/store/modules/system"
// import { ref } from "vue"

// const store = useSystemStore()

const pageName = "qualification"
const store = useClinicStoreHook()
const flag = ref(false)
const userInfo = cache.getCache("userInfo")
const { pageContentRef, handleResetClick, handleQueryClick } = usePageSearch()
// 调用hook获取公共变量和函数
const { pageModalRef, defaultInfo, handleNewData, handleEditData, handleDeleteData, handleSaveData, modalTitle } =
  usePageModal()
const formData = ref<any>({})
// 获得医生技能列表
store.getSkillsAction()
// 处理查看审批
const handleView = (row: any) => {
  const skills: string[] = []
  store.skills.forEach((item: any) => {
    for (let i = 0; i < row.skills.length; i++) {
      if (item.id == row.skills[i]) {
        skills.push(item.label)
      }
    }
  })

  row.skills = skills.join(",")
  formData.value = row
  flag.value = true
  console.log("查看审批")
}

// 返回
const handleBack = () => {
  flag.value = false
}
// 搜索需要的其它参数
const searchOtherInfo = {
  buk: userInfo.buk,
  clinicId: userInfo.clinicId,
  useAdvanceSelect: true,
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
    <div v-if="!flag">
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
          @editBtnClick="handleEditData"
          @saveBtnClick="handleSaveData($event, pageName)"
          @deleteBtnClick="handleDeleteData($event, pageName)"
          ref="pageContentRef"
        >
          <template #btns="scope">
            <el-button type="primary" @click="handleView(scope.row)">查看</el-button>
          </template>
          <template #status="scope">
            <el-tag v-if="scope.row.status == 0" size="small"> 待审批 </el-tag>
            <el-tag type="success" v-if="scope.row.status == 1" size="small"> 已同意 </el-tag>
            <el-tag type="danger" v-if="scope.row.status == 2" size="small"> 已拒绝 </el-tag>
            <el-tag type="warning" v-if="scope.row.status == 3" size="small"> 已挂起 </el-tag>
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
      <applyDetails @handleBack="handleBack" :form="formData" :contentDetailsConfig="detailsConfig" />
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
