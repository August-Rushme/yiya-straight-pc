<script lang="ts" setup>
import { useAppStore } from "@/store/modules/app"
import zhCn from "element-plus/lib/locale/lang/zh-cn"
// import layout from "@/layout/index.vue"
// import Layout from "@/layout/index.vue"

useAppStore().initTheme() // 初始化 theme
const locale = zhCn // element-plus 设置为中文
</script>

<template id="app">
  <ElConfigProvider :locale="locale">
    <!-- <div id="app1" /> -->
    <router-view />
  </ElConfigProvider>
</template>
