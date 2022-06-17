<!--
 * @Author: Kenny
 * @Date: 2022-06-13 14:52:53
 * @LastEditors: Kenny
 * @LastEditTime: 2022-06-16 21:18:50
 * @FilePath: \yiya-straight-front-pc\src\views\dashboard\home\index.vue
-->
<script lang="ts" setup>
import { barEcharts, pieEcharts } from "@/components/page-echarts"
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
      <el-col :sm="24" :md="14" :lg="16">
        <el-card mb5>
          <barEcharts />
        </el-card>
      </el-col>
      <el-col :sm="24" :md="10" :lg="8">
        <el-card> <pieEcharts /></el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
.content-row {
  margin-bottom: 20px;
}
</style>
