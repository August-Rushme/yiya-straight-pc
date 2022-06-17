<!--
 * @Author: Kenny
 * @Date: 2022-06-16 16:37:05
 * @LastEditors: Kenny
 * @LastEditTime: 2022-06-17 08:05:04
 * @FilePath: \yiya-straight-front-pc\src\components\page-echarts\src\bar-echarts.vue
-->
<script lang="ts" setup>
import baseEcharts from "@/base-ui/echart"
const option = {
  color: ["#2c68ff", "#08daaa", "#fcee51"],
  tooltip: {
    trigger: "axis",
    borderWidth: "0",
    backgroundColor: "rgba(73,81,92,.95)", //背景颜色
    textStyle: {
      color: "#fff" //字体颜色
    }
  },
  grid: {
    left: "2%",
    right: "4%",
    bottom: "1%",
    top: "24%",
    containLabel: true
  },
  legend: {
    data: ["销售额", "提现金额", "销售量"]
  },
  xAxis: [
    {
      type: "category",
      boundaryGap: true, //坐标轴两端不留空
      axisLine: {
        show: true, //隐藏X轴轴线
        lineStyle: {
          color: "#D9D9D9"
        }
      },
      axisLabel: {
        show: true,
        //formatter: '{value}月',
        textStyle: {
          padding: [2, 0, 0, 0],
          color: "#333"
        }
      },
      axisTick: {
        show: false //隐藏X轴刻度
      },
      axisPointer: {
        type: "shadow"
      },
      data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
    }
  ],
  yAxis: [
    {
      type: "value",
      name: "单位：元",
      min: 0,
      max: 250,
      interval: 50,
      axisLabel: {
        textStyle: {
          color: "#666"
        }
      },
      //name的样式设计
      nameTextStyle: {
        align: "left",
        padding: [0, 0, 0, -30]
      },
      splitLine: {
        lineStyle: {
          type: "solid", //设置网格线类型 dotted：虚线 solid:实线
          color: "#E9E9E9"
        }
      },
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      }
    },
    {
      type: "value",
      name: "销售量",
      min: 0,
      max: 25,
      interval: 5,
      axisLabel: {
        textStyle: {
          color: "#666"
        }
      },
      //name的样式设计
      splitLine: {
        lineStyle: {
          type: "solid", //设置网格线类型 dotted：虚线 solid:实线
          color: "#E9E9E9"
        }
      },
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      }
    }
  ],
  series: [
    {
      name: "销售额",
      type: "bar",
      stack: true, //堆叠柱状图
      barWidth: 14, //柱状图宽度
      itemStyle: {
        barBorderRadius: 0
      },
      data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
    },
    {
      name: "提现金额",
      type: "bar",
      stack: true, //堆叠柱状图
      barWidth: 14, //柱状图宽度
      itemStyle: {
        barBorderRadius: [14, 14, 0, 0]
      },
      data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
    },
    {
      name: "销售量",
      type: "line",
      yAxisIndex: 1,
      data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
    }
  ]
} as any
</script>

<template>
  <div class="bar-echarts">
    <baseEcharts :options="option" mark="businessBar" />
  </div>
</template>
