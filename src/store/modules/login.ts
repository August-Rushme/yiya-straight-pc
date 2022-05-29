import store from "@/store"
import { defineStore } from "pinia"

interface ILoginState {
  token: string
  userInfo: any
}
export const useLoginStore = defineStore({
  id: "login",
  state: (): ILoginState => {
    return {
      token: "",
      userInfo: {}
    }
  },
  actions: {}
})

export function useLoginStoreHook() {
  return useLoginStore(store)
}
