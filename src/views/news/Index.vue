<template>
  <div class="index">
    <div class="myheader">
      <div class="left">
        <div class="iconfont iconnew"></div>
      </div>
      <div class="center">
        <div class="search" @click="$router.push('/search')">
          <div class="iconfont iconsearch"></div>
          <span>搜索新闻</span>
        </div>
      </div>
      <div class="right">
        <div class="iconfont iconwode"></div>
      </div>
    </div>
    <van-sticky class="more-sticky">
      <div class="more" @click="$router.push('/mycolumn')">
        <span class="iconfont iconlianjie"></span>
      </div>
    </van-sticky>
    <van-tabs v-model="active" sticky animated swipeable>
      <van-tab v-for="item in tabList" :key="item.id" :title="item.name">
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            :immediate-check="false"
            offset="10"
          >
            <my-post
              v-for="item in postList"
              :key="item.id"
              :post="item"
            ></my-post>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {
      active: 0,
      tabList: [],
      postList: [],
      pageIndex: 1,
      pageSize: 5,
      loading: false,
      finished: false,
      refreshing: false
    }
  },
  /*
  滑动加载的思想
  1.添加标签
  2.滑动的时候  页数++
  3.将新获取的数据添加到原有的数据的后面  数据加载完毕后将loading=false
  4.当该次加载的数据小于pageSize的时候停止加载finished=true
  下拉刷新
  1.将数组情况
  2.改为加载第一页  pageInde=1
  3.防止下拉刷新的时候滚动条触底  将loading改为true
  4.将此时数组为空将finished=false
  5.获取第一页的数据
  6.将refreshing改为false

  */
  methods: {
    async getPostList(id) {
      const res = await this.$axios.get('/post', {
        params: {
          category: id,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      })
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.postList = [...this.postList, ...data]
        // 数据加载完毕
        this.loading = false
        this.refreshing = false
        if (data.length < this.pageSize) {
          this.finished = true
        }
      }
    },
    async getTabList() {
      const tabData = JSON.parse(localStorage.getItem('delTabList'))
      if (tabData) {
        this.tabList = tabData
        this.getPostList(this.tabList[this.active].id)
        return
      }
      const res = await this.$axios.get('/category')
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.tabList = data
        this.getPostList(this.tabList[this.active].id)
      }
    },
    toTab() {
      this.$router.push('/mycolumn')
    },
    onLoad() {
      setTimeout(() => {
        this.pageIndex++
        this.getPostList(this.tabList[this.active].id)
        this.loading = false
      }, 1000)
    },
    onRefresh() {
      console.log(123)
      // 清空列表数据
      this.postList = []
      this.pageIndex = 1
      // this.getPostList(this.tabList[this.active].id)
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true
      this.finished = false
      this.getPostList(this.tabList[this.active].id)
      // this.refreshing = false
    }
  },
  created() {
    this.getTabList()
  },
  watch: {
    active(newval) {
      this.postList = []
      this.pageIndex = 1
      // 同下拉加载 滚动条触底  自动加载了一次
      this.loading = true
      this.finished = false
      this.getPostList(this.tabList[newval].id)
    }
  }
}
</script>

<style lang="less" scoped>
.myheader {
  width: 100%;
  height: 50px;
  background-color: red;
  padding: 0 10px;
  display: flex;
  align-items: center;
  color: #fff;
  .left {
    .iconfont {
      font-size: 50px;
    }
  }
  .center {
    flex: 1;
    .search {
      width: 210px;
      height: 35px;
      line-height: 35px;
      background-color: rgba(255, 255, 255, 0.5);
      margin-left: 20px;
      border-radius: 20px;
      position: relative;
      text-align: center;
      .iconfont {
        position: absolute;
        left: 50px;
        top: 3px;
      }
      span {
        font-size: 16px;
      }
    }
  }
  .right {
    .iconfont {
      font-size: 26px;
    }
  }
}

// display: flex;
// position: relative;
// background-color: #e4e4e4;
// height: 44px;
.van-tabs {
  /deep/ .van-tabs__nav {
    background-color: #e4e4e4;
    width: 85%;
  }
}
.more {
  width: 15%;
  height: 44px;
  position: absolute;
  right: 0;
  z-index: 999;
  background-color: #e4e4e4;
  text-align: center;
  line-height: 44px;
}
.more-sticky {
  /deep/ .van-sticky--fixed {
    z-index: 100;
  }
}
</style>
