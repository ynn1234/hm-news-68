<template>
  <div class="register">
    <Hmheader>注册</Hmheader>
      <logo></logo>
    <van-form @submit="register">
      <van-field
        v-model="username"
        label="账号"
        placeholder="请输入你的账号"
        :rules="[{ required: true, pattern:/^\d{5,11}$/ , message: '用户名长度为5-11位数字',trigger: 'onChange'  }]"
      />
      <van-field
        v-model="nickname"
        label="昵称"
        placeholder="请输入你的昵称"
        :rules="[{ required: true, pattern:/^[\u4e00-\u9fa5]{2,6}$/ , message: '昵称的长度为2-6个汉字',trigger: 'onChange'  }]"
      />
      <van-field
        v-model="password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        :rules="[{ required: true, pattern:/^\d{3,9}$/ ,message: '密码长度为3-9位数字',trigger: 'onChange' }]"
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
export default {
  data () {
    return {
      username: '',
      nickname: '',
      password: ''
    }
  },
  methods: {
    register () {
      console.log(11)
    }
  }

}
</script>

<style>

</style>
