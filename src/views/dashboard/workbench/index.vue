<!--
 * @Author: Kenny
 * @Date: 2022-06-17 14:54:20
 * @LastEditors: Kenny
 * @LastEditTime: 2022-06-20 18:11:01
 * @FilePath: \yiya-straight-pc\src\views\dashboard\workbench\index.vue
-->
<script lang="ts" setup>
import calendar from "./calendar/calendar.vue"
</script>

<template>
  <div app-container>
    <el-row>
      <el-col :span="24">
        <el-card><calendar /> </el-card>
      </el-col>
    </el-row>
  </div>
</template>
