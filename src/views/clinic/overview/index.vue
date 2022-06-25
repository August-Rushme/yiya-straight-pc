<!--
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-06-23 18:55:52
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-06-25 14:00:51
 * @FilePath: \yiya-straight-pc\src\views\clinic\overview\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup lang="ts">
import AuForm from "@/base-ui/form"
import { onMounted, reactive } from "vue"

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
onMounted(() => {
  const TMap = (window as any).TMap
  const center = new TMap.LatLng(39.98412, 116.307484)
  //定义map变量，调用 TMap.Map() 构造函数创建地图
  new TMap.Map(document.getElementById("container"), {
    center: center, //设置地图中心点坐标
    zoom: 17.2, //设置地图缩放级别
    pitch: 43.5, //设置俯仰角
    rotation: 45 //设置地图旋转角度
  })
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
    <el-card mt5>
      <div>
        <div class="mapTitle">诊所位置</div>
        <div id="container" />
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
.mapTitle {
  padding-bottom: 20px;
  font-size: 24px;
  font-weight: 700;
  color: #1d222a;
}
:deep(.el-form-item) {
  display: flex;
  --font-size: 14px;
  margin-bottom: 5px;
}
</style>
