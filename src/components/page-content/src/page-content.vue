<script setup lang="ts">
import { computed, ref, watch } from "vue"
import { useSystemStore } from "@/store/modules/system"
import { AuTable } from "@/base-ui/table"
import { formatDateTime } from "@/utils/index"
import { PageInfo } from "../types/type"

const props = defineProps({
  contentTableConfig: {
    type: Object,
    require: true
  },
  pageName: {
    type: String,
    required: true
  }
})

const store = useSystemStore()
// 注册事件
const emit = defineEmits(["editBtnClick", "deleteBtnClick", "checkBtnClick", "newBtnClick", "saveBtnClick"])

const pageInfo = ref<PageInfo>({
  pageNum: 1,
  pageSize: 6
})

// const pageName = ref(props.pageName)

const pageName = ref(props.pageName)
watch(
  pageInfo,
  () => {
    getPageData(pageInfo.value, pageName.value)
    store.pageNum = pageInfo.value.pageNum
    store.pageSize = pageInfo.value.pageSize
  },
  {
    deep: true
  }
)
// 2.发送网络请求
const getPageData = (queryInfo: any, pageName?: string) => {
  store.getPageListAction({ queryInfo, pageName })
}
getPageData(pageInfo.value, pageName.value)
// footer
const totalCount = computed(() => store.pageListDataCount(props.pageName))

// 3.从vuex中获取数据
const dataList = computed(() => store.pageListData(props.pageName))

// 获取其它动态插槽名
const otherPropSlots: any = props.contentTableConfig?.propList.filter((item: any) => {
  if (item.slotName === "handler") return false
  if (item.slotName === "created") return false
  if (item.slotName === "updated") return false
  return true
})

// 删除/新建/编辑/保存等操作
const handleEditClick = (item: any) => {
  emit("editBtnClick", item)
}
const handleSaveClick = (item: any) => {
  emit("saveBtnClick", item)
}
const handleDeleteClick = (item: any) => {
  emit("deleteBtnClick", item)
}
const handleNewClick = () => {
  emit("newBtnClick")
}

const handleCheckboxClick = (row: any) => {
  emit("checkBtnClick", row)
}
defineExpose({
  getPageData
})
</script>

<template>
  <div class="page-content">
    <AuTable
      :listData="dataList"
      v-bind="props.contentTableConfig"
      v-model:page="pageInfo"
      :totalCount="totalCount"
      @checkboxClick="handleCheckboxClick"
      @handleNewClick="handleNewClick"
    >
      <!-- header中的插槽 -->
      <template #headerHandler>
        <slot name="handlerHeader" />
      </template>
      <!-- body中的插槽 -->
      <template #type="scope">
        <el-tag v-if="scope.row.type == 1" type="success" effect="dark"> 一级 </el-tag>
        <el-tag v-if="scope.row.type == 2" type="warning" effect="dark"> 二级 </el-tag>
        <el-tag v-if="scope.row.type == 3" type="danger" effect="dark"> 三级 </el-tag>
      </template>

      <!-- 格式化时间 -->
      <template #created="scope">
        <span>
          {{ formatDateTime(scope.row.createAt ?? scope.row.applyDate) }}
        </span>
      </template>
      <template #updated="scope">
        <span>
          {{ formatDateTime(scope.row.updateAt) }}
        </span>
      </template>
      <!-- 操作按钮 -->
      <template #handler="scope">
        <slot name="btns" class="handler-btns" :row="scope.row">
          <el-button v-if="scope.row.edit" size="default" type="success" @click="handleSaveClick(scope.row)"
            ><el-icon><check /></el-icon>保存</el-button
          >

          <el-button v-else style="font-size: 10px" type="primary" size="default" @click="handleEditClick(scope.row)">
            <el-icon mr1><edit /></el-icon>
            编辑</el-button
          >
          <el-button style="font-size: 10px" size="default" type="danger" @click="handleDeleteClick(scope.row)">
            <el-icon mr1><delete /></el-icon>
            删除</el-button
          >
          <!-- 分配角色按钮 -->
          <slot name="role" :row="scope.row" />
          <slot :row="scope.row" />
        </slot>
      </template>
      <!-- 插入剩余的动态插槽 -->
      <template v-for="(item, index) in otherPropSlots" :key="index" #[item.slotName]="scope">
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row" />
        </template>
      </template>
    </AuTable>
  </div>
</template>
<style lang="scss" scoped>
.page-content {
  padding: 20px;
}
</style>
