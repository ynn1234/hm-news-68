<template>
  <div class="my-follow">
    <Hmheader>我的关注</Hmheader>
    <div class="follow" v-for="item in list" :key="item.id">
      <div class="left">
        <img :src="$baseURL + item.head_img" alt="" />
      </div>
      <div class="center">
        <p class="name">{{ item.nickname }}</p>
        <p class="time">{{ item.create_date | time }}</p>
      </div>
      <div class="right">
        <!-- <van-button type="primary" size="small" round>关注</van-button> -->
        <van-button size="small" round @click="unfollow(item.id)"
          >取消关注</van-button
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: {}
    }
  },
  created() {
    this.getInfo()
  },
  methods: {
    async getInfo() {
      const res = await this.$axios.get('/user_follows')
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.list = data
      }
    },
    async unfollow(id) {
      const res = await this.$axios.get(`/user_unfollow/${id}`)
      console.log(id, res)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        this.getInfo()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.follow {
  height: 80px;
  border-bottom: 1px solid #ccc;
  display: flex;
  align-items: center;
  padding: 20px;
  .left {
    width: 40px;
    height: 40px;
    margin-right: 10px;

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  .center {
    flex: 1;
    .name {
      font-size: 16px;
    }
    .time {
      font-size: 14px;
      color: #666;
    }
  }
}
</style>
