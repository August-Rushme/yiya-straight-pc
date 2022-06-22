<script setup lang="ts">
import message from "@/utils/message"

const reject = () => {
  message.success("拒绝成功")
}
const support = () => {
  message.success("审批成功")
}
</script>
<template>
  <div class="trailGoup">
    <div class="btnGroup">
      <el-button type="primary" @click="support" size="large" v-permission="['admin']">同意</el-button>
      <el-button type="danger" @click="reject" size="large" v-permission="['admin']">拒绝</el-button>
    </div>
    <!-- <el-input v-model="desc" :rows="3" type="textarea" placeholder="请输入拒绝原因" style="margin-top: 20px" /> -->
  </div>
</template>
<style lang="scss" scoped>
.btnGroup {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  margin-right: 170px;
  bottom: 10px;
  .el-button {
    margin-right: 10px;
  }
}
</style>
