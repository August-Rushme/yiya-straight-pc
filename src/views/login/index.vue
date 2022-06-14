<!--
 * @Author: Kenny
 * @Date: 2022-06-13 14:52:53
 * @LastEditors: Kenny
 * @LastEditTime: 2022-06-13 16:42:25
 * @FilePath: \yiya-straight-front-pc\src\views\login\index.vue
-->
<script setup lang="ts">
import { mobieLogin, pcLogin } from "@/components/login/index"
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
  min-height: 100vh;
  align-items: center;
}
</style>
