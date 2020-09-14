<template>
  <div class="search">
    <div class="header">
      <span class="iconfont iconjiantou2" @click="goBack"></span>
      <div class="input">
        <span class="iconfont iconsearch"></span>
        <input
          type="text"
          placeholder="请输入搜索内容"
          v-model="keyword"
          @keyup.enter="search"
          @input="recommend"
        />
        <div class="btn" @click="search">搜索</div>
      </div>
    </div>
    <div class="list" v-if="list.length !== 0">
      <my-post v-for="item in list" :key="item.id" :post="item"></my-post>
    </div>
    <div class="recommend" v-else-if="recommendList.length">
      <p v-for="item in recommendList" :key="item.id"  @click="goSearch(item.title)">{{item.title}}</p>
    </div>
    <div v-else>
      <div class="history">
        <h1>历史记录</h1>
        <div class="h-content">
          <span
            v-for="(item, index) in history"
            :key="index"
            @click="goSearch(item)"
            >{{ item }}</span
          >
        </div>
      </div>
      <div class="hot">
        <h1>热门搜索</h1>
        <div class="h-content">
          <span v-for="item in hot" :key="item" @click="goSearch(item)">{{
            item
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  data() {
    return {
      keyword: '',
      list: '',
      history: [],
      hot: ['华为', '关晓彤', '美女'],
      recommendList: []
    }
  },
  async created() {
    this.history = JSON.parse(localStorage.getItem('history')) || []
    const res = this.$axios.get('/post_search_recommend')
    console.log(res)
  },
  methods: {
    async search() {
      const res = await this.$axios.get('/post_search', {
        params: {
          keyword: this.keyword
        }
      })
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.list = data
        if (this.list.length === 0) {
          this.$toast('没有相关数据')
        }
        this.history = this.history.filter(item => item !== this.keyword)
        this.history.unshift(this.keyword)
        localStorage.setItem('history', JSON.stringify(this.history))
      }
    },
    goSearch(item) {
      this.keyword = item
      this.search()
    },
    goBack() {
      if (this.keyword) {
        this.keyword = ''
      } else {
        this.$router.back()
      }
    },
    recommend: _.debounce(async function() {
      if (this.keyword === '') {
        this.recommendList = ''
        return
      }
      const res = await this.$axios.get('/post_search_recommend', {
        params: {
          keyword: this.keyword
        }
      })
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.recommendList = data
        console.log(this.recommendList)
      }
    }, 1000)
  },
  watch: {
    keyword(val) {
      if (val === '') {
        this.list = ''
      }
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  margin: 10px;
  padding: 10px;
  height: 60px;
  display: flex;
  align-items: center;
  .input {
    display: flex;
    align-items: center;
    flex: 1;
    position: relative;
    height: 40px;
    font-size: 14px;
    .iconfont {
      position: absolute;
      left: 20px;
      top: 10px;
    }
    input {
      width: 258px;
      height: 40px;
      border: 1px solid #ccc;
      border-radius: 20px;
      margin: 0 10px;
      padding-left: 30px;
    }
  }
}
.history,
.hot {
  margin: 20px;
  padding-bottom: 10px;
  h1 {
    font-size: 14px;
  }
  .h-content {
    display: flex;
    flex-wrap: wrap;
    span {
      display: inline-block;
      font-size: 13px;
      line-height: 20px;
      text-align: center;
      margin: 5px;
      width: 70px;
      border: 1px solid #666;
      background-color: #ccc;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }
  }
}
.history {
  border-bottom: 1px solid #ccc;
}
.recommend{
  padding: 10px;
  p{
    width: 100%;
    font-size: 13px;
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #ccc;
  }
}
</style>
