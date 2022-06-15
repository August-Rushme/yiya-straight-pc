<script lang="ts" setup>
import { reactive, ref } from "vue"
import { useRouter } from "vue-router"
import { useUserStore } from "@/store/modules/user"
// import { User, Lock, Key } from "@element-plus/icons-vue"
import ThemeSwitch from "@/components/ThemeSwitch/index.vue"
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
            useUserStore().getUserMenusAction()
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

/** 初始化验证码 */
// state.createCode()
</script>

<template>
  <!-- 手机端登录 -->
  <div class="login-container">
    <ThemeSwitch class="theme-switch" />

    <div class="login-card">
      <div class="title">
        <svg
          class="titleIcon"
          width="340"
          height="90"
          viewBox="0 0 424 90"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M14 0H394C410.569 0 424 13.4315 424 30V30C424 46.5685 410.569 60 394 60H14V0Z" fill="#0F6BF4" />
          <path d="M0 15C0 6.71573 6.71573 0 15 0V0V60H0V15Z" fill="#0F6BF4" />
          <rect y="59" width="15" height="15" fill="#0F6BF4" />
          <g filter="url(#filter0_b_0_1)">
            <path d="M0 75C0 66.7157 6.71573 60 15 60V60V90V90C6.71573 90 0 83.2843 0 75V75Z" fill="#478DF5" />
          </g>
          <defs>
            <filter
              id="filter0_b_0_1"
              x="-4"
              y="56"
              width="23"
              height="38"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feGaussianBlur in="BackgroundImage" stdDeviation="2" />
              <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_0_1" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_0_1" result="shape" />
            </filter>
          </defs>
        </svg>

        <h2>神州牙都会</h2>
      </div>
      <div class="content">
        <el-form ref="loginFormDom" :model="state.loginForm" :rules="state.loginRules" @keyup.enter="state.handleLogin">
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
          <div class="account-control">
            <el-checkbox v-model="state.isKeepPassword">记住密码</el-checkbox>
            <el-link type="primary" :underline="false">忘记密码</el-link>
          </div>
          <el-button
            class="loginBtn"
            :loading="state.loading"
            type="primary"
            size="large"
            @click.prevent="state.handleLogin"
          >
            登 录
          </el-button>
          <div class="bottom">Copyright 2022 神州牙都会 | 后台管理系统</div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  margin: 0 5px;
  .theme-switch {
    position: fixed;
    top: 5%;
    right: 5%;
    cursor: pointer;
  }
  .login-card {
    width: 360px;
    border-radius: 20px;
    box-shadow: 0 0 10px #dcdfe6;
    background-color: #fff;

    .title {
      height: 60px;
      position: relative;
      margin-top: 12px;
      .titleIcon {
        margin-left: -12px;
      }
      h2 {
        margin-top: -75px;
        margin-left: 110px;
        color: white;
        position: absolute;
      }
    }
    .account-control {
      margin-top: 30px;
      display: flex;
      justify-content: space-between;
    }
    .bottom {
      margin-top: 50px;
      text-align: center;
      color: gray;
      font-size: 12px;
    }
    .content {
      padding: 20px 50px 50px 50px;
      .username {
        margin-top: 40px;
      }
      .password {
        margin-top: 40px;
      }
      .show-code {
        position: absolute;
        right: 0px;
        top: 0px;
        cursor: pointer;
        user-select: none;
        img {
          width: 100px;
          height: 42px;
          border-radius: 4px;
        }
      }
      .el-button {
        width: 100%;
        margin-top: 40px;
      }
    }
  }
}
</style>
