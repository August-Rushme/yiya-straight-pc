<!--
 * @Author: Kenny
 * @Date: 2022-06-13 14:52:53
 * @LastEditors: Kenny
 * @LastEditTime: 2022-06-14 09:04:33
 * @FilePath: \yiya-straight-front-pc\src\components\login\src\login2.vue
-->
<script setup lang="ts">
import { onMounted } from "vue"
import lottie from "lottie-web"
import { reactive, ref } from "vue"
import { useRouter } from "vue-router"
import { useUserStore } from "@/store/modules/user"
// import { User, Lock, Key } from "@element-plus/icons-vue"
import message from "@/utils/message"
interface ILoginForm {
  /**公司代码 */
  buk: string
  /** 用户名 */
  username: string
  /** 密码 */
  password: string
  /** 验证码 */
  code: string
}

const router = useRouter()
const loginFormDom = ref<any>()

const state = reactive({
  /** 登录按钮 loading */
  loading: false,
  /** 验证码图片 URL */
  codeUrl: "",
  isKeepPassword: true,
  /** 登录表单 */
  loginForm: {
    buk: "mlqh",
    username: "a12345678",
    password: "a12345678",
    code: "abcd"
  } as ILoginForm,
  /** 登录表单校验规则 */
  loginRules: {
    buk: [{ required: true, message: "请输入公司代码", trigger: "blur" }],
    username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
    password: [
      { required: true, message: "请输入密码", trigger: "blur" },
      { min: 8, max: 16, message: "长度在 8 到 16 个字符", trigger: "blur" }
    ],
    code: [{ required: true, message: "请输入验证码", trigger: "blur" }]
  },
  /** 登录逻辑 */
  handleLogin: () => {
    loginFormDom.value.validate((valid: boolean) => {
      if (valid) {
        state.loading = true
        useUserStore()
          .login({
            buk: state.loginForm.buk,
            username: state.loginForm.username,
            password: state.loginForm.password
          })
          .then(() => {
            state.loading = false
            router.push("/").catch((err) => {
              console.warn(err)
            })
            message.success("登录成功")
          })
          .catch(() => {
            state.loading = false
            // state.createCode()
            state.loginForm.password = ""
          })
      } else {
        return false
      }
    })
  },
  /** 创建验证码 */
  createCode: () => {
    // 先清空验证码的输入
    state.loginForm.code = ""
    // 实际开发中，可替换成自己的地址，这里只是提供一个参考
    // state.codeUrl = `/api/v1/login/code?${Math.random() * 1000}`
  }
})
onMounted(() => {
  // loadAnimation 渲染动画
  lottie.loadAnimation({
    // 选取一个容器，用于渲染动画
    container: document.querySelector(".svgAni") as Element,
    // 定义JSON文件路径
    path: "https://assets6.lottiefiles.com/packages/lf20_geidtzh9.json",
    // 是否循环播放
    loop: true,
    // 渲染的格式svg/canvas/html，svg性能更优，兼容性更好
    renderer: "svg"
  })
})
</script>

<template>
  <div class="login-pc">
    <div class="login-panel">
      <div class="svgAni" />
      <div class="login-form">
        <div style="width: 100%">
          <div class="login-title">神州牙都会</div>
          <el-form
            ref="loginFormDom"
            :model="state.loginForm"
            :rules="state.loginRules"
            @keyup.enter="state.handleLogin"
          >
            <el-form-item prop="buk" label="代码:" class="buk">
              <el-input v-model="state.loginForm.buk" placeholder="公司代码" type="text" tabindex="1" size="large" />
            </el-form-item>
            <el-form-item prop="username" label="账号:" class="username">
              <el-input v-model="state.loginForm.username" placeholder="用户名" type="text" tabindex="1" size="large" />
            </el-form-item>
            <el-form-item prop="password" label="密码:" class="password">
              <el-input
                v-model="state.loginForm.password"
                placeholder="密码"
                type="password"
                tabindex="2"
                size="large"
                show-password
              />
            </el-form-item>
            <div class="bottomGroup">
              <div>
                <el-checkbox v-model="state.isKeepPassword">记住密码</el-checkbox>
              </div>
              <el-button :loading="state.loading" type="primary" w210px size="large" @click.prevent="state.handleLogin">
                登 录
              </el-button>
            </div>

            <div class="bottom">Copyright 2022 神州牙都会 | 后台管理系统</div>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.login-pc {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  background-color: #f5f7fe;
  .login-panel {
    display: flex;
    padding: 20px;
    padding-right: 60px;
    height: 400px;
    border-radius: 20px;
    background: white;
    box-shadow: 20px 20px 60px #bebebe, -20px -20px 60px #ffffff;
  }
  .login-form {
    width: 400px;
    display: flex;
    align-items: center;
    padding-left: 40px;

    .login-title {
      font-size: 30px;
      margin: 20px 0 30px 0;
      color: #06a3db;
    }
  }
  .bottomGroup {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
  }
  .bottom {
    margin-top: 30px;
    text-align: center;
    color: gray;
    font-size: 12px;
  }
}
</style>
