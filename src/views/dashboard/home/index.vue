<!--
 * @Author: Kenny
 * @Date: 2022-06-13 14:52:53
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-06-23 18:56:16
-->
<script lang="ts" setup>
import { barEcharts, pieEcharts, mapEcharts } from "@/components/page-echarts"
import { CountUp } from "countup.js"
import { onMounted, ref } from "vue"
const isMobie = localStorage.getItem("isMobie") === "true"
const options = {
  useEasing: true, // 过渡动画效果，默认ture
  useGrouping: true, // 千分位效果，例：1000->1,000。默认true
  separator: ",", // 使用千分位时分割符号
  decimal: "." // 小数位分割符号
}
const titleCardArray = [
  {
    title: "诊所总销量",
    value: 14567
  },
  {
    title: "诊所商品总库存",
    value: 134567
  },
  {
    title: "诊所昨日营收额",
    value: 654784
  },
  {
    title: "诊所总销售额",
    value: 4981234
  }
]
const broadcast = ref([
  {
    name: "清合口腔",
    province: "海南"
  },
  {
    name: "美兰口腔",
    province: "江西"
  },
  {
    name: "微笑口腔",
    province: "湖南"
  },
  {
    name: "益牙口腔",
    province: "湖北"
  },
  {
    name: "博雅口腔",
    province: "江西"
  },
  {
    name: "海豚口腔",
    province: "浙江"
  }
])
setInterval(() => {
  broadcast.value.push({
    name: "coderKenny",
    province: "海南"
  })
  broadcast.value.shift()
}, 10000)
onMounted(() => {
  const el = document.querySelectorAll(".card-value")

  el.forEach((item, index) => {
    const countUp = new CountUp(item as HTMLElement, titleCardArray[index].value, options)
    countUp.start()
  })
})
</script>

<template>
  <div app-container>
    <el-row :gutter="20">
      <template v-for="item in titleCardArray" :key="item.title">
        <el-col :sm="24" mb5 :lg="6">
          <el-card>
            <div class="card-title">
              <span>{{ item.title }}</span>
              <el-icon :size="20"><Warning /></el-icon>
            </div>
            <div class="card-value">
              {{ item.value }}
            </div>
            <div mt3>
              <span class="card-bottom">{{ item.title }}</span>
              <span class="card-bottom card-bottom-value">{{ item.value.toLocaleString() }}</span>
            </div>
          </el-card>
        </el-col>
      </template>
    </el-row>
    <el-row :gutter="20">
      <el-col :sm="24" :md="14" :lg="16">
        <el-card mb5>
          <barEcharts />
        </el-card>
      </el-col>
      <el-col :sm="24" :md="10" :lg="8">
        <el-card mb5>
          <div class="pieEcharts">
            <div class="title">诊所好评率</div>
            <pieEcharts />
          </div>
        </el-card>
      </el-col>
    </el-row>
    <template v-if="!isMobie">
      <el-row>
        <el-col :span="24">
          <el-card>
            <div class="mapEcharts">
              <div class="title">诊所店铺分布</div>
              <mapEcharts />
              <div class="broadcast">
                <template v-for="(item, index) in broadcast" :key="index">
                  <div class="broadcast-item">
                    <el-icon><Bell /></el-icon>
                    <div ml3>
                      <span color="#fec834" px1>{{ item.name }}</span> ({{ item.province }}) 申请入驻留诊所
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </template>
  </div>
</template>

<style lang="scss" scoped>
@font-face {
  font-family: electronicFont;
  src: url(./font/DS-DIGIT.TTF);
}
.card-title {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: var(--el-text-color-secondary);
}
.card-value {
  font-family: electronicFont;
  font-weight: bold;
  padding: 8px 0;
  border-bottom: 1px solid var(--el-border-color);
  font-size: 38px;
}
.card-bottom {
  font-size: 13px;
  padding-right: 8px;
}
.card-bottom-value {
  font-family: electronicFont;
  font-size: 16px;
}
.pieEcharts {
  position: relative;
  .title {
    position: absolute;
    font-weight: bold;
    font-size: 28px;
  }
}
.mapEcharts {
  position: relative;
  .title {
    position: absolute;
    left: 20px;
    font-weight: bold;
    font-size: 36px;
  }
  .broadcast {
    position: absolute;
    height: 220px;
    padding: 10px;
    border: 1px solid var(--el-card-border-color);
    right: 10px;
    top: 10px;
    overflow: hidden;
    .broadcast-item {
      display: flex;
      height: 40px;
      width: 370px;
      line-height: 40px;
      padding: 0px 10px;
      align-items: center;
      animation: toTop 1s ease infinite;
      div {
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    @keyframes toTop {
      to {
        transform: translateY(-100%);
      }
    }
  }
}
</style>
