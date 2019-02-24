<template>
  <div class="update">
    <h1>翡翠学院管理员信息完善</h1>
    <el-form label-width="80px">
      <el-form-item label="昵称">
        <el-input v-model="nickname" placeholder="请输入昵称"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="email" placeholder="请输入用邮箱"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="phone" placeholder="请输入用手机号"></el-input>
      </el-form-item>
      <el-input v-model="sid" type="text" name="sid" v-show="false"></el-input>
      <el-button type="button" @click="sub">更新</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "update",
  data() {
    return {
      nickname: "",
      email: "",
      phone: "",
      sid: parseInt(sessionStorage.getItem("_id"))
    };
  },
  methods: {
    sub() {
      if (!this.nickname || !this.email || !this.phone) {
        return false;
      } else {
        this.$Axios({
          url: "/api/backstage/newtest?type=update",
          method: "POST",
          data: {
            nickname: this.nickname,
            email: this.email,
            phone: this.phone,
            sid: this.sid
          }
        }).then(result => {
          // console.log(result);
          if (result.data.success) {
            this.$router.push({ path: "/home" });
          }
        });
      }
    }
  },
  mounted() {
    if (this.sid == "") {
      alert = "请登录";
      this.$router.push({ path: "/" });
    }
  }
};
</script>

<style lang="">
body {
  background: #000067;
}
.el-form-item__label {
  color: white;
}
h1 {
  text-align: center;
  font-family: "Hiragino Sans GB";
  color: white;
  font-weight: 500;
}
.update {
  width: 500px;
  min-height: 370px;
  margin: 0 auto;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}
</style>