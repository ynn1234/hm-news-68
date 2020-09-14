<template>
  <div class="post-detail">
    <!-- <van-sticky> -->
    <div class="header">
      <div class="left" @click="$router.back()">
        <span class="iconfont iconjiantou2"></span>
      </div>
      <div class="center">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="right">
        <van-button
          round
          size="small"
          v-if="postDetail.has_follow"
          @click="unfollow"
          >已关注</van-button
        >
        <van-button round type="danger" size="small" v-else @click="follow"
          >关注</van-button
        >
      </div>
    </div>
    <!-- </van-sticky> -->
    <div class="content">
      <h4>{{ postDetail.title }}</h4>
      <div class="info">
        <div class="name">{{ postDetail.user.nickname }}</div>
        <div class="time">{{ postDetail.create_date | time }}</div>
      </div>
      <div v-html="postDetail.content" v-if="postDetail.type === 1"></div>
      <div class="video" v-else>
        <video
          :src="getUrl(postDetail.content)"
          controls
          autoplay
          muted
        ></video>
      </div>
      <div class="oper">
        <div class="follow">
          <span
            :class="{ like: postDetail.has_like }"
            class="iconfont icondianzan "
            @click="like"
          ></span>
          <span class="num">{{ postDetail.like_length }}</span>
        </div>
        <div class="share">
          <span class="iconfont iconweixin"></span>
          <span class="num">微信</span>
        </div>
      </div>
    </div>
    <div class="comment">
      <h1>精彩跟帖</h1>
      <hm-comment :comment="commentList"></hm-comment>
    </div>
    <div class="foot">
      <div class="active" v-if="onWrite">
        <input type="text" placeholder="写跟帖" @focus="write" />
        <div class="com">
          <span class="num">100</span>
          <span class="iconfont iconpinglun-"></span>
        </div>
        <div
          class="iconfont iconshoucang"
          :class="{ star: postDetail.has_star }"
          @click="getstar"
        ></div>
        <div class="iconfont iconfenxiang"></div>
      </div>
      <div class="unactive" v-else>
        <textarea
          :placeholder="'回复:' + nickname"
          ref="textarea"
          v-model="content"
        ></textarea>
        <button @click="send" @keyup.enter="send">发送</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      postDetail: {
        // 一进来没有数据 点一次不会报错 但是当点两次的时候就会报错
        user: {}
      },
      commentList: [],
      onWrite: true,
      content: '',
      nickname: '',
      // 回复的id
      replyId: ''
    }
  },
  created() {
    this.getPostDetail()
    // console.log(this.postDetail)
    this.getCommentList()
    this.$bus.$on('reply', this.onReply)
  },
  destroyed() {
    this.$bus.$off('reply', this.onReply)
  },
  methods: {
    async getstar() {
      console.log(123)
      const id = this.$route.params.id
      console.log(id)
      const res = await this.$axios.get(`/post_star/${id}`)
      console.log(res.data)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast(message)
        this.getPostDetail()
      }
    },
    noLogin() {
      const token = localStorage.getItem('token')
      if (!token) {
        this.$router.push({
          name: 'login',
          params: {
            back: true
          }
        })
        // 未登录
        return true
      } else {
        return false
      }
    },
    async getPostDetail() {
      const id = this.$route.params.id
      const res = await this.$axios.get(`/post/${id}`)
      // console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.postDetail = data
        console.log(this.postDetail)
      }
    },
    async getCommentList() {
      const id = this.$route.params.id
      const res = await this.$axios.get(`/post_comment/${id}`)
      // console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.commentList = data
        // console.log(this.commentList)
      }
    },
    getUrl(content) {
      const div = document.createElement('div')
      div.innerHTML = content
      return div.innerText
    },
    async follow() {
      const id = this.postDetail.user.id
      if (this.noLogin()) return
      const res = await this.$axios.get(`/user_follows/${id}`)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        this.getPostDetail()
      }
    },
    async unfollow() {
      const res = await this.$axios.get(
        `/user_unfollow/${this.postDetail.user.id}`
      )
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        this.getPostDetail()
      }
    },
    async like() {
      if (this.noLogin()) return
      const res = await this.$axios.get(`/post_like/${this.postDetail.id}`)
      console.log(res)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        this.getPostDetail()
      }
    },
    async write() {
      this.onWrite = false
      await this.$nextTick()
      this.$refs.textarea.focus()
    },
    async onReply(id, nickname) {
      this.onWrite = false
      await this.$nextTick()
      this.$refs.textarea.focus()
      this.nickname = '@' + nickname
      this.replyId = id
    },
    async send() {
      const content = this.content
      const id = this.postDetail.id
      const res = await this.$axios.post(`/post_comment/${id}`, {
        content,
        parent_id: this.replyId
      })
      const { message, statusCode } = res.data
      if (statusCode === 200) {
        this.$toast(message)
        this.content = ''
        this.onWrite = true
        this.nickname = ''
        // 清空回复的id和nickname
        this.replyId = ''
        this.getCommentList()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.content {
  margin-top: 50px;
  padding: 10px 20px;
  border-bottom: 3px solid #ccc;
  padding-bottom: 20px;
  /deep/ p,
  /deep/ span {
    font-size: 14px;
  }
  /deep/ img {
    width: 100%;
  }
  /deep/ h1 {
    font-size: 20px;
  }
}

.header {
  background-color: #f2f2f2;
  width: 100%;
  position: fixed;
  top: 0;
  height: 50px;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;
  .left {
    flex: 1;
  }
  .center {
    flex: 7;
    text-align-last: left;
    .iconnew {
      font-size: 50px;
    }
  }
  .right {
    flex: 1;
  }
}
.van-button {
  width: 62px;
  height: 26px;
  border: 1px solid #ccc;
}
.oper {
  display: flex;
  justify-content: space-around;
  .follow,
  .share {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100px;
    height: 30px;
    border: 1px solid #666;
    border-radius: 20px;
    padding: 0 20px;
    .like {
      color: red;
      font-weight: 700;
    }
    .num {
      font-size: 16px;
      color: #666;
    }
    .iconweixin {
      color: green;
    }
  }
}
h4 {
  font-size: 18px;
}
.p {
  font-size: 14px;
  line-height: 25px;
  margin-bottom: 30px;
}
.info {
  font-size: 13px;
  color: #828282;
  display: flex;
  align-items: center;
  margin: 10px 0;
  .name {
    margin-right: 10px;
  }
}
.video {
  width: 100%;
  video {
    width: 100%;
  }
}
.comment {
  padding-top: 30px;
  margin-bottom: 50px;
  h1 {
    text-align: center;
    font-size: 18px;
    font-weight: normal;
  }
}
.foot {
  z-index: 999;
  width: 100%;
  position: fixed;
  bottom: 0;
  border-top: 1px solid #ccc;
  .active {
    background-color: #f2f2f2;
    padding: 10px;
    height: 50px;
    display: flex;
    height: 100%;
    justify-content: space-around;
    .iconfont {
      font-size: 24px;
    }
    .star {
      color: red;
    }
    input {
      width: 180px;
      height: 30px;
      padding-left: 10px;
      border: 0 none;
      border-radius: 20px;
      background-color: #ccc;
      font-size: 13px;
      line-height: 30px;
    }
    .com {
      position: relative;
      .num {
        position: absolute;
        top: 0;
        left: 10px;
        display: inline-block;
        font-size: 12px;
        background-color: red;
        height: 14px;
        line-height: 14px;
        border-radius: 6px;
        color: #fff;
      }
    }
  }
  .unactive {
    padding: 10px;
    background-color: #f2f2f2;
    display: flex;
    justify-content: space-around;
    align-items: flex-end;
    textarea {
      width: 260px;
      height: 90px;
      background-color: #fff;
      border-radius: 20px;
      background-color: #ccc;
      font-size: 13px;
      padding: 10px;
      border: 0 none;
    }
    button {
      width: 62px;
      height: 26px;
      border-radius: 20px;
      font-size: 12px;
      color: #fff;
      background-color: red;
      border: 1px solid #fff;
    }
  }
}
</style>
