<template>
  <div app-container>
    <div class="stepForm" v-if="!flag">
      <el-row>
        <el-col>
          <div class="grid-content bg-purple-dark">
            <el-card>
              <template #header>
                <div class="card-header">
                  <el-button class="button" type="text" @click="handleViewDetails"
                    ><i class="el-icon-arrow-left" />查看申请详情</el-button
                  >
                  <span>表单信息</span>
                  <div />
                </div>
              </template>
              <el-steps :active="active" finish-status="success" align-center>
                <el-step title="填写诊所信息" description="请仔细填写诊所信息" />
                <el-step title="上传关附件" description="请仔细核对相关附件" />
                <el-step title="完成" description="操作成功" />
              </el-steps>
              <template v-if="active == 0">
                <au-form v-bind="modalConfig" ref="pageFormRef" v-model="formData" />
                <el-button type="primary" @click="handleNextStep(pageFormRef?.formRef)">下一步</el-button>
                <el-button @click="resetForm(pageFormRef?.formRef)">重置</el-button>
              </template>
              <template v-else-if="active == 1">
                <au-form v-bind="modalFileConfig" ref="pageFormRef" v-model="formData" />

                <el-button type="warning" @click="submitForm(pageFormRef?.formRef)">提交</el-button>
                <el-button @click="handleLastStep()">上一步</el-button>

                <el-divider />
              </template>
              <template v-else-if="active == 3">
                <el-result icon="success" title="操作成功" sub-title="请等待平台审核">
                  <template #extra>
                    <el-button type="primary" size="medium" @click="handleRedo">查看申请</el-button>
                  </template>
                </el-result>
              </template>
            </el-card>
          </div>
        </el-col>
      </el-row>
    </div>
    <div v-if="flag">
      <apply-details @handleBack="handleBack" />
    </div>
  </div>
</template>
<script lang="ts">
import AuForm from "@/base-ui/form"
import { FormInstance } from "element-plus"
import { defineComponent, ref } from "vue"
import { modalConfig, modalFileConfig } from "./config/form.config"

import ApplyDetails from "./cpns/applyDetails.vue"
export default defineComponent({
  components: {
    AuForm,
    ApplyDetails
  },
  setup() {
    const flag = ref(false)
    const pageFormRef = ref<InstanceType<typeof AuForm>>()
    const active = ref(0)
    const formData = ref<any>({})
    // 下一步标记
    const selectedAccType = ref("1")

    // method
    const handleNextStep = async (formEl: FormInstance | undefined) => {
      if (!formEl) return
      await formEl.validate(async (valid, fields) => {
        if (valid) {
          active.value = 1
          // eslint-disable-next-line no-console
          console.log("handle ruleForm  data")
          return true
        } else {
          console.log("error submit!", fields)
        }
      })
    }
    const handleLastStep = () => {
      active.value = 0
      return true
    }
    // 提交表单
    const submitForm = async (formEl: FormInstance | undefined) => {
      if (!formEl) return
      await formEl.validate(async (valid, fields) => {
        if (valid) {
          active.value = 3

          return true
        } else {
          console.log("error submit!", fields)
        }
      })

      return true
    }
    const resetForm = (formEl: FormInstance | undefined) => {
      if (!formEl) return
      formEl.resetFields()
    }
    // 查看申请详情
    const handleViewDetails = () => {
      flag.value = true
    }
    // 查看申请
    const handleRedo = () => {
      flag.value = true
    }
    // 处理返回
    const handleBack = () => {
      flag.value = false
    }
    return {
      handleRedo,
      active,
      handleViewDetails,
      selectedAccType,
      modalConfig,
      modalFileConfig,
      submitForm,
      handleNextStep,
      handleLastStep,
      pageFormRef,
      resetForm,
      formData,
      flag,
      handleBack
    }
  }
})
</script>

<style lang="scss" scoped>
.stepForm {
  .demo-ruleForm {
    text-align: left;

    margin: 15px;
  }
  .confirmInfo {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .infoItem {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      width: 300px;

      .label {
        font-weight: 400;
        color: rgba(0, 0, 0, 0.85);
        font-size: 14px;
      }
    }
    .value {
      color: rgba(0, 0, 0, 0.85);
      font-size: 14px;
    }
  }

  .info {
    text-align: left;
    padding-left: 20px;
    margin-bottom: 20px;
    font-size: 12px;
  }
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .box-card {
    width: 100%;
  }
  .el-step__head {
    text-align: left;
  }
}
.el-input-group__prepend {
  width: 80px !important;
}
.el-input-group__append,
.el-input-group__prepend {
  background-color: white;
}
.el-select .el-input {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
</style>
