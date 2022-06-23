<script setup lang="ts">
import { onMounted, ref } from "vue"
import AuForm from "@/base-ui/form"
import { modalConfig } from "./config/details.config"

const props = defineProps({
  form: {
    type: Object
  }
})
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
  { status: 2, content: "平台审批", timestamp: "2022-06-21 20:46", state: "同意", color: "#4285f4" },
  {
    status: 3,
    content: "平台审批",
    timestamp: "2022-06-21 20:46",
    state: "驳回",
    color: "#ff8282"
  },
  {
    status: 1,
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
  if (item.status == 1 && formData.value.status == 1) {
    newActivities.push(item)
  }
  if (item.status == 2 && formData.value.status == 2) {
    newActivities.push(item)
  }
  if (item.status == 3 && formData.value.status == 3) {
    newActivities.push(item)
  }
})
onMounted(() => {
  const stateEle = document.querySelectorAll(".state")
  for (let i = 0; i < stateEle.length; i++) {
    const e = stateEle[i] as HTMLElement
    e.style.backgroundColor = activities[i].color
  }
})

// 处理确认
const support = () => {
  console.log("确认")
}
// 处理拒绝
const reject = () => {
  console.log("拒绝")
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
            <div flex justify-end mr35 mt10>
              <el-button type="primary" @click="support" size="large" v-permission="['admin']">同意</el-button>
              <el-button type="danger" @click="reject" size="large" v-permission="['admin']">拒绝</el-button>
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
