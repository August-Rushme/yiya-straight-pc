<!--
 * @Author: Kenny
 * @Date: 2022-06-16 15:28:06
 * @LastEditors: Kenny
 * @LastEditTime: 2022-06-16 15:56:06
 * @FilePath: \yiya-straight-front-pc\src\base-ui\card\src\ke-card.vue
-->
<script lang="ts" setup>
import { defineProps } from "vue"
defineProps<{
  title: string
}>()
</script>
<template>
  <el-card class="box-card">
    <template #header v-if="!!title">
      <div class="card-header">
        <span>{{ title }}</span>
      </div>
    </template>
  </el-card>
</template>

<style>
.card-header {
  display: flex;
  align-items: center;
}
.box-card {
  width: 480px;
}
</style>
