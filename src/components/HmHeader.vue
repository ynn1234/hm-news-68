<template>
  <!-- <van-sticky> -->
  <div class="place">
    <div class="hm-header">
      <div class="back" @click="back">
        <span class="iconfont iconjiantou2"></span>
      </div>
      <div class="title"><slot></slot></div>
      <div class="space"></div>
    </div>
  </div>
  <!-- </van-sticky> -->
</template>

<script>
export default {
  methods: {
    back() {
      this.$router.back()
    }
  }
}
</script>

<style lang="less">
.place {
  height: 50px;
}
.hm-header {
  position: fixed;
  top: 0;
  width: 100%;
  display: flex;
  height: 50px;
  border-bottom: 1px solid #ccc;
  line-height: 50px;
  z-index: 1000;
  background-color: #f2f2f2;
  .back,
  .space {
    padding-left: 20px;
    width: 50px;
  }
  .title {
    flex: 1;
    text-align: center;
    font-size: 18px;
    font-weight: 700;
  }
}
</style>
