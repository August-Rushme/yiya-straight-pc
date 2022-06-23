// import { getPageList } from "@/api/user"
import {
  addPageData,
  deleteMany,
  deletePageData,
  editPageData,
  getAllRole,
  getMenuAll,
  getPageList,
  getUserRole,
  setRoleMenu,
  setUserRole
} from "@/api/system"
import store from "@/store"
import cache from "@/utils/cache"
import message from "@/utils/message"
import { getMenuByRole } from "@/views/system/role/api"
import { defineStore } from "pinia"

interface ISystemState {
  userList: any[]
  userCount: number
  roleList: any[]
  roleCount: number
  roles: number[]
  productList: any[]
  productCount: number
  pageNum: number
  pageSize: number
  menuList: any[]
  menuAll: any[]
  roleMenus: any[]
  clinicList: any[]
  clinicCount: number
  clinicApplyList: any[]
  clinicApplyCount: number
}
export const useSystemStore = defineStore({
  id: "system",
  state: (): ISystemState => {
    return {
      userList: [],
      userCount: 0,
      roleList: [],
      roleCount: 0,
      productList: [],
      productCount: 0,
      roles: [],
      pageNum: 1,
      pageSize: 6,
      menuList: [],
      menuAll: [],
      roleMenus: [],
      clinicList: [],
      clinicCount: 0,
      clinicApplyList: [],
      clinicApplyCount: 0
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
      // 合并参数
      payload.pageInfo = { ...payload.pageInfo, ...payload.queryInfo, clinicId, userId }
      let pageUrl = `/${pageName}/list`
      // 判断是请求链接
      if (pageName === "menu") {
        pageUrl = `/${pageName}/all`
      } else if (payload.queryInfo?.type === "search" || false) {
        pageUrl = `/${pageName}/advanceSelect`
      }
      if (pageName === "product") {
        pageUrl = `/${pageName}/getByClinic`
      }
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
    // 高级搜索
    async getPageListAdvancedSearchAction(payload: any) {
      const pageName: string = payload.pageName
      const pageUrl = `/${pageName}/advanceSelect`
      const { data: res }: any = await getPageList(pageUrl, payload.pageInfo)
      const list: any[] = res.list
      const total: number = res.total
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
        return message.error(res.msg ?? "删除失败")
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
    // 获取所有的菜单
    async getAllMenuAction() {
      const { data: res }: any = await getMenuAll("/menu/all")
      this.$patch({
        menuAll: res
      })
      console.log(res)
    },
    // 根据角色id获取菜单
    async getMenuByRoleIdAction(roleId: number) {
      const { data: res }: any = await getMenuByRole(roleId)
      this.$patch({
        roleMenus: res
      })
    },
    // 分配权限
    async setRoleMenuAction(payload: any) {
      const res: any = await setRoleMenu("/role/assignMenu", payload)
      if (res.code !== 200) {
        return message.error("分配权限失败")
      }
      message.success("分配权限成功")
      // 更新用户的角色
      this.getMenuByRoleIdAction(payload.roleId)
    },
    // 多选删除
    async deletePageDataMoreAction(payload: any) {
      console.log(payload.menuIds)

      // 获取pageName和id
      const { pageName } = payload
      const pageUrl = `/${pageName}/deleteMore`

      // 调用删除网络请求
      const res: any = await deleteMany(pageUrl, payload)
      if (res.code !== 200) {
        return message.error("删除失败")
      }
      if (res.msg == "请先删除子菜单") {
        return message.warning(res.msg)
      }
      message.success("删除成功")
      // 重新请求最新的数据
      this.getPageListAction({ pageName, pageInfo: { pageNum: this.pageNum, pageSize: this.pageSize } })
    }
  }
})
export function useSystemStoreHook() {
  return useSystemStore(store)
}
