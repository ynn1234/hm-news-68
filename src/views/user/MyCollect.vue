<template>
  <div class="my-collect">
    <Hmheader>我的收藏</Hmheader>
    <div
      class="list"
      v-for="item in collectList"
      :key="item.id"
      @click="$router.push(`/postdetail/${item.id}`)"
    >
      <div class="video" v-if="item.type === 2">
        <div class="title">
          {{ item.title }}
        </div>
        <div class="img">
          <img :src="$baseURL(item.cover[0].url)" alt="" />
          <div class="iconfont iconshipin"></div>
        </div>
        <div class="info">
          <div>
            <span class="name">{{ item.user.nickname }}</span>
            <span class="comment">{{ item.comment_length }}跟帖</span>
          </div>
        </div>
      </div>
      <div
        class="collect"
        v-else-if="item.cover.length === 1 || item.cover.length === 2"
      >
        <div class="left">
          <div class="title">{{ item.title }}</div>
          <div>
            <span class="name">{{ item.user.nickname }}</span>
            <span class="comment">{{ item.comments.length }}跟帖</span>
          </div>
        </div>
        <div class="right">
          <img :src="$baseURL(item.cover[0].url)" alt="" />
        </div>
      </div>
      <div class="multiple" v-else>
        <div class="title">{{ item.title }}</div>
        <div class="img">
          <img :src="$baseURL(item.cover[0].url)" alt="" />
          <img :src="$baseURL(item.cover[1].url)" alt="" />
          <img :src="$baseURL(item.cover[2].url)" alt="" />
        </div>
        <div class="info">
          <div>
            <span class="name">{{ item.user.nickname }}</span>
            <span class="comment">{{ item.comment_length }}跟帖</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      collectList: []
    }
  },
  methods: {
    async getCollect() {
      const res = await this.$axios.get('/user_star')
      const { statusCode, data } = res.data
      // console.log(res)
      if (statusCode === 200) {
        this.collectList = data
        console.log(this.collectList)
      }
    },
    url(url) {
      if (url.startsWith('http')) {
        return url
      } else {
        return this.$baseURL + url
      }
    }
  },
  created() {
    this.getCollect()
  }
}
</script>

<style lang="less" scoped>
.collect {
  display: flex;
  padding: 10px;
  border-bottom: 1px solid #ccc;
  align-items: center;
  .left {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
    .title {
      font-size: 16px;
    }
    span {
      font-size: 13px;
      color: #828282;
    }
  }
  .right {
    img {
      width: 120px;
      height: 74px;
    }
  }
  .name {
    margin-right: 10px;
  }
}
.video {
  border-bottom: 1px solid #ccc;
  font-size: 16px;
  padding: 10px;
  .title {
    margin-bottom: 10px;
  }
  .img {
    position: relative;
    text-align: center;
    img {
      width: 340px;
      height: 200px;
    }
    .iconfont {
      font-size: 40px;
      line-height: 50px;
      text-align: center;
      color: #fff;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 50px;
      height: 50px;
      background-color: rgba(0, 0, 0, 0.5);
      border-radius: 50%;
    }
  }
  .info {
    font-size: 13px;
    color: #828282;
    .name {
      margin-right: 10px;
    }
  }
}
.multiple {
  border-bottom: 1px solid #ccc;
  font-size: 16px;
  padding: 10px;
  .img {
    padding: 10px 0;
    display: flex;
    justify-content: space-around;
    img {
      width: 112px;
      height: 74px;
    }
  }
  .info {
    font-size: 13px;
    color: #828282;
    .name {
      margin-right: 10px;
    }
  }
}
</style>
