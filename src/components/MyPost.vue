<template>
  <div class="mypost" @click="$router.push(`/postdetail/${post.id}`)">
    <div class="video" v-if="post.type === 2">
      <div class="title">
        {{ post.title }}
      </div>
      <div class="img">
        <img :src="$baseURL(post.cover[0].url)" alt="" />
        <div class="iconfont iconshipin"></div>
      </div>
      <div class="info">
        <div>
          <span class="name">{{ post.user.nickname }}</span>
          <span class="comment">{{ post.comment_length }}跟帖</span>
        </div>
      </div>
    </div>
    <div
      class="single"
      v-else-if="post.cover.length === 1 || post.cover.length === 2"
    >
      <div class="left">
        <div class="title">{{ post.title }}</div>
        <div>
          <span class="name">{{ post.user.nickname }}</span>
          <span class="comment">{{ post.comment_length }}跟帖</span>
        </div>
      </div>
      <div class="right">
        <img :src="$baseURL(post.cover[0].url)" alt="" />
      </div>
    </div>
    <div class="single" v-else-if="post.cover.length === 0">
      <div class="left">
        <div class="title">{{ post.title }}</div>
        <div>
          <span class="name">{{ post.user.nickname }}</span>
          <span class="comment">{{ post.comment_length }}跟帖</span>
        </div>
      </div>
      <div class="right">
        <img src="../assets/1.jpg" alt="" />
      </div>
    </div>
    <div class="multiple" v-else>
      <div class="title">{{ post.title }}</div>
      <div class="img">
        <img :src="$baseURL(post.cover[0].url)" alt="" />
        <img :src="$baseURL(post.cover[1].url)" alt="" />
        <img :src="$baseURL(post.cover[2].url)" alt="" />
      </div>
      <div class="info">
        <div>
          <span class="name">{{ post.user.nickname }}</span>
          <span class="comment">{{ post.comment_length }}跟帖</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['post']
}
</script>

<style lang="less" scoped>
.single {
  width: 100%;
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
</style>
