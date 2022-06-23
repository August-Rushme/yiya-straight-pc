<script setup lang="ts">
import AuForm from "@/base-ui/form"
import { reactive } from "vue"

import { modalConfig } from "./config/modal.config"

interface overview {
  name: string
  address: string
  detailedAddress: string
  tel: string
  code: string
  institutionCode: string
  workTime: string
  website: string
  img?: string
}
const formData = reactive<overview>({
  name: "海南清合口腔",
  address: "南宝路24号双南小区",
  detailedAddress: "海南省海口市美兰区南宝路",
  tel: "18888888888",
  code: "",
  institutionCode: "",
  workTime: "8:00-20:00",
  website: "",
  img: "https://img.zcool.cn/community/031633a58b9a1cda8010e60d0e7991a.jpg?x-oss-process=image/resize,m_fill,w_520,h_390,limit_0/auto-orient,1/sharpen,100/format,webp/quality,Q_100"
})
</script>
<template>
  <div app-container>
    <el-card>
      <div class="overview">
        <span class="title"> 海南清河口腔 </span>

        <au-form v-bind="modalConfig" v-model="formData" />
      </div>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.title {
  margin-left: 35px;
  font-size: 24px;
  font-weight: 600;
  color: #1d222a;
}
:deep(.el-form-item) {
  display: flex;
  --font-size: 14px;
  margin-bottom: 5px;
}
</style>
