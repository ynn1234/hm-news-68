<template>
  <div class="hm-floor">
    <hm-floor
      v-if="comment.parent"
      :comment="comment.parent"
      :count="count - 1"
    ></hm-floor>
    <!-- @reply="onReply" -->
    <div class="list">
      <div class="info">
        <div class="left">{{ count }}</div>
        <div class="center">
          <div class="name">{{ comment.user.nickname }}</div>
          <div class="time">{{ comment.create_date | now }}</div>
        </div>
        <div class="right" @click="reply">回复</div>
      </div>
      <div class="content">{{ comment.content }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    comment: {
      user: {}
    },
    count: Number
  },
  methods: {
    reply() {
      // this.$emit('reply', this.comment.id, this.comment.user.nickname)
      this.$bus.$emit('reply', this.comment.id, this.comment.user.nickname)
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
  border: 1px solid #ccc;
  .content {
    margin-top: 10px;
    font-size: 14px;
  }
}
.info {
  display: flex;
  .left {
    margin-right: 10px;
    font-size: 16px;
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
