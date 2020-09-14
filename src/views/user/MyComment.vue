<template>
  <div class="my-comment">
    <Hmheader>我的跟帖</Hmheader>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :immediate-check="false"
        offset="10"
        @load="onLoad"
      >
        <div class="detail" v-for="item in commentList" :key="item.id">
          <div class="time">
            {{ item.create_date | time('YYYY-MM-DD  HH:mm') }}
          </div>
          <div class="reply" v-if="item.parent">
            <p class="nickname">回复:{{ item.parent.user.nickname }}</p>
            <p>{{ item.parent.content }}?</p>
          </div>
          <div class="content">{{ item.content }}</div>
          <div class="link" @click="$router.push(`/postdetail/${item.id}`)">
            <div class="left">{{ item.post.title }}</div>
            <div class="right"><span class="iconfont iconjiantou1"></span></div>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
// :immediate-check="false"
//     默认会触发一次onload事件  该配置关闭初始化触发load事件 -->
// offset="10"  距离底部多少时,触发onload事件
export default {
  data() {
    return {
      commentList: '',
      loading: false,
      finished: false,
      isLoading: false,
      pageIndex: 1,
      pageSize: 5
    }
  },
  created() {
    this.getComment()
  },
  methods: {
    async getComment() {
      const res = await this.$axios.get('/user_comments', {
        params: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      })
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        console.log('获取数据')
        this.commentList = [...this.commentList, ...data]
        // console.log(this.commentList)
        this.loading = false
      }
      if (data.length < this.pageSize) {
        this.finished = true
      }
    },
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        console.log('需要加载更多数据了')
        this.pageIndex++
        this.getComment()
        this.loading = false
      }, 1000)
    },
    onRefresh() {
      setTimeout(() => {
        this.commentList = []
        this.pageIndex = 1
        // 向下刷新的时候完毕的时候没有更多了 防止过后数据不能加载
        this.finished = false
        // 当评论列表清空的时候 滚动条触底 会再加载一次数据   异步加载数据
        // 下拉刷新的时候 列表清空  发送ajax请求 获取数据列表  滚动条触底 会再加载一次数据  所以获取了两次数据 将loading=true
        this.loading = true
        this.getComment()
        this.$toast('刷新成功')
        this.isLoading = false
      }, 1000)
    }
  }
}
</script>

<style lang="less" scoped>
.detail {
  padding: 20px;
  border-bottom: 1px solid #ccc;
  .time {
    color: #898989;
    margin-bottom: 10px;
  }
  .time,
  .content {
    font-size: 14px;
  }
  .reply {
    background-color: #e4e4e4;
    color: #868686;
    font-size: 14px;
    padding: 20px;
    margin-bottom: 10px;
    .nickname {
      font-size: 12px;
      margin-bottom: 10px;
    }
  }
  .link {
    color: #898989;
    font-size: 14px;
    margin-top: 10px;
    display: flex;
    align-items: center;
    .left {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }
  }
}
</style>
