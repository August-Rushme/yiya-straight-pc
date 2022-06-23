/*
 * @Author: Kenny
 * @Date: 2022-06-16 16:41:31
 * @LastEditors: Kenny
 * @LastEditTime: 2022-06-18 19:31:59
 * @FilePath: \yiya-straight-pc\src\base-ui\echart\hooks\useEcharts.ts
 */
import * as echarts from "echarts"
import { useEchartsStoreHook } from "@/store/modules/echats"
export default function (el: HTMLElement, mark: string) {
  const echartinstance = echarts.init(el)
  useEchartsStoreHook().echartsArray.push({
    mark: mark,
    echartinstance: echartinstance
  })
  const setOptions = (options: echarts.EChartsOption) => {
    echartinstance.setOption(options)
  }
  const echartsResisze = () => {
    echartinstance.resize()
  }
  window.addEventListener("resize", () => {
    echartinstance.resize()
  })
  return {
    echartinstance,
    setOptions,
    echartsResisze
  }
}
