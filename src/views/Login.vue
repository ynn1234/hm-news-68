<template>
  <div class="login">
      <Hmheader>登录</Hmheader>
      <logo></logo>
      <van-form @submit="submit">
        <van-field
          v-model="username"
          label="用户名"
          placeholder="请输入用户名"
          :rules="rules.username"
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
            登录
          </van-button>
        </div>
</van-form>
<div class="tip">没有账号?去<router-link to="/register">注册</router-link>
</div>
  </div>
</template>

<script>
// import axios from 'axios'
export default {
  data () {
    return {
      username: '',
      password: '',
      rules: {
        username: [{ required: true, pattern: /^\d{5,11}$/, message: '用户名长度为5-11位数字', trigger: 'onChange' }],
        password: [{ required: true, pattern: /^\d{3,9}$/, message: '密码长度为3-9位数字', trigger: 'onChange' }]
      }
    }
  },
  methods: {
    async submit () {
      const res = await this.$axios.post('/login', {
        username: this.username,
        password: this.password
      })
      // 引入 Toast 组件后，会自动在 Vue 的 prototype 上挂载 $toast 方法，便于在组件内调用。
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

<style lang="less">
.tip{
  float: right;
  font-size: 18px;
  padding-right: 10px;
  padding-top: 20px;
  a{
    color:orangered
  }
}

</style>
