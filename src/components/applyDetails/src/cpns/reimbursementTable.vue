<script setup lang="ts">
import { modalConfig } from "../config/details.config"
import AuForm from "@/base-ui/form"
import { reactive } from "vue"

const formData = reactive({
  name: "海南清合口腔",
  address: "南宝路24号双南小区",
  detailedAddress: "海南省海口市美兰区南宝路",
  tel: "18888888888",
  license: "https://preview.qiantucdn.com/ing/64/59/02/31858PICfATERV2vjbGdg_PIC2018.jpg!qt324_nowater_jpg",
  idCardFront: "https://preview.qiantucdn.com/ing/64/59/02/31858PICfATERV2vjbGdg_PIC2018.jpg!qt324_nowater_jpg",
  idCardBack: "https://preview.qiantucdn.com/ing/64/59/02/31858PICfATERV2vjbGdg_PIC2018.jpg!qt324_nowater_jpg"
})
</script>
<template>
  <div class="table">
    <au-form v-bind="modalConfig" v-model="formData" />
  </div>
</template>
<style lang="scss" scoped>
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
