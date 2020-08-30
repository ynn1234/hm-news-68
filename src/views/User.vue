<template>
  <div class="user">
      <div class="header" @click="$router.push('/useredit')">
          <div class="avatar">
              <img :src="baseURL+user.head_img" alt="">
          </div>
          <div class="info">
              <span v-if="user.gender === 1" class="iconfont iconxingbienan"></span>
              <span v-else class="iconfont iconxingbienv"></span>
              <span class="nickname">{{user.nickname}}</span>
              <div class="time">{{user.create_date | time}}</div>
          </div>
          <div class="arrow">
              <span class="iconfont iconjiantou1"></span>
          </div>
      </div>
      <nav-bar to="/follow">
          <template>我的关注</template>
          <template #detail>关注的用户</template>
      </nav-bar>
       <nav-bar>
          <template>我的跟帖</template>
          <template #detail>跟帖/回复</template>
      </nav-bar>
       <nav-bar>
          <template>我的收藏</template>
          <template #detail>文章/视频</template>
      </nav-bar>
      <nav-bar>设置</nav-bar>
      <div class="exit">
      <van-button type="info" block @click="exit">退出</van-button>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      user: ''
    }
  },
  computed: {
    baseURL () {
      return this.$axios.defaults.baseURL
    }
  },
  async created () {
    // const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')
    const res = await this.$axios.get(`/user/${userId}`)
    const { statusCode, data } = res.data
    if (statusCode === 200) {
      this.user = data
    }
  },
  methods: {
    async exit () {
      // await this.$dialog.confirm({
      //   title: '温馨提示',
      //   message: '确认退出吗?'
      // })
      //   .then(() => {
      //     // on confirm
      //     localStorage.removeItem('token')
      //     localStorage.removeItem('userId')
      //     this.$toast.success('退出成功')
      //     this.$router.push('/login')
      //   })
      //   .catch(() => {
      //     // on cancel
      //     this.$toast('取消退出')
      //   })
      // try catch 执行的时候走try  报错的时候执行 catch
      try {
        await this.$dialog.confirm({
          title: '温馨提示',
          message: '确认退出吗?'
        })
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
        this.$toast.success('退出成功')
        this.$router.push('/login')
      } catch {
        // this.$toast('取消退出')
      }
    }
  }

}
</script>

<style lang="less" scoped>
.header{
    display: flex;
    align-items: center;
    padding: 20px 10px;
    border-bottom: 3px solid #ccc;
    .avatar{
    width: 70px;
    height: 70px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 20px;
    img{
        width: 100%;
        height: 100%;
    }
}
.info{
    flex: 1;
    .iconfont{
        color:skyblue;
        margin-right: 10px;
    }
    .iconxingbienv{
        color:pink;
        margin-right: 10px;

    }
    .nickname{
        font-size: 14px;
    }
    .time{
        color:#666;
        font-size: 12px;
    }
}
.arrow span{
    color:#666;
}
}
.exit {
  padding: 20px;
}
</style>
