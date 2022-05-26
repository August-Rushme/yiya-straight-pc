// import { getPageList } from "@/api/user"
import store from "@/store"
import { defineStore } from "pinia"

interface ISystemState {
  userList: any[]
  userCount: number
}
export const useSystemStore = defineStore({
  id: "system",
  state: (): ISystemState => {
    return {
      userList: [],
      userCount: 0
    }
  },
  getters: {
    pageListData(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}List`]
      }
    },
    pageListDataCount(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}Count`]
      }
    }
  },
  actions: {
    /** 获取用户列表 */
    // 获取表格数据
    async getPageListAction(payload: any) {
      // 1.获取pageUrl
      console.log(payload)

      // 2.对页面发送请求
      // const { data: pageResult } = await getPageList(payload)
      this.userCount = 6
      this.userList = [
        {
          username: "张三",
          realname: "张三三",
          cellphone: "13333333333",
          enable: true,
          created: "2022-05-18",
          updated: "2022-05-18",
          status: 1,
          edit: false
        },
        {
          username: "张二",
          realname: "张二二",
          cellphone: "13333333333",
          enable: true,
          created: "2022-05-18",
          updated: "2022-05-18",
          status: 1,
          edit: false
        },
        {
          username: "张四",
          realname: "张四四",
          cellphone: "13333333333",
          enable: true,
          created: "2022-05-18",
          updated: "2022-05-18",
          status: 1,
          edit: false
        },
        {
          username: "张五",
          realname: "张五五",
          cellphone: "13333333333",
          enable: true,
          created: "2022-05-18",
          updated: "2022-05-18",
          status: 1,
          edit: false
        },
        {
          username: "张六",
          realname: "张六六",
          cellphone: "13333333333",
          enable: true,
          created: "2022-05-18",
          updated: "2022-05-18",
          status: 1,
          edit: false
        },
        {
          username: "张七",
          realname: "张七七",
          cellphone: "13333333333",
          enable: true,
          created: "2022-05-18",
          updated: "2022-05-18",
          status: 1,
          edit: false
        }
      ]
    }
  }
})
export function useUserStoreHook() {
  return useSystemStore(store)
}
