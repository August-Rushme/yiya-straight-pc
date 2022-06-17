// import { getPageList } from "@/api/user"
import {
  addPageData,
  deletePageData,
  editPageData,
  getAllRole,
  getMenuAll,
  getPageList,
  getUserRole,
  setUserRole
} from "@/api/system"
import store from "@/store"
import cache from "@/utils/cache"
import message from "@/utils/message"
import { defineStore } from "pinia"

interface ISystemState {
  userList: any[]
  userCount: number
  roleList: any[]
  roleCount: number
  roles: number[]
  pageNum: number
  pageSize: number
  menuList: any[]
  menuAll: any[]
}
export const useSystemStore = defineStore({
  id: "system",
  state: (): ISystemState => {
    return {
      userList: [],
      userCount: 0,
      roleList: [],
      roleCount: 0,
      roles: [],
      pageNum: 1,
      pageSize: 6,
      menuList: [],
      menuAll: []
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
    // 获取表格数据
    async getPageListAction(payload: any) {
      const clinicId = cache.getCache("userInfo").clinicId
      const userId = cache.getCache("userInfo").id
      // 获取pageUrl
      const pageName: string = payload.pageName
      payload.pageInfo = { ...payload.pageInfo, clinicId, userId }
      const pageUrl = `/${pageName}/list`
      // 对页面发送请求
      const { data: res }: any = await getPageList(pageUrl, payload.pageInfo)
      // 将数据存储到state中
      let list: any[] = res.list
      const total: number = res.total
      // 特殊处理
      if (pageName === "menu") {
        list = res
      }
      this.$patch({
        [`${pageName}List`]: list,
        [`${pageName}Count`]: total
      })
    },
    // 获取全部角色
    async getAllRoleAction(payload: any) {
      // const clinicId = cache.getCache("userInfo").clinicId
      const { data: res }: any = await getAllRole("/role/list", payload)
      this.$patch({
        roleList: res.list,
        roleCount: res.total
      })
      return res
    },

    // 获取用户的角色
    async getUserRoleAction(userId: number) {
      this.roles = []
      const { data: res }: any = await getUserRole(`/user/getUserRole/${userId}`)
      res.forEach((item: any) => {
        this.$patch({
          roles: [...this.roles, item.id]
        })
      })
    },
    // 分配角色
    async setUserRoleAction(payload: any) {
      const res: any = await setUserRole("/user/assignRole", payload)
      if (res.code !== 200) {
        return message.error("分配角色失败")
      }
      message.success("分配角色成功")
      // 更新用户的角色
      this.getUserRoleAction(payload.userId)
    },
    // 编辑操作
    async editPageDataAction(payload: any) {
      // 1.编辑数据的请求
      const { pageName, editData } = payload
      console.log(editData)
      const pageUrl = `/${pageName}/edit`
      const res: any = await editPageData(pageUrl, editData)
      if (res.code !== 200) {
        return message.error("保存失败")
      }
      message.success("保存成功")
      // 2.请求最新的数据
      this.getPageListAction({ pageName, pageInfo: { pageNum: this.pageNum, pageSize: this.pageSize } })
    },
    // 删除操作
    async deletePageDataAction(payload: any) {
      // 获取pageName和id
      const { pageName, id } = payload
      const pageUrl = `/${pageName}/${id}`

      // 调用删除网络请求
      const res: any = await deletePageData(pageUrl)
      if (res.code !== 200) {
        return message.error("删除失败")
      }
      message.success("删除成功")
      // 重新请求最新的数据
      this.getPageListAction({ pageName, pageInfo: { pageNum: this.pageNum, pageSize: this.pageSize } })
    },
    // 新增操作
    async addPageDataAction(payload: any) {
      const { pageName, addData } = payload
      const pageUrl = `/${pageName}/add`
      const res: any = await addPageData(pageUrl, addData)
      if (res.code !== 200) {
        return message.error("添加失败")
      }

      this.getPageListAction({ pageName, pageInfo: { pageNum: this.pageNum, pageSize: this.pageSize } })
      return res
    },
    // 获取所有的菜单非树
    async getAllMenuAction() {
      const { data: res }: any = await getMenuAll("/menu/all")
      this.$patch({
        menuAll: res
      })
      console.log(res)
    }
  }
})
export function useSystemStoreHook() {
  return useSystemStore(store)
}
