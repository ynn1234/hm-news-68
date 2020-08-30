<template>
  <div class="user">
      <div class="header">
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
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')
    const res = await this.$axios.get(`/user/${userId}`, {
      headers: {
        Authorization: token
      }
    })
    const { statusCode, data } = res.data
    console.log(res.data)
    if (statusCode === 200) {
      this.user = data
      console.log(statusCode)
    } else if (statusCode === 401) {
      this.$toast('用户验证失败')
      this.$router.push('/login')
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
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
</style>
