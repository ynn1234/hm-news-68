<template>
  <div class="nav-bar" @click="skip" >
      <div class="left"><slot></slot></div>
      <div class="center"><slot name="detail"></slot></div>
      <div class="arrow">
          <span class="iconfont iconjiantou1"></span>
      </div>
  </div>
</template>

<script>
export default {
  methods: {
    skip() {
      if (this.to) {
        this.$router.push(this.to)
      }
      this.$emit('click')
    }
  },
  props: {
    to: String
  }

}
</script>

<style lang="less" scoped>
.nav-bar{
    display: flex;
    align-items: center;
    height: 50px;
    border-bottom: 1px solid #ccc;
    font-size: 14px;
    margin-left: 20px;
    padding-right: 10px;
  .center{
    flex:1;
    text-align: right;
    font-size: 12px;
    color:#a0abc3;
    margin-right: 10px;

  }
}

</style>
