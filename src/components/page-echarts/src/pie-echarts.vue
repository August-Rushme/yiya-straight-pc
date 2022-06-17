<script lang="ts" setup>
import baseEcharts from "@/base-ui/echart"
import { computed, watch } from "vue"
import { useAppStore } from "@/store/modules/app"
import { useEchartsStoreHook } from "@/store/modules/echats"
import { storeToRefs } from "pinia"
const appStore = useAppStore()
const { activeThemeName } = storeToRefs(appStore)
const pointerData = 92 // 仪表指针数据
const option: any = computed(() => {
  const echartsOption = {
    title: {
      text: "商品好评率",
      x: "left",
      textStyle: {
        color: activeThemeName.value === "dark" ? "#fff" : "#333"
      }
    },
    series: [
      {
        type: "gauge",
        radius: 150,
        z: 1,
        startAngle: 225,
        endAngle: -45,
        splitNumber: 50,
        title: {
          color: "red"
        },
        splitLine: {
          show: true,
          length: 15,
          distance: -10,
          lineStyle: {
            color: "#fff",
            width: 1
          }
        },
        center: ["50%", "58%"],
        detail: {
          show: true,
          offsetCenter: [0, 60],
          fontSize: 22,
          formatter: (val: any) => [`{a|${val}}`, `{b|%}`].join(""),
          rich: {
            a: {
              fontSize: 20,
              color: "rgba(84, 108, 198, 0.65)"
            },
            b: {
              fontSize: 24,
              color: "rgba(84, 108, 198, 0.65)"
            }
          }
        },
        // 仪表盘的线，颜色值为一个数组
        axisLine: {
          show: true,
          // 两端是否设置为圆角；在5.0之后的版本有效
          roundCap: false,
          lineStyle: {
            width: 15,
            shadowColor: "#0093ee", //默认透明
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            shadowBlur: 20,
            opacity: 1,
            color: [
              [
                pointerData / 100,
                {
                  x: 0,
                  y: 0,
                  x1: 1,
                  y1: 0,
                  colorStops: [
                    {
                      offset: 0,
                      color: "rgba(0, 255, 255, 0.6)"
                    },
                    {
                      offset: 1,
                      color: "rgba(0, 0, 255, .6)"
                    }
                  ]
                }
              ],
              [1, "rgba(0,0,0,0.15)"]
            ]
          }
        },
        // 仪表盘刻度标签
        axisLabel: {
          show: true,
          color: "rgba(84, 108, 198, 0.65)",
          fontSize: 14,
          distance: 20,
          formatter: (val: any) => {
            const num = Math.floor(val)
            return num % 20 === 0 ? num : ""
          }
        },
        // 刻度
        axisTick: {
          show: false
        },
        // 指针，此设置仅对5.0以上的版本生效
        anchor: {
          show: true,
          icon: "circle",
          showAbove: true,
          size: 20,
          itemStyle: {
            borderWidth: 6,
            borderColor: "rgba(84, 108, 198, 0.85)"
          }
        },
        data: [pointerData]
      },
      {
        // 背景渐变色
        type: "pie",
        radius: "80%",
        center: ["50%", "58%"],
        // 不响应及触发鼠标事件
        silent: true,
        // 关闭背景动画
        animation: false,
        z: 0,
        itemStyle: {
          color: {
            type: "radial", // 径向渐变
            x: 0.5,
            y: 0.5,
            r: 0.25,
            colorStops: [
              {
                offset: 0,
                color: "rgba(84, 103, 198, 0.6)"
              },
              {
                offset: 0.1,
                color: "rgba(84, 103, 198, 0.35)"
              },
              {
                offset: 1,
                color: "rgba(84, 103, 198, 0)"
              }
            ]
          }
        },
        data: [pointerData]
      }
    ]
  }
  return echartsOption
})
watch(activeThemeName, () => {
  const index = useEchartsStoreHook().echartsArray.findIndex((item) => item.mark === "businessPie")
  console.log(useEchartsStoreHook().echartsArray[index].echartinstance)
  console.log(option.value)
  useEchartsStoreHook().echartsArray[index].echartinstance.setOption(option.value)
})
</script>

<template>
  <div class="pie-echarts">
    <baseEcharts :options="option" mark="businessPie" />
  </div>
</template>
