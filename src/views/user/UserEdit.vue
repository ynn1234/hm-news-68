<template>
  <div class="user-edit">
      <Hmheader>编辑资料</Hmheader>
      <div class="avart">
          <img :src="$axios.defaults.baseURL + user.head_img" alt="">
          <van-uploader :after-read="afterRead" />
      </div>
      <nav-bar @click="showNickname">
          <template>昵称</template>
          <template #detail>{{user.nickname}}</template>
      </nav-bar>
      <nav-bar @click="showPassword">
          <template>密码</template>
          <template #detail>******</template>
      </nav-bar>
      <nav-bar @click="showGender">
          <template>性别</template>
          <template #detail>{{user.gender === 1 ? '男' : '女'}}</template>
      </nav-bar>
      <van-dialog v-model="show" title="修改昵称" show-cancel-button @confirm="updateNickname">
         <van-field v-model="nickname" placeholder="请输入用户名" ref="nicknameFocus"/>
      </van-dialog>
      <van-dialog v-model="passwordshow" title="修改密码" show-cancel-button @confirm="updatePassword">
         <van-field v-model="password" placeholder="请输入密码" ref="passwordFocus" />
      </van-dialog>
      <van-dialog v-model="gendershow" title="修改性别" show-cancel-button @confirm="updateGender">
      <van-radio-group v-model="gender">
        <van-cell-group>
            <van-cell title="男" clickable @click="radio = '1'">
            <template #right-icon>
                <van-radio :name="1" />
            </template>
            </van-cell>
            <van-cell title="女" clickable @click="radio = '0'">
            <template #right-icon>
                <van-radio :name="0" />
            </template>
            </van-cell>
        </van-cell-group>
      </van-radio-group>
      </van-dialog>
      <div class="demo" v-show="imgShow">
        <div class="button">
          <van-button type="primary" @click="sure" class="sure">确认</van-button>
        <van-button type="danger" @click="cancel" class="cancel">取消</van-button>
        </div>
        <vueCropper
        ref="cropper"
        :img="imgUrl"
        autoCrop
        autoCropWidth=150
        autoCropHeight=150
        fixed
        ></vueCropper>
      </div>
  </div>
</template>

<script>
import { VueCropper } from 'vue-cropper'
export default {
  components: {
    VueCropper
  },
  data() {
    return {
      user: '',
      show: false,
      passwordshow: false,
      gendershow: false,
      nickname: '',
      password: '',
      gender: 1,
      imgShow: false,
      imgUrl: ''
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    async getUserInfo() {
      const userId = localStorage.getItem('userId')
      const res = await this.$axios.get(`/user/${userId}`)
      if (res.data.statusCode === 200) {
        this.user = res.data.data
      }
    },
    async updateInfo(data) {
      const userId = localStorage.getItem('userId')
      const res = await this.$axios.post(`/user_update/${userId}`, data)
      if (res.data.statusCode === 200) {
        this.getUserInfo()
        this.$toast.success('修改成功')
      }
    },
    // async updateInfo () {},
    async showNickname() {
      this.show = true
      this.nickname = this.user.nickname
      await this.$nextTick()
      this.$refs.nicknameFocus.focus()
    },
    async showPassword() {
      this.passwordshow = true
      this.password = this.user.password
      await this.$nextTick()
      this.$refs.passwordFocus.focus()
    },
    showGender() {
      this.gendershow = true
      this.gender = this.user.gender
    },
    async updateGender() {
      this.updateInfo({
        gender: this.gender
      })
    },
    async updatePassword() {
      this.updateInfo({
        password: this.password
      })
    },
    async updateNickname() {
      this.updateInfo({
        nickname: this.nickname
      })
    },
    Isimg(name) {
      if (name.endsWith('.jpg') || name.endsWith('.png') || name.endsWith('.gif') || name.endsWith('.jpeg')) {
      // if (name.endsWith('.jpg' || '.png' || 'gif' || 'jpeg')) {
        return true
      } else {
        this.$toast.fail('只能上传图片哦!')
        return false
      }
    },
    isBig(size) {
      if (size < 100 * 1024) {
        return true
      } else {
        this.$toast.fail('图片大小不超过20k')
        return false
      }
    },
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      if (this.Isimg(file.file.name) && this.isBig(file.file.size)) {
        // 获取的是base64的图片
        this.imgShow = true
        this.imgUrl = file.content
      }
    },
    sure() {
      // 获取截图的blob数据
      this.$refs.cropper.getCropBlob(async(blob) => {
        // do something
        const fd = new FormData()
        fd.append('file', blob)
        const res = await this.$axios.post('/upload', fd)
        const { data, message, statusCode } = res.data
        if (statusCode === 200) {
          this.$toast.success(message)
          // this.user.head_img = data.url
          // 文件上传   把文件上传到服务器上 并没有存进数据库
          // 编辑用户信息  把服务器上的图片与用户匹配上传到数据库中
          // 用户详情  获取用户最新信息 渲染到页面
          this.updateInfo({ head_img: data.url })
        }
        this.imgShow = false
      })
    },
    // sure () {
    //   this.$refs.cropper.stopCrop()
    // },
    cancel() {
      this.imgShow = false
    }
  }
}

</script>

<style lang="less" scoped>
.avart{
    padding: 40px;
    text-align: center;
    position: relative;
    img{
        width: 100px;
        height: 100px;
        border-radius: 50%;
    }
    .van-uploader{
      width: 100px;
      height: 100px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      opacity: 0;
    }
}
/deep/ .van-dialog__content{
    padding:10px 20px;
}
.van-field{
    border: 1px solid #ccc;
}
.demo{
  position:fixed;
  width: 100%;
  height: 100%;
  background-color: #fff;
  left: 0;
  top: 0;
  z-index: 999;
  .sure,.cancel{
    position: absolute;
    top: 0;
    z-index:1000;
  }
  .cancel{
    right: 0;
  }
}
</style>
