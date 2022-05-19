import { createApp, App } from "vue"
import SvgIcon from "@/components/SvgIcon/index.vue" // svg component
import "virtual:svg-icons-register"
import registerIcon from "./register-icons"

export default (app: ReturnType<typeof createApp>) => {
  app.component("SvgIcon", SvgIcon)
}

export function iconRegister(app: App) {
  app.use(registerIcon)
}
