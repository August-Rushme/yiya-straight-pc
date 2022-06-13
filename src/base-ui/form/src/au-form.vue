<template>
  <div class="au-form">
    <div class="header">
      <slot name="header" />
    </div>
    <el-form :label-width="labelWidth" :label-position="labelPosition" :model="formData" ref="formRef">
      <el-row>
        <template v-for="item in formItems" :key="item.label">
          <el-col v-bind="colLayout">
            <el-form-item
              v-if="!item.isHidden"
              :label="item.label"
              :prop="item.field"
              :rules="item.rules"
              :style="itemStyle"
            >
              <template v-if="item.type === 'input' || item.type === 'password'">
                <el-input
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  :show-password="item.type === 'password'"
                  v-model="formData[`${item.field}`]"
                />
              </template>
              <template v-else-if="item.type === 'select'">
                <el-select
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  style="width: 100%"
                  v-model="formData[`${item.field}`]"
                >
                  <el-option v-for="option in item.options" :key="option.value" :value="option.value">{{
                    option.title
                  }}</el-option>
                </el-select>
              </template>
              <template v-else-if="item.type === 'datepicker'">
                <el-date-picker style="width: 100%" v-bind="item.otherOptions" v-model="formData[`${item.field}`]" />
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType, ref, watch } from "vue"
import type { FormInstance } from "element-plus"
import { IFormItem } from "../types"

const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  },
  formItems: {
    type: Array as PropType<IFormItem[]>,
    default: () => []
  },
  rules: {
    type: Object,
    default: () => ({})
  },
  labelWidth: {
    type: String,
    default: "100px"
  },
  itemStyle: {
    type: Object,
    default: () => ({ padding: "10px 40px" })
  },
  colLayout: {
    type: Object,
    default: () => ({
      xl: 6, // >1920px 4个
      lg: 8,
      md: 12,
      sm: 24,
      xs: 24
    })
  },
  inline: {
    type: Boolean,
    default: false
  },
  labelPosition: {
    type: String,
    default: "top"
  }
})
const emit = defineEmits(["update:modelValue"])

const formRef = ref<FormInstance>()
const formData = ref({ ...props.modelValue })
const aaa = 111
watch(
  formData,
  (newValue) => {
    emit("update:modelValue", newValue)
  },
  {
    deep: true
  }
)

/**
 *处理值变化
 * @param {any} value 改变的值
 * @param {string} field 绑定的字段
 */
// const handleValueChange = (value: any, field: string) => {
//   emit("update:modelValue", { ...props.modelValue, [field]: value })
// }
defineExpose({
  formData,
  formRef,
  aaa
})
</script>

<style scoped lang="scss">
.au-form {
  padding-top: 22px;
}
</style>
