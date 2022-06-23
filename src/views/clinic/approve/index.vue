<script lang="ts" setup>
import PageContent from "@/components/page-content"
import PageSearch from "@/components/page-search"
import PageModal from "@/components/page-modal"
import AuForm from "@/base-ui/form"

import { contentTableConfig } from "./config/content.config"
import { searchFormConfig } from "./config/search.config"
import { modalConfig, modalDetailsConfig } from "./config/modal.config"

import { usePageSearch } from "@/hooks/use-page-search"
import { usePageModal } from "@/hooks/use-page-modal"
import { onMounted, ref } from "vue"

// import { useSystemStore } from "@/store/modules/system"
// import { ref } from "vue"

// const store = useSystemStore()

const pageName = "clinicApply"
const flag = ref(false)
const { pageContentRef, handleResetClick, handleQueryClick } = usePageSearch()
// 调用hook获取公共变量和函数
const { pageModalRef, defaultInfo, handleNewData, handleEditData, handleDeleteData, handleSaveData, modalTitle } =
  usePageModal()
const approveId = ref<string>("0")
// 处理查看审批
const handleView = async (row: any) => {
  flag.value = true
  approveId.value = row.userId

  formData.value = row

  console.log(formData.value)

  console.log("查看审批")
}

// 返回
const handleBack = () => {
  flag.value = false
}
// 侧边流程相关
const activities = [
  {
    content: "申请发起",
    timestamp: "2022-06-21 20:46",
    state: "成功",
    color: "#10ba9c"
  },
  {
    content: "平台审批",
    timestamp: "2022-06-21 20:46",
    state: "同意",
    color: "#4285f4"
  },
  {
    content: "平台审批",
    timestamp: "2022-06-21 20:46",
    state: "驳回",
    color: "#ff8282"
  },
  {
    content: "平台审批",
    timestamp: "2022-06-21 20:46",
    state: "处理中",
    color: "#f8ac7f"
  }
]
onMounted(() => {
  const stateEle = document.querySelectorAll(".state")
  for (let i = 0; i < stateEle.length; i++) {
    const e = stateEle[i] as HTMLElement
    e.style.backgroundColor = activities[i].color
  }
})
// 表格详细
const formData = ref<any>({})
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
            <el-button type="primary" @click="handleView(scope.row)">查看</el-button>
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
      <el-card>
        <template #header>
          <div class="card-header">
            <el-link class="button" type="primary" :underline="false" @click="handleBack"
              ><el-icon><ArrowLeftBold /></el-icon>返回</el-link
            >
            <span>申请信息</span>
            <div />
          </div>
        </template>
        <div class="reTodoContent">
          <div class="processState">
            <div class="processTitle">流程状态</div>
            <div class="processBlock">
              <el-timeline>
                <el-timeline-item
                  v-for="(activity, index) in activities"
                  :key="index"
                  :color="activity.color"
                  :timestamp="activity.timestamp"
                >
                  {{ activity.content }}
                  <span class="state">{{ activity.state }}</span>
                </el-timeline-item>
              </el-timeline>
            </div>
          </div>
          <div class="leaveTable">
            <div class="table">
              <au-form v-bind="modalDetailsConfig" v-model="formData" />
              <div flex justify-end>
                <el-button type="primary" size="large" v-permission="['admin']">同意</el-button>
                <el-button type="danger" size="large" v-permission="['admin']">拒绝</el-button>
              </div>
            </div>
          </div>
        </div>
      </el-card>
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
.card-header {
  display: flex;
  justify-content: space-between;

  align-items: center;
}
.processState {
  min-width: 16vw;
  position: relative;
  margin: 80px 20px;
  padding: 20px 50px;
  border-radius: 5%;
  text-align: left;
  background-color: var(--processStateBgColor);
  transition: all 1s ease;
  .processTitle {
    color: var(--textColor);
    margin-top: 10px;
    font-size: 18px;
  }
  .processBlock {
    --el-text-color-primary: var(--textColor);
    --el-text-color-secondary: var(--submenuTitleTextColor);
    margin-top: 30px;
    margin-left: -40px;
    span {
      margin-left: 5px;
      font-size: 12px;
      padding: 2px 5px;
    }
    p {
      color: var(--submenuTitleTextColor);
    }
  }
}
.reTodoContent {
  display: flex;
}
.table {
  margin: 0 60px;
  .tableTitle {
    width: 722px;
    text-align: center;
    color: var(--textColor);
    margin-bottom: 20px;
    transition: all 1s ease;
  }
}
</style>
