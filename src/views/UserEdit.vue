<template>
  <div class="user-edit">
      <Hmheader>编辑资料</Hmheader>
      <div class="avart">
          <img :src="$axios.defaults.baseURL + user.head_img" alt="">
      </div>
      <nav-bar @click="showNickname">
          <template>昵称</template>
          <template #detail>{{user.nickname}}</template>
      </nav-bar>
      <nav-bar @click="showPassword">
          <template>密码</template>
          <template #detail>******</template>
      </nav-bar>
      <nav-bar @click="showGender">
          <template>性别</template>
          <template #detail>{{user.gender === 1 ? '男' : '女'}}</template>
      </nav-bar>
      <van-dialog v-model="show" title="修改昵称" show-cancel-button @confirm="updateNickname">
         <van-field v-model="nickname" placeholder="请输入用户名" />
      </van-dialog>
      <van-dialog v-model="passwordshow" title="修改密码" show-cancel-button @confirm="updatePassword">
         <van-field v-model="password" placeholder="请输入密码" />
      </van-dialog>
      <van-dialog v-model="gendershow" title="修改性别" show-cancel-button @confirm="updateGender">
      <van-radio-group v-model="gender">
        <van-cell-group>
            <van-cell title="男" clickable @click="radio = '1'">
            <template #right-icon>
                <van-radio :name="1" />
            </template>
            </van-cell>
            <van-cell title="女" clickable @click="radio = '0'">
            <template #right-icon>
                <van-radio :name="0" />
            </template>
            </van-cell>
        </van-cell-group>
      </van-radio-group>
      </van-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      user: '',
      show: false,
      passwordshow: false,
      gendershow: false,
      nickname: '',
      password: '',
      gender: 1
    }
  },
  created () {
    this.getUserInfo()
  },
  methods: {
    async getUserInfo () {
      const userId = localStorage.getItem('userId')
      const res = await this.$axios.get(`/user/${userId}`)
      if (res.data.statusCode === 200) {
        this.user = res.data.data
      }
    },
    async updateInfo (data) {
      const userId = localStorage.getItem('userId')
      const res = await this.$axios.post(`/user_update/${userId}`, data)
      if (res.data.statusCode === 200) {
        this.getUserInfo()
        this.$toast.success('修改成功')
      }
    },
    // async updateInfo () {},
    showNickname () {
      this.show = true
      this.nickname = this.user.nickname
    },
    showPassword () {
      this.passwordshow = true
      this.password = this.user.password
    },
    showGender () {
      this.gendershow = true
      this.gender = this.user.gender
    },
    async updateGender () {
    //   const userId = localStorage.getItem('userId')
    //   const res = await this.$axios.post(`/user_update/${userId}`, {
    //     gender: this.gender
    //   })
    //   if (res.data.statusCode === 200) {
    //     this.getUserInfo()
    //     this.$toast.success('修改成功')
    //   }
      this.updateInfo({
        gender: this.gender
      })
    },
    async updatePassword () {
    //   const userId = localStorage.getItem('userId')
    //   const res = await this.$axios.post(`/user_update/${userId}`, {
    //     password: this.password
    //   })
    //   if (res.data.statusCode === 200) {
    //     this.getUserInfo()
    //     this.$toast.success('修改成功')
    //   }
      this.updateInfo({
        password: this.password
      })
    },
    async updateNickname () {
    //   const userId = localStorage.getItem('userId')
    //   const res = await this.$axios.post(`/user_update/${userId}`, {
    //     nickname: this.nickname
    //   })
    //   if (res.data.statusCode === 200) {
    //     this.getUserInfo()
    //     this.$toast.success('修改成功')
    //   }
      this.updateInfo({
        nickname: this.nickname
      })
    }
  }
}

</script>

<style lang="less" scoped>
.avart{
    padding: 40px;
    text-align: center;
    img{
        width: 100px;
        height: 100px;
        border-radius: 50%;
    }
}
/deep/ .van-dialog__content{
    padding:10px 20px;
}
.van-field{
    border: 1px solid #ccc;
}

</style>
