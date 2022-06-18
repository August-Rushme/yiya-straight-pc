<!--
 * @Author: Kenny
 * @Date: 2022-06-16 14:50:05
 * @LastEditors: Kenny
 * @LastEditTime: 2022-06-18 16:13:35
 * @FilePath: \yiya-straight-pc\src\base-ui\echart\src\base-echarts.vue
-->
<script lang="ts" setup>
import { ref, onMounted, onUnmounted, watchEffect, defineProps, withDefaults } from "vue"
import useEchats from "../hooks/useEcharts"
import { EChartsOption } from "echarts"
import { useEchartsStoreHook } from "@/store/modules/echats"
const props = withDefaults(
  defineProps<{
    options: EChartsOption
    mark: string
    width?: string
    height?: string
  }>(),
  {
    width: "100%",
    height: "360px"
  }
)
const echartsDivRef = ref<HTMLElement>()
onMounted(() => {
  const { setOptions } = useEchats(echartsDivRef.value!, props.mark)
  watchEffect(() => {
    setOptions(props.options)
  })
})
onUnmounted(() => {
  useEchartsStoreHook().echartsArray = []
})
</script>
<template>
  <div class="base-echart">
    <div ref="echartsDivRef" :style="{ width: width, height: height }" />
  </div>
</template>
<style lang="scss" scoped></style>
