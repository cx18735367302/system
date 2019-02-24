<template>
  <div class="new">
    <h1>翡翠学院管理员注册</h1>
    <el-form label-width="80px">
      <el-form-item label="用户名">
        <el-input v-model="name" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="pass" type="password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码">
        <el-input v-model="qpass" type="password"></el-input>
      </el-form-item>
      <el-form-item label="登录权限">
        <el-input v-model="root" placeholder="请输入登录权限码"></el-input>
      </el-form-item>
      <el-button type="success" round class="sub" @click="news">注册</el-button>
      <el-button type="primary" round class="sub" @click="login">去登录</el-button>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: "",
      pass: "",
      qpass: "",
      root: ""
    };
  },
  methods: {
    login(){
      this.$router.push({path:"/"})
    },
    news() {
      if (this.name === "" || this.pass === "" || this.pass !== this.qpass) {
        alert("两次密码输入不一致或者未输入内容");
      } else {
        this.$Axios({
          url: "/api/backstage/newtest?type=new",
          method: "post",
          data: {
            newname: this.name,
            newpassword: this.pass,
            newroot: this.root
          }
        }).then(result => {
          if (result.data.success) {
            alert("恭喜您，注册成功");
            this.$router.push({ path: "/" });
          } else {
            this.name = "";
            alert("该用户已存在，请重新输入");
          }
        });
      }
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
.new {
  width: 500px;
  min-height: 370px;
  margin: 0 auto;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}
.sub {
  margin:  0 30px;
}
</style>