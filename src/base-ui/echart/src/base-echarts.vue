<!--
 * @Author: Kenny
 * @Date: 2022-06-16 14:50:05
 * @LastEditors: Kenny
 * @LastEditTime: 2022-06-16 23:03:34
 * @FilePath: \yiya-straight-front-pc\src\base-ui\echart\src\base-echarts.vue
-->
<script lang="ts" setup>
import { ref, onMounted, defineProps, withDefaults } from "vue"
import useEchats from "../hooks/useEcharts"
import { EChartsOption } from "echarts"
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
  setOptions(props.options)
})
</script>
<template>
  <div class="base-echart">
    <div ref="echartsDivRef" :style="{ width: width, height: height }" />
  </div>
</template>
<style lang="scss" scoped></style>
