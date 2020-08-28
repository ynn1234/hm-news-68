<template>
  <div class="hm-header">
    <div class="back" @click="back">
        <span class="iconfont iconjiantou2"></span>
    </div>
    <div class="title"><slot></slot></div>
    <div class="space"></div>
  </div>
</template>

<script>
export default {
  methods: {
    back () {
      this.$router.back()
    }
  }
}
</script>

<style lang="less">
  .hm-header{
      display: flex;
      height: 50px;
      border-bottom: 1px solid #ccc;
      line-height: 50px;
      .back,.space{
          padding-left: 20px;
          width: 50px;
      }
      .title{
          flex:1;
          text-align: center;
          font-size: 18px;
          font-weight: 700;
      }
  }

</style>
