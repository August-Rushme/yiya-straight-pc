<!--
 * @Author: Kenny
 * @Date: 2022-06-17 14:54:20
 * @LastEditors: Kenny
 * @LastEditTime: 2022-06-22 15:16:09
 * @FilePath: \yiya-straight-pc\src\views\dashboard\workbench\index.vue
-->
<script lang="ts" setup>
import calendar from "./calendar/calendar.vue"
import dayjs from "dayjs"
const avatarSrc = JSON.parse(localStorage.getItem("userInfo") as string).photo
const isMobile = localStorage.getItem("isMobie") === "true"
const currentTime = dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss")
const titleCardArray = [
  {
    title: "新增患者",
    value: 45
  },
  {
    title: "新增预约",
    value: 134
  },
  {
    title: "预约已到店",
    value: 30
  },
  {
    title: "新增回访",
    value: 25
  }
]
</script>

<template>
  <div app-container>
    <el-row :span="24" mb3>
      <el-card style="width: 100%">
        <div :class="isMobile ? '' : 'flex-x-between'">
          <div :class="isMobile ? 'text-center' : 'flex-y-center'">
            <el-avatar shape="circle" :size="80" :src="avatarSrc" mr4 />
            <div>
              <div class="title" pt1>欢迎使用神州牙都会,祝您一天的工作顺利!</div>
              <div class="subTitle">当前时间: {{ currentTime }}</div>
            </div>
          </div>
          <div flex :class="[isMobile ? 'justify-center' : '']">
            <div class="option">
              <div class="subTitle">待审批</div>
              <div class="title" pt1>8</div>
            </div>
            <div class="option">
              <div class="subTitle">待审批</div>
              <div class="title" pt1>2/10</div>
            </div>
            <div class="option">
              <div class="subTitle">待审批</div>
              <div class="title" pt1>8</div>
            </div>
          </div>
        </div>
      </el-card>
    </el-row>
    <el-row :gutter="20">
      <template v-for="item in titleCardArray" :key="item.title">
        <el-col :sm="24" mb5 :lg="6">
          <el-card>
            <div class="card-title">
              <span>{{ item.title }}</span>
              <el-icon :size="20"><Warning /></el-icon>
            </div>
            <div class="card-value">
              {{ item.value }}
            </div>
            <div mt3>
              <span class="card-bottom">{{ item.title }}</span>
              <span class="card-bottom card-bottom-value">{{ item.value }}</span>
            </div>
          </el-card>
        </el-col>
      </template>
    </el-row>
    <template v-if="!isMobile">
      <el-row>
        <el-col :span="24">
          <el-card><calendar /> </el-card>
        </el-col>
      </el-row>
    </template>
  </div>
</template>
<style lang="scss" scoped>
.card-title {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: var(--el-text-color-secondary);
}
.card-value {
  font-weight: bold;
  padding: 8px 0;
  border-bottom: 1px solid var(--el-border-color);
  font-size: 38px;
}
.card-bottom {
  font-size: 13px;
  padding-right: 8px;
}
.option {
  width: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.title {
  font-size: 24px;
}
.subTitle {
  font-size: 14px;
  padding-top: 15px;
  color: #8c8c8c;
}
</style>
