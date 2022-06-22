<script setup lang="ts">
import { onMounted } from "vue"
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
</script>
<template>
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
</template>
<style lang="scss" scoped>
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
</style>
