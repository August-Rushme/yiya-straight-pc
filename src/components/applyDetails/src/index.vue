<script setup lang="ts">
import { onMounted, ref } from "vue"
import AuForm from "@/base-ui/form"
import { modalConfig } from "./config/details.config"
import message from "@/utils/message"
import { ElMessageBox } from "element-plus"
import { useClinicStoreHook } from "@/store/modules/clinic"

const props = defineProps({
  form: {
    type: Object
  }
})
const store = useClinicStoreHook()
const emit = defineEmits(["handleBack"])

const formData = ref({ ...props.form })

// 侧边流程相关
const activities = [
  {
    status: 0,
    content: "申请发起",
    timestamp: "2022-06-21 20:46",
    state: "成功",
    color: "#10ba9c"
  },
  { status: 1, content: "平台审批", timestamp: "2022-06-21 20:46", state: "同意", color: "#4285f4" },
  {
    status: 2,
    content: "平台审批",
    timestamp: "2022-06-21 20:46",
    state: "驳回",
    color: "#ff8282"
  },
  {
    status: 3,
    content: "平台审批",
    timestamp: "2022-06-21 20:46",
    state: "处理中",
    color: "#f8ac7f"
  }
]
let newActivities = [
  {
    status: 0,
    content: "申请发起",
    timestamp: "2022-06-21 20:46",
    state: "成功",
    color: "#10ba9c"
  }
]
activities.forEach((item: any) => {
  if (item.status == 3 && formData.value.status == 3) {
    //  处理中
    item.timestamp = formData.value.processDate
    newActivities.push(item)
  } else if (item.status == 1 && formData.value.status == 1) {
    // 同意申请
    item.timestamp = formData.value.approveDate
    newActivities.push(item)
  } else if (item.status == 2 && formData.value.status == 2) {
    // 驳回申请
    newActivities.push(item)
  } else if (item.status == 0) {
    // 发起申请
    newActivities[0].timestamp = formData.value.applyDate
  }
})
onMounted(() => {
  const stateEle = document.querySelectorAll(".state")
  for (let i = 0; i < stateEle.length; i++) {
    const e = stateEle[i] as HTMLElement
    e.style.backgroundColor = newActivities[i].color
  }
})
// 判断是否挂起
const isWatting = ref(false)
// 判断是否已经审批过
const isApproved = ref(false)
if (formData.value.status != 0 && formData.value.status != 3) {
  isApproved.value = true
  isWatting.value = true
} else {
  // 可以继续审批
  isApproved.value = false
}
// 处理确认
const support = () => {
  // 提示是否确认同意申请
  ElMessageBox.confirm("确认同意该诊所的入驻申请吗", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  })
    .then(() => {
      store.setApplyDetailsAction({
        id: formData.value.id,
        status: 1
      })
      isApproved.value = true
      isWatting.value = true
      handleGoBack()
    })
    .catch(() => {
      message.info("已取消删除")
    })
}
// 处理拒绝
const reject = () => {
  store.setApplyDetailsAction({
    id: formData.value.id,
    status: 2
  })
  isApproved.value = false
  isWatting.value = true
  handleGoBack()
}
// 挂起
const waitProcess = () => {
  store.setApplyDetailsAction({
    id: formData.value.id,
    status: 3
  })
  isWatting.value = true
  isApproved.value = false
  handleGoBack()
}
// 返回申请页面
const handleGoBack = () => {
  emit("handleBack")
}
</script>
<template>
  <div>
    <el-card>
      <template #header>
        <div class="card-header">
          <el-link class="button" type="primary" :underline="false" @click="handleGoBack"
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
                v-for="(activity, index) in newActivities"
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
            <au-form v-bind="modalConfig" v-model="formData" />
            <div flex justify-end mt10 style="margin-right: 20%">
              <el-button type="primary" @click="support" size="large" v-permission="['admin']" :disabled="isApproved"
                >同意</el-button
              >
              <el-button type="danger" @click="reject" size="large" v-permission="['admin']" :disabled="isApproved"
                >拒绝</el-button
              >
              <el-button type="warning" @click="waitProcess" size="large" v-permission="['admin']" :disabled="isWatting"
                >挂起</el-button
              >
            </div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.card-header {
  display: flex;
  justify-content: space-between;

  align-items: center;
}
.processState {
  min-width: 17vw;
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
