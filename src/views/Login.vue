<template>
  <div class="login">
      <Hmheader>登录</Hmheader>
      <logo></logo>
      <van-form @submit="submit">
        <van-field
          v-model="username"
          label="用户名"
          placeholder="请输入用户名"
          :rules="[{ required: true, pattern:/\d{5,11}/ , message: '用户名长度为5-11位数字',trigger: 'onChange'  }]"
        />
        <van-field
          v-model="password"
          type="password"
          label="密码"
          placeholder="请输入密码"
          :rules="[{ required: true, pattern:/\d{3,9}/ ,message: '密码长度为3-9位数字',trigger: 'onChange' }]"
        />
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit">
            登录
          </van-button>
        </div>
</van-form>
<div class="tip">没有账号?去
  <router-link to="/register">注册</router-link>
</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    submit () {
      console.log(111)
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
