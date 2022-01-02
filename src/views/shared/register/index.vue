<template>
  <div class="login-box">
    <a-form ref="formRef" layout="horizontal" :model="formInline">
      <a-form-item
        name="userName"
        :rules="{
          required: true,
          message: '请输入账号',
          trigger: 'blur'
        }"
      >
        <a-input v-model:value="formInline.userName" size="large" placeholder="请输入账号">
          <template #prefix><user-outlined type="user" /></template>
        </a-input>
      </a-form-item>
      <a-form-item
        name="password"
        :rules="{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }"
      >
        <a-input
          v-model:value="formInline.password"
          size="large"
          type="password"
          placeholder="请输入密码"
          autocomplete="new-password"
        >
          <template #prefix><lock-outlined type="user" /></template>
        </a-input>
      </a-form-item>
      <a-form-item
        name="phonenumber"
        :rules="{
          required: true,
          message: '请输入手机号',
          trigger: 'blur'
        }"
      >
        <a-input
          v-model:value="formInline.phonenumber"
          size="large"
          placeholder="请输入手机号"
          @input="getVal"
        >
          <template #prefix><PhoneOutlined type="PhoneOutlined" /></template>
        </a-input>
      </a-form-item>
      <a-form-item
        name="code"
        :rules="{
          required: true,
          message: '请输入验证码',
          trigger: 'change'
        }"
      >
        <a-input v-model:value="formInline.code" placeholder="请输入验证码" style="width: 280px">
          <template #prefix><barcode-outlined type="user" /></template
        ></a-input>
        <a-button
          style="width: 100px; height: 32px; margin-left: 20px"
          :disabled="btnDisabled"
          @click="getCode"
          >{{ btnTitle }}</a-button
        >
      </a-form-item>
      <a-form-item>
        <a-button
          type="primary"
          html-type="submit"
          size="large"
          :loading="loading"
          block
          @click="handleSubmit"
        >
          注册
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref } from 'vue'
import { message } from 'ant-design-vue'
import { UserOutlined, LockOutlined, BarcodeOutlined, PhoneOutlined } from '@ant-design/icons-vue'
import { useRouter, useRoute } from 'vue-router'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { getRegister, postUserRegister } from '@/api/system/user'
import { Storage } from '@/utils/Storage'

import { SvgIcon } from '@/components/svg-icon'

export default defineComponent({
  name: 'Login',
  components: { UserOutlined, LockOutlined, BarcodeOutlined, PhoneOutlined, SvgIcon },
  setup() {
    const formRef = ref<any>(null)

    const state = reactive({
      loading: false,
      formInline: {
        userName: '',
        password: '',
        phonenumber: '',
        code: ''
      }
    })

    let uuid

    const router = useRouter()
    const route = useRoute()

    const btnDisabled = ref(true)
    const btnTitle = ref('获取验证码')

    const getCode = () => {
      const { phonenumber } = state.formInline
      getRegister(phonenumber).then((res) => {
        if (res.code == 200) {
          uuid = res.uuid
          validateBtn()
        } else {
          // message.error(res.msg)
        }
      })
    }

    const validateBtn = () => {
      let time = 60
      let timer = setInterval(() => {
        if (time == 0) {
          clearInterval(timer)
          btnDisabled.value = false
          btnTitle.value = '获取验证码'
        } else {
          btnTitle.value = time + '秒后重试'
          btnDisabled.value = true
          time--
        }
      }, 1000)
    }

    const getVal = () => {
      const { phonenumber } = state.formInline
      if (phonenumber.length >= 11) {
        btnDisabled.value = false
      } else {
        btnDisabled.value = true
      }
    }

    const handleSubmit = async () => {
      formRef
      formRef.value.validate().then(async () => {
        const { userName, password, code, phonenumber } = state.formInline
        message.loading('注册中...', 0)
        state.loading = true
        const params = {
          userName,
          password,
          code,
          phonenumber,
          uuid
        }
        const res = await postUserRegister(params)
        message.destroy()
        state.loading = false
        if (res.code == 200) {
          message.success('注册成功！')
          Storage.clear()
          router.replace({
            name: 'home',
            query: {
              redirect: '/home'
            }
          })
        } else {
          message.info(res.msg || '注册失败')
        }
      })
    }
    return {
      ...toRefs(state),
      handleSubmit,
      getVal,
      getCode,
      btnTitle,
      btnDisabled,
      formRef
    }
  }
})
</script>

<style lang="scss" scoped>
.login-box {
  display: flex;
  width: 100vw;
  height: 100vh;
  padding-top: 240px;
  background: url('~@/assets/login.svg');
  background-size: 100%;
  flex-direction: column;
  align-items: center;

  .login-logo {
    display: flex;
    margin-bottom: 30px;
    align-items: center;

    .svg-icon {
      font-size: 48px;
    }

    img {
      height: 48px;
    }

    h1 {
      margin-bottom: 0;
      margin-left: 10px;
    }
  }

  :deep(.ant-form) {
    width: 400px;

    .ant-col {
      width: 100%;
    }

    .ant-form-item-label {
      padding-right: 6px;
    }
  }
}
</style>
