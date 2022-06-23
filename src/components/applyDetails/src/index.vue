<script setup lang="ts">
import { watch, onMounted, reactive } from "vue"
import AuForm from "@/base-ui/form"
import { modalConfig } from "./config/details.config"
import { useClinicStoreHook } from "@/store/modules/clinic"

const props = defineProps({
  approveId: {
    type: String
  }
})
const emit = defineEmits(["handleBack"])
const store = useClinicStoreHook()
let formData = reactive({ clinicName: "12312" })
// 监听props.approveId变化
watch(
  () => props.approveId,
  async (newVal) => {
    // 更新表格数据
    // 更新进度条数据
    // 更新审批记录数据
    const res = await store.getApplyDetailsAction({ id: newVal })
    console.log(res)
    formData.clinicName = "2356"
    console.log(formData.clinicName)
    console.log(formData)

    console.log("approveId变化")
    // formData.value = res
  }
)

// formData.value = store.applyDetails

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
            <au-form v-bind="modalConfig" v-model="formData" />
            <div flex justify-end>
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
