<!--
 * @Author: Kenny
 * @Date: 2022-06-13 14:52:53
 * @LastEditors: Kenny
 * @LastEditTime: 2022-06-15 11:43:51
 * @FilePath: \yiya-straight-front-pc\src\views\login\index.vue
-->
<!-- 手机 -->
<script setup lang="ts">
import { mobieLogin, pcLogin } from "@/components/login/index"
import ThemeSwitch from "@/components/ThemeSwitch/index.vue"
import { onMounted, ref } from "vue"
const isMobie = ref(false)
onMounted(() => {
  const sUserAgent = navigator.userAgent.toLowerCase()
  if (/ipad|iphone|midp|rv:1.2.3.4|ucweb|SymbianOS|iPod|android|windows ce|windows mobile/.test(sUserAgent)) {
    //跳转移动端页面
    isMobie.value = true
    //this.mobileStatus = mobile(页面通过data的mobileStatus 值做不同样式)
  } else {
    isMobie.value = false
  }
})
</script>

<template>
  <div class="login">
    <ThemeSwitch class="theme-switch" />
    <template v-if="isMobie">
      <mobieLogin />
    </template>
    <template v-else>
      <pcLogin />
    </template>
  </div>
</template>
<style lang="scss" scoped>
.login {
  display: flex;
  position: relative;
  min-height: 100vh;
  align-items: center;
}
.theme-switch {
  position: absolute;
  top: 20px;
  right: 20px;
}
</style>
