<template>
  <div class="mycolumn">
    <Hmheader>栏目管理</Hmheader>
    <div class="delTabList">
      <p>点击删除以下栏目(最少保留4个)</p>
      <div class="content">
        <div class="item" v-for="item in delTabList" :key="item.id" @click="delList(item.id)">{{item.name}}</div>
      </div>
    </div>
    <div class="addTabList">
      <p>点击添加以下栏目</p>
      <div class="content">
        <div class="item" v-for="item in addTabList" :key="item.id" @click="addTab(item.id)">{{item.name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 点击已经激活的栏目
      delTabList: [],
      // 存放未激活的栏目
      addTabList: []
    }
  },
  created() {
    const delTabList = JSON.parse(localStorage.getItem('delTabList'))
    const addTabList = JSON.parse(localStorage.getItem('addTabList'))
    if (delTabList) {
      this.delTabList = delTabList
      this.addTabList = addTabList
    } else {
      this.getDelList()
    }
  },
  methods: {
    async getDelList() {
      const res = await this.$axios.get('/category')
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.delTabList = data
        console.log(this.delTabList)
      }
    },
    delList(id) {
      if (this.delTabList.length > 4) {
        const index = this.delTabList.findIndex(item => item.id === id)
        this.addTabList.push(this.delTabList[index])
        this.delTabList.splice(index, 1)
      }
    },
    addTab(id) {
      const index = this.addTabList.findIndex(item => item.id === id)
      this.delTabList.push(this.addTabList[index])
      this.addTabList.splice(index, 1)
    }
  },
  watch: {
    delTabList: {
      deep: true,
      handler(newval, oldval) {
        localStorage.setItem('delTabList', JSON.stringify(this.delTabList))
        localStorage.setItem('addTabList', JSON.stringify(this.addTabList))
      }
    }
  }

}
</script>

<style lang="less" scoped>
  .delTabList,.addTabList{
    padding: 20px;
    p{
      font-size: 14px;
      color: #666;
      margin-bottom: 10px;
    }
    .content{
      display: flex;
      flex-wrap: wrap;
      .item{
        width: 70px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        font-size: 18px;
        margin: 5px;
        border: 1px solid #bbb;
      }
    }
  }

</style>
