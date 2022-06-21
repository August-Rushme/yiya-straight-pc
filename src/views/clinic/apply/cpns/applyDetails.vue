<script setup lang="ts">
import processState from "./processState.vue"
import reimbursementTable from "./reimbursementTable.vue"

const emit = defineEmits(["handleBack"])
// 返回申请页面
const handleGoBack = () => {
  emit("handleBack")
  console.log("handleGoBack")
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
