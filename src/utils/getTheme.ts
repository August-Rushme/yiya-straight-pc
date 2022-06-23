/*
 * @Author: Kenny
 * @Date: 2022-06-17 15:18:58
 * @LastEditors: Kenny
 * @LastEditTime: 2022-06-17 15:34:50
 * @FilePath: \yiya-straight-pc\src\utils\getTheme.ts
 */
import { useAppStore } from "@/store/modules/app"
import { storeToRefs } from "pinia"
const appStore = useAppStore()
export const { activeThemeName } = storeToRefs(appStore)
