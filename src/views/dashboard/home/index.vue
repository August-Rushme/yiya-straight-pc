<!--
 * @Author: Kenny
 * @Date: 2022-06-13 14:52:53
 * @LastEditors: Kenny
 * @LastEditTime: 2022-06-16 15:49:19
 * @FilePath: \yiya-straight-front-pc\src\views\dashboard\home\index.vue
-->
<script lang="ts" setup>
import { baseEcharts } from "@/components/page-echarts/index"
</script>

<template>
  <div app-container>
    <el-row :gutter="10" class="content-row">
      <el-col :span="6">
        <el-card>1</el-card>
      </el-col>
      <el-col :span="6">
        <el-card> 2</el-card>
      </el-col>
      <el-col :span="6">
        <el-card> 3</el-card>
      </el-col>
      <el-col :span="6">
        <el-card>4 </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="content-row">
      <el-col :span="12">
        <el-card>
          <baseEcharts />
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card> 2</el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
.content-row {
  margin-bottom: 20px;
}
</style>
