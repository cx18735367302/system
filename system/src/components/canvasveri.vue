<template >
  <div>
    <canvas id="canvas" width="120" height="30" v-on:click="getPic"></canvas>
  </div>
</template>
<script>
export default {
  name: "veri",
  data() {
    return {
      canvas: "",
      //获取canvas元素
      ctx: "",
      //绘图环境
      width: "",
      //canvas的宽度
      height: "",
      //canvas的高度
      text: ""
      //保存请求到的验证码  
    };
  },
  methods: {
    randomNum(max, min) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    },
    randomColor(max, min) {
      var r = this.randomNum(max, min);
      var g = this.randomNum(max, min);
      var b = this.randomNum(max, min);
      return "rgb(" + r + "," + g + "," + b + ")";
    },
    chooseVeri() {
      this.ctx.clearRect(0, 0, this.width, this.height);
      //清空之前的矩形，释放空间

      this.ctx.fillStyle = this.randomColor(250, 170);
      this.ctx.fillRect(0, 0, this.width, this.height);

      //   var str="qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890";
      //定义验证码字符

      //生成随机字符
      for (let i = 0; i < this.text.length; i++) {
        var zf = this.text[i];
        //随机获取字符并赋值给zf
        this.ctx.fillStyle = this.randomColor(160, 60);
        //定义自动生成的验证字符的颜色
        this.ctx.font = this.randomNum(30, 15) + "px SimHei";
        //定义自动生成验证字符的大小 字体
        this.ctx.fillText(
          zf,
          30 * i + this.randomNum(12, 5),
          this.randomNum(this.height, 15)
        );
        //字体填充
        //   this.text+=zf;
      }

      //绘制干扰线条
      for (let i = 0; i < 50; i++) {
        this.ctx.beginPath();
        //绘制干扰线条路径开始
        this.ctx.moveTo(
          this.randomNum(this.width, 0),
          this.randomNum(this.width, 0)
        );
        //随机定义起始路径
        this.ctx.lineTo(
          this.randomNum(this.width, 0),
          this.randomNum(this.width, 0)
        );
        //随机定义结束路径
        this.ctx.strokeStyle = this.randomColor(160, 100);
        //随机定义路径颜色
        this.ctx.stroke();
        //绘制干扰线条路径结束
      }

      //绘制干扰点
      for (let i = 0; i < 10; i++) {
        this.ctx.beginPath();
        //绘制干扰点路径开始
        this.ctx.arc(
          this.randomNum(this.width, 0),
          this.randomNum(this.height, 0),
          this.randomNum(5, 1),
          0,
          2 * Math.PI
        );
        //绘制干扰点
        //定义X,Y,Z,0,完整的圆
        this.ctx.strokeStyle = this.randomColor(160, 60);
        //定义干扰点的颜色
        this.ctx.stroke();
        //绘制干扰点路径结束
      }
    },
    getPic() {
      this.$Axios({
        url: "/api/backstage/test?type=veri",
        method: "get"
      }).then(result => {
        this.text = result.data.data;
        this.chooseVeri();
      });
    }
  },
  mounted() {
    this.canvas = document.getElementById("canvas");
    //获取canvas元素

    this.ctx = this.canvas.getContext("2d");
    //绘图环境

    this.width = this.canvas.width;
    this.height = this.canvas.height;

    this.ctx.fillStyle = this.randomColor(160, 60);
    //定义自动生成的验证字符的颜色
    this.ctx.font = "20px SimHei";
    this.ctx.fillText("点 击 此 处", 5, 20);
    //   this.chooseVeri();
  }
};
</script>
<style lang="">
#canvas {
  border: 1px solid white;
  cursor: pointer;
}
</style>