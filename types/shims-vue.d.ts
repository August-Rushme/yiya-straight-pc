/*
 * @Author: Kenny
 * @Date: 2022-06-17 14:54:20
 * @LastEditors: Kenny
 * @LastEditTime: 2022-06-21 19:16:41
 * @FilePath: \yiya-straight-pc\types\shims-vue.d.ts
 */
declare module "*.vue" {
  import { DefineComponent } from "vue"
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module "*.gif" {
  export const gif: any
}

declare module "*.svg" {
  const content: any
  export default content
}
declare module "*.scss" {
  const scss: Record<string, string>
  export default scss
}
 declare module "*.json"
