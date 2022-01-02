<template>
  <div class="login-box">
    <a-form layout="horizontal" :model="formInline" @submit.prevent="handleSubmit">
      <a href="./" style="margin-bottom: 10px; display: block">回首页</a>
      <a-form-item>
        <a-input v-model:value="formInline.username" size="large" placeholder="请输入用户名">
          <template #prefix><user-outlined type="user" /></template>
        </a-input>
      </a-form-item>
      <a-form-item>
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
      <a-form-item>
        <a-input v-model:value="formInline.code" placeholder="请输入验证码" style="width: 280px">
          <template #prefix><barcode-outlined type="user" /></template
        ></a-input>
        <img
          :src="imgSrc"
          style="width: 100px; height: 32px; margin-left: 20px"
          @click="reloadCode"
        />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" size="large" :loading="loading" block>
          登录
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref } from 'vue'
import { message } from 'ant-design-vue'
import { UserOutlined, LockOutlined, BarcodeOutlined } from '@ant-design/icons-vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from '@/store'
import { delAdminAccount, getAdminAccount, postAdminAccount } from '@/api/system/account'

import { SvgIcon } from '@/components/svg-icon'

import { getCaptchaImage } from '@/api/system/user'

export default defineComponent({
  name: 'Login',
  components: { UserOutlined, LockOutlined, BarcodeOutlined, SvgIcon },
  setup() {
    const state = reactive({
      loading: false,
      formInline: {
        username: '',
        password: '',
        code: ''
      }
    })
    const imgSrc = ref('')
    let uuid

    getCaptchaImage().then((res) => {
      const { img } = res
      imgSrc.value = 'data:image/gif;base64,' + img
      uuid = res?.uuid
    })

    const store = useStore()
    const router = useRouter()
    const route = useRoute()

    const reloadCode = () => {
      getCaptchaImage().then((res) => {
        const { img } = res
        imgSrc.value = 'data:image/gif;base64,' + img
        uuid = res.uuid
      })
    }

    const handleSubmit = async () => {
      const { username, password, code } = state.formInline
      //admin admin@123456
      if (username.trim() == '' || password.trim() == '' || code.trim() == '') {
        return message.warning('用户名、密码或者验证码不能为空！')
      }
      message.loading('登录中...', 0)
      state.loading = true
      const params = {
        username,
        password,
        code,
        uuid
      }
      const { code: states, message: msg } = await store
        .dispatch('user/login', params)
        .finally(() => {
          state.loading = false
          message.destroy()
        })
      if (states == 200) {
        const toPath = decodeURIComponent((route.query?.redirect || '/') as string)
        message.success('登录成功！')
        router.replace(toPath).then((_) => {
          router.replace('/sentence-library')
        })
      } else {
        message.info(msg || '登录失败')
      }
    }
    return {
      ...toRefs(state),
      handleSubmit,
      imgSrc,
      reloadCode
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
