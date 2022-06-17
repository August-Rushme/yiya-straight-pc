/*
 * @Author: Kenny
 * @Date: 2022-06-16 16:41:31
 * @LastEditors: Kenny
 * @LastEditTime: 2022-06-16 23:05:00
 * @FilePath: \yiya-straight-front-pc\src\base-ui\echart\hooks\useEcharts.ts
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
  window.addEventListener("resize", () => {
    echartinstance.resize()
  })
  return {
    echartinstance,
    setOptions
  }
}
