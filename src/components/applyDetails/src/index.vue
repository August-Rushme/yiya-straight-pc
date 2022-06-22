<script setup lang="ts">
import processState from "./cpns/processState.vue"
import reimbursementTable from "./cpns/reimbursementTable.vue"
import trailGroup from "./cpns/trailGroup.vue"
const emit = defineEmits(["handleBack"])
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
          <el-button class="button" type="text" @click="handleGoBack"><i class="el-icon-arrow-left" />返回</el-button>
          <span>申请信息</span>
          <div />
        </div>
      </template>
      <div class="reTodoContent">
        <processState />
        <div class="leaveTable">
          <reimbursementTable />
          <trailGroup style="margin-left: 80px" />
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

.reTodoContent {
  display: flex;
}
</style>
