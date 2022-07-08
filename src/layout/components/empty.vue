<script lang="ts" setup>
import start from "@/modules/index"
import { onMounted } from "vue"
// import { start } from "qiankun"

onMounted(() => {
  if (!window.qiankunStarted) {
    window.qiankunStarted = true
    console.log("qiankun starting ...")
    start()
  }
})
</script>

<template>
  <div id="app1" />
</template>

<style lang="scss" scoped></style>
