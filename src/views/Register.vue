<template>
  <div class="register">
    <Hmheader>注册</Hmheader>
      <logo></logo>
    <van-form @submit="register">
      <van-field
        v-model="username"
        label="账号"
        placeholder="请输入你的账号"
        :rules="rules.username"
      />
      <van-field
        v-model="nickname"
        label="昵称"
        placeholder="请输入你的昵称"
        :rules="rules.nickname"
      />
      <van-field
        v-model="password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        :rules="rules.password"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">
          注册
        </van-button>
      </div>
    </van-form>
    <div class="tip">已有账号?去<router-link to="/login">登录</router-link>
</div>
  </div>
</template>

<script>
// import axios from 'axios'
export default {
  data () {
    return {
      username: '',
      nickname: '',
      password: '',
      rules: {
        username: [{ required: true, pattern: /^\d{5,11}$/, message: '用户名长度为5-11位数字', trigger: 'onChange' }],
        password: [{ required: true, pattern: /^\d{3,9}$/, message: '密码长度为3-9位数字', trigger: 'onChange' }],
        nickname: [{ required: true, pattern: /^[\u4e00-\u9fa5]{2,6}$/, message: '昵称的长度为2-6个汉字', trigger: 'onChange' }]
      }
    }
  },
  methods: {
    async register () {
      const res = await this.$axios.post('/register', {
        username: this.username,
        nickname: this.nickname,
        password: this.password
      })
      if (res.data.statusCode === 200) {
        this.$toast.success(res.data.message)
        this.$router.push('/index')
      } else {
        this.$toast.fail(res.data.message)
      }
    }
  }

}
</script>

<style>

</style>
