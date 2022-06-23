<script setup lang="ts">
import { PropType } from "vue"
export interface IPropItem {
  prop?: string | any
  label: string
  minWidth: string
  slotName?: string
}
const props = defineProps({
  title: {
    type: String,
    default: ""
  },
  propList: {
    type: Array as PropType<IPropItem[]>
  },
  listData: {
    type: Array,
    required: true
  },

  childrenProps: {
    type: Object,
    default: () => ({})
  },
  showSelectColumn: {
    type: Boolean,
    default: false
  },
  showIndexColumn: {
    type: Boolean,
    default: false
  },
  showFooter: {
    type: Boolean,
    default: true
  },
  totalCount: {
    type: Number,
    default: 0
  },
  page: {
    type: Object,
    default: () => ({
      query: "",
      pageNum: 1,
      pageSize: 6
    })
  },
  isBorder: {
    type: Boolean,
    default: true
  },
  headerAlign: {
    type: String,
    default: "center"
  },
  isHighlightCurrentRow: {
    type: Boolean,
    default: false
  }
})
// 获取屏幕宽度
const getScreenWidth = () => {
  return document.documentElement.clientWidth
}
const documentWidth = getScreenWidth()

const emit = defineEmits(["update:page", "checkboxClick", "cellClick", "dbClick"])
// 处理分页
const handleCurrentChange = (pageNum: number) => {
  emit("update:page", { ...props.page, pageNum })
}
const handleSizeChange = (pageSize: number) => {
  emit("update:page", { ...props.page, pageSize })
}

// 处理选中
const handleSelectionChange = (row: any) => {
  emit("checkboxClick", row)
}

const handleCellClick = (row: any) => {
  emit("cellClick", row)
}
const handleDbClick = (row: any) => {
  emit("dbClick", row)
}
</script>
<template>
  <div class="auTable">
    <div class="header">
      <slot name="header">
        <div class="title">{{ title }}</div>
        <div class="handler">
          <slot name="headerHandler" />
        </div>
      </slot>
    </div>
    <el-table
      :data="listData"
      :border="isBorder"
      style="width: 100%"
      v-bind="childrenProps"
      @selection-change="handleSelectionChange"
      @cell-click="handleCellClick"
      @cell-dblclick="handleDbClick"
      max-height="510"
    >
      <el-table-column v-if="showSelectColumn" type="selection" align="center" width="60" />
      <el-table-column v-if="showIndexColumn" type="index" label="序号" align="center" width="80" />

      <template v-for="(item, index) in propList" :key="index">
        <el-table-column v-bind="item" :align="headerAlign" :show-overflow-tooltip="true">
          <template #default="scope">
            <slot :name="item.slotName" :row="scope.row">
              <el-input
                v-if="scope.row.edit && item.slotName !== 'created' && item.slotName !== 'updated'"
                v-model="scope.row[item.prop]"
              />
              <span v-else> {{ scope.row[item.prop] }}</span>
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="footer" v-if="showFooter">
      <slot name="footer">
        <!-- 分页 -->

        <el-pagination
          v-if="documentWidth >= 500"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.pageNum"
          :page-size="page.pageSize"
          :total="totalCount"
          :page-sizes="[6, 8, 10, 12]"
          layout="total, sizes, prev, pager, next, jumper"
          small
        />
        <el-pagination
          v-else
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.pageNum"
          :page-size="page.pageSize"
          small
          :total="totalCount"
          layout="total ,prev, pager, next"
        />
      </slot>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.header {
  display: flex;
  height: 45px;
  padding: 0 5px;
  justify-content: space-between;
  align-items: center;

  .title {
    font-size: 20px;
    font-weight: 700;
    color: var(--elTableTextColor);
    transition: color 1s ease;
  }

  .handler {
    align-items: center;
  }
}
// 滚动条的宽度
::v-deep(.el-table__body-wrapper::-webkit-scrollbar) {
  width: 6px; // 横向滚动条
  height: 6px; // 纵向滚动条
}
// 滚动条的滑块
::v-deep(.el-table__body-wrapper::-webkit-scrollbar-thumb) {
  background-color: #ddd;
  border-radius: 3px;
}
.footer {
  margin-top: 15px;

  .el-pagination {
    text-align: center;
  }
}
</style>
