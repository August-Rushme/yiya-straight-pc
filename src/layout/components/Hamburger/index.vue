<!--
 * @Author: Kenny
 * @Date: 2022-06-13 14:52:52
 * @LastEditors: Kenny
 * @LastEditTime: 2022-06-18 16:12:13
 * @FilePath: \yiya-straight-pc\src\layout\components\Hamburger\index.vue
-->
<script lang="ts" setup>
import { Expand, Fold } from "@element-plus/icons-vue"
import { useEchartsStoreHook } from "@/store/modules/echats"
defineProps({
  isActive: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(["toggle-click"])

const toggleClick = () => {
  useEchartsStoreHook().echartsArray.forEach((item) => {
    setTimeout(() => {
      item.echartinstance.resize()
    }, 300)
  })
  emit("toggle-click")
}
</script>

<template>
  <div @click="toggleClick">
    <el-icon :size="20" class="icon">
      <fold v-if="isActive" />
      <expand v-else />
    </el-icon>
  </div>
</template>

<style lang="scss" scoped>
.icon {
  vertical-align: middle;
}
</style>
