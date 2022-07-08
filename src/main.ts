import { createApp, Directive } from "vue"
import router from "./router"
import "@/router/permission"
import store from "./store"
import App from "./App.vue"
import ElementPlus from "element-plus"
import loadSvg, { iconRegister } from "@/icons"
import * as directives from "@/directives"
import { initGlobalState, MicroAppStateActions } from "qiankun"

import "uno.css"
import "normalize.css"
import "element-plus/dist/index.css"
import "element-plus/theme-chalk/dark/css-vars.css"
import "@/styles/index.scss"
const app = createApp(App)

/** element-plus 组件完整引入 */
app.use(ElementPlus)
/** 加载全局 svg */
loadSvg(app)
/**注册icon */
app.use(iconRegister)

/** 自定义指令 */
Object.keys(directives).forEach((key) => {
  app.directive(key, (directives as { [key: string]: Directive })[key])
})

// 微应用的信息
/**
 * qiankun 通信实例
 */
const initialState = {}
export const actions: MicroAppStateActions = initGlobalState(initialState)

// qiankun 通信
actions.onGlobalStateChange((state, prevState) => {
  // state: 变更后的状态; prevState: 变更前的状态
  console.log(state, prevState)
})

app.use(store).use(router).mount("#app")
