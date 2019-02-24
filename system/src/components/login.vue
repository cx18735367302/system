<template>
  <div class="box">
    <div class="login">
      <h1>翡翠学院后台管理系统</h1>
      <el-form label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="name" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="pass" type="password"></el-input>
        </el-form-item>
        <el-form-item label="验证码">
          <el-input v-model="code" placeholder="请输入验证码" class="code"></el-input>
          <veri class="veri"></veri>
        </el-form-item>
        <div class="btns">
          <el-button type="primary" @click="login">登陆</el-button>
          <el-button type="primary" @click="newtest" class="btn">注册</el-button>
        </div>
      </el-form>
      {{success}}
    </div>
  </div>
</template>
<script>
import veri from "./canvasveri";
export default {
  components: { veri },
  data() {
    return {
      code: "",
      success: "",
      name: "",
      pass: ""
    };
  },
  methods: {
    login() {
      this.$Axios({
        url: "/api/backstage/test?type=checkveri",
        method: "get",
        params: {
          veri: this.code
        }
      }).then(result => {
        // console.log(result.data)
        if (result.data.success != "ok") {
          this.success = "请重新输入验证码";
          // return false;
        } else {
          this.$Axios({
            url: "/api/backstage/newtest?type=login",
            method: "post",
            data: {
              username: this.name,
              password: this.pass
            }
          }).then(result => {
            // console.log(result.data)
            if (result.data.success) {
              var sid = result.data.data[0].tokenId;
              console.log(sid);
              sessionStorage.setItem("_id", sid);
              this.$router.push({ path: "/home" });
              //  console.log(sessionStorage.getItem("_id"));
            } else {
              this.success = "用户名或密码错误";
            }
          });
        }
      });
    },
    newtest() {
      this.$router.push({
        path: "/admin"
      });
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
.login {
  width: 500px;
  min-height: 300px;
  margin: 0 auto;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.code {
  width: 50%;
}
.veri {
  display: inline-block;
  position: relative;
  top: 10px;
  left: 50px;
}
.btns {
  position: relative;
  left: 50%;
  text-align: center;
  transform: translateX(-50%);
}
.btns .el-button {
  margin: 0 30px;
}
</style>