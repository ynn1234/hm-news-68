<template>
  <div class="hm-comment">
    <div class="list" v-for="item in comment" :key="item.id">
      <div class="info">
        <div class="left">
          <img :src="'http://localhost:3000' + item.user.head_img" alt="" />
        </div>
        <div class="center">
          <div class="name">{{ item.user.nickname }}</div>
          <div class="time">{{ item.create_date | now }}</div>
        </div>
        <div class="right" @click="reply(item.id, item.user.nickname)">
          回复
        </div>
      </div>
      <hm-floor
        v-if="item.parent"
        :comment="item.parent"
        :count="getNum(0, item)"
      ></hm-floor>
      <!-- @reply="onReply" -->
      <div class="content">{{ item.content }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    comment: {
      user: {}
    }
  },
  // created() {
  //   this.$bus.$on('reply', (id, nickname) => {
  //     this.$emit('reply', id, nickname)
  //   })
  // },
  data() {
    return {
      count: ''
    }
  },
  methods: {
    getNum(num, obj) {
      if (obj.parent) {
        return this.getNum(num + 1, obj.parent)
      } else {
        return num
      }
    },
    reply(id, nickname) {
      console.log(this.comment)
      console.log(id, nickname)
      this.$bus.$emit('reply', id, nickname)
    }
    // onReply(id, nickname) {
    //   this.$emit('reply', id, nickname)
    // }
  }
}
</script>

<style lang="less" scoped>
.list {
  padding: 20px;
  border-bottom: 1px solid #ccc;
  .content {
    margin-top: 10px;
    font-size: 14px;
  }
}
.info {
  display: flex;
  .left {
    margin-right: 10px;
  }
  img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
  }
  .center {
    flex: 1;
    .name {
      font-size: 14px;
      margin-bottom: 5px;
    }
    .time {
      font-size: 12px;
      color: #666;
    }
  }
  .right {
    font-size: 12px;
    color: #666;
  }
}
</style>
