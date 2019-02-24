<template>
  <div>
    <div class="header">
      <el-menu
        class="el-menu-demo hea-right"
        mode="horizontal"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="1">
          <i class="el-icon-info"></i>卓新思创
        </el-menu-item>
        <el-menu-item index="2">
          <i class="el-icon-service"></i>在线客服
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-question"></i>常见问题
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-warning"></i>安全问题
        </el-menu-item>
        <el-submenu index="5">
          <template slot="title">
            {{nickname}}
            <img class="ico" :src="imgsrc">
          </template>
          <el-menu-item index="5-1" @click="$router.push({path:'/update'})">
            <i class="el-icon-tickets"></i>完善信息
          </el-menu-item>
          <el-menu-item index="5-2">
            <i class="el-icon-edit"></i>
            <el-button type="text" @click="upmm = true">修改密码</el-button>
          </el-menu-item>
          <el-menu-item index="5-3">
            <i class="el-icon-picture"></i>
            <!-- 更改头像 -->
            <el-button type="text" @click="dialogFormVisible = true">更改头像</el-button>
          </el-menu-item>
          <el-menu-item index="5-3" @click="quit">
            <i class="el-icon-delete"></i>退出登录
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
    <el-dialog title="更改头像" :visible.sync="dialogFormVisible">
      <!-- <el-form action="/api/backstage/newtest?type=img" enctype="multipart/form-data" method="POST"> -->
      <!-- <el-form-item label="上传头像" :label-width="formLabelWidth"> -->
      <el-input type="file" v-model="fax" multiple="“multiple”"></el-input>
      <!-- </el-form-item> -->
      <!-- <el-input autocomplete="off" v-model="sid" v-show="false"></el-input> -->
      <el-button @click="dialogFormVisible = false">取消上传</el-button>
      <el-button type="button" @click="svr">确认上传</el-button>
      <!-- </el-form> -->
    </el-dialog>
    <el-dialog title="修改密码" :visible.sync="upmm">
      <el-form>
        <el-form-item label="旧密码" :label-width="formLabelWidth">
          <el-input type="password" v-model="oldpass" placeholder="请输入旧密码"></el-input>
        </el-form-item>
        <el-form-item label="新密码" :label-width="formLabelWidth">
          <el-input type="password" v-model="newpass" placeholder="请输入新密码"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" :label-width="formLabelWidth">
          <el-input type="password" v-model="newpasss" placeholder="请再次输入新密码"></el-input>
        </el-form-item>
        <el-button @click="upmm = false">取消修改</el-button>
        <el-button type="button" @click="uppass">确认修改</el-button>
      </el-form>
    </el-dialog>
    <div class="content">
      <el-menu
        class="menutwo"
        mode="horizontal"
        background-color="#35508a"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item class="headtwo" index="1">
          <i class="el-icon-view"></i>
          用户管理
        </el-menu-item>
        <el-menu-item class="headtwo" index="2">
          <i class="el-icon-date"></i>
          课程管理
        </el-menu-item>
        <el-menu-item class="headtwo" index="3">
          <i class="el-icon-tickets"></i>
          统计报表
        </el-menu-item>
        <el-menu-item class="headtwo" index="4">
          <i class="el-icon-goods"></i>
          其他管理
        </el-menu-item>
        <el-menu-item class="headtwo" index="5">
          <i class="el-icon-star-on"></i>
          数据字典
        </el-menu-item>
        <el-menu-item class="headtwo" index="6">
          <i class="el-icon-setting"></i>
          系统维护
        </el-menu-item>
      </el-menu>
      <el-breadcrumb separator="/" class="brd">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>系统人员</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="find">
        <el-input
          type="text"
          v-model="muhu"
          placeholder="模糊查找 / 用户名"
          v-bind:style="'width:40%;margin-left:20px'"
        ></el-input>
        <el-button type="success" @click="find">查询</el-button>
        <el-button type="primary" @click="newuser">
          <i class="el-icon-circle-plus-outline"></i>添加
        </el-button>
      </div>
      <div class="findbox">
        <el-table border :data="tableData" style="width: 100%;">
          <el-table-column prop="username" label="用户名" width="180"></el-table-column>
          <el-table-column prop="nickname" label="昵称" width="500"></el-table-column>
          <el-table-column prop="root" label="后台权限" width="150"></el-table-column>
          <el-table-column prop="phone" label="手机" width="200"></el-table-column>
          <el-table-column prop="createAt" label="编辑日期" width="150"></el-table-column>
          <el-table-column prop="address" label="操作">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="success" size="small">编辑</el-button>
              <el-button type="danger" @click="deletes(scope.row)" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-dialog title="编辑" :visible.sync="bj" class="bj">
        <el-form>
          <el-form-item label="用户名" :label-width="formLabelWidth" >
            <el-input type="text" v-model="bjusername" disabled></el-input>
          </el-form-item>
          <el-form-item label="昵称" :label-width="formLabelWidth">
            <el-input type="text" v-model="bjnickname"></el-input>
          </el-form-item>
          <el-form-item label="手机号" :label-width="formLabelWidth">
            <el-input type="text" v-model="bjphone"></el-input>
          </el-form-item>
          <el-button @click="bj = false">取消编辑</el-button>
          <el-button type="button" @click="bjaxios">确认编辑</el-button>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      bj: false,
      bjusername: "",
      bjnickname: "",
      bjphone: "",
      bjtokenid: "",
      muhu: "",
      fax: "",
      nickname: "",
      email: "",
      phone: "",
      username: "",
      oldpass: "",
      newpasss: "",
      newpass: "",
      imgsrc: "/api/image/start.jpg",
      dialogFormVisible: false,
      upmm: false,
      sid: parseInt(sessionStorage.getItem("_id")),
      tableData: [],
      formLabelWidth: "120px"
    };
  },
  methods: {
    randomNum(max, min) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    handleClick(row) {
      this.bj = true;
      this.bjusername = row.username;
      this.bjtokenid = row.tokenId;
      this.bjnickname = row.nickname;
      this.bjphone = row.phone;
    },
    bjaxios() {
      this.$Axios({
        url: "/api/backstage/newtest?type=bj",
        method: "post",
        data: {
          username: this.bjusername,
          tokenId: this.bjtokenid,
          nickname: this.bjnickname,
          phone: this.bjphone
        }
      }).then(result => {

        if (result.data.success) {
          this.bj=false;
          this.findx();
        }
      });
    },
    quit() {
      if (confirm("您确定要退出登录吗")) {
        sessionStorage.removeItem("_id");
        // this.$router.push("home");
        location.reload();
      }
    },
    svr() {
      console.log(this.fax);
      this.$Axios({
        url: "/api/backstage/newtest?type=img",
        method: "post",
        headers: {
          "Content-Type": "multipart/form-data"
          // "Content-Type":"application/X-www-form-urlencoded"
        },
        data: {
          file: this.fax
        }
      }).then(result => {
        console.log(result);
      });
    },
    deletes(row) {
      console.log(row.tokenId);
      this.$Axios({
        url: "/api/backstage/newtest?type=des",
        method: "post",
        data: {
          tokenId: row.tokenId
        }
      }).then(result => {
        if (result.data.success) {
          this.findx();
        }
      });
    },
    uppass() {
      if (this.newpass === this.newpasss) {
        this.$Axios({
          url: "/api/backstage/newtest?type=uppass",
          method: "post",
          data: {
            sid: this.sid,
            oldpass: this.oldpass,
            newpass: this.newpass
          }
        }).then(result => {

          if (result.data.success) {
            alert("修改密码成功");
            this.upmm = false;
          }
        });
      } else {
        alert("两次密码输入不一致，请重新输入");
        this.newpass = "";
        this.newpasss = "";
      }
    },
    findx() {
      this.$Axios({
        url: "/api/backstage/newtest?type=findx",
        method: "post"
      }).then(result => {
        this.tableData = [];
        var datas = result.data.data;
        datas.forEach(item => {
          if (item.isOk != "ok") {
            this.tableData.push(item);
          }
        });
      });
    },
    find() {
      if (this.muhu == "") {
        this.findx();
      } else {
        this.$Axios({
          url: "/api/backstage/newtest?type=find",
          method: "post",
          data: {
            username: this.muhu
          }
        }).then(result => {
          this.tableData = [];
          this.tableData.push(result.data.data[0]);
        });
      }
    },
    newuser() {
      this.$Axios({
        url: "/api/backstage/newtest?type=newuser",
        method: "post",
        data: {
          username: this.muhu
        }
      }).then(result => {
        if (result.data.success) {
          // location.reload();
          this.findx();
        } else {
          alert("该用户已经存在，无法添加");
          this.muhu = "";
        }
      });
    }
  },
  mounted() {
    if (!sessionStorage.getItem("_id")) {
      alert("您还没有登录，请返回登录界面登录");
      this.$router.push("/");
    }
    this.$Axios({
      url: "/api/backstage/newtest?type=home",
      method: "post",
      data: {
        sid: parseInt(sessionStorage.getItem("_id"))
      }
    }).then(result => {
      // console.log(sessionStorage.getItem("_id"));
      // console.log(result);
      var data = result.data.data[0];

      if (data) {
        if (data.nickname) {
          this.nickname = data.nickname;
        } else {
          this.nickname = data.username;
        }
        this.email = data.email;
        this.username = data.username;
        this.phone = data.phone;
      }
    });
    this.findx();
  }
};
</script>
<style lang="">
* {
  margin: 0;
  padding: 0;
}
body {
  background: white;
}
.hea-right {
  width: 50%;
  float: right;
}
.header {
  background-color: rgb(84, 92, 100);
  height: 60px;
  /* overflow: hidden; */
}
.ico {
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin-left: 10px;
}
.menutwo {
  padding: 0 10%;
}
.headtwo {
  padding: 0 35px;
}
.brd {
  height: 40px;
  line-height: 40px;
  padding-left: 30px;
}
.find {
  width: 100%;
  height: 50px;
  background: #efefef;
  line-height: 50px;
}
.findbox{
  padding: 0 20px;
}
.find .el-button {
  margin: 0 50px;
  min-width: 100px;
}
.bj{
  color: black;
}
</style>