//项目执行文件


const express = require("express");
const bodyparser = require("body-parser");
//处理post请求
const cookieParser = require("cookie-parser");
//处理cookie
const flash=require("connect-flash");
//处理flash信息
const morgan = require("morgan");
//处理错误日志
const session = require("express-session");
//保存session信息
const path = require("path");
//path  路径模块   
const app = express();
const Index=require("./model/index");
const db = require("./model/db");


app.use(express.static(path.join(__dirname, "public")));
//path.join   拼接  处理多余的/   静态资源目录

//跨域处理   配置参数   app.all()
//cors   get post
// app.use(express.favicon());
app.all("*", (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Header", "Content-type");
    res.header("Access-Control-Allow-methods", "GET POST PUT DELETE OPTIONS PATCH");
    res.header("Access-Control-Max-Age", 99999999);//过期时间

    //允许接收cookie信息
    next();

});

app.use(bodyparser.json()); //处理json
app.use(bodyparser.urlencoded({ extended: false }));  //处理字符串
//允许接收post请求

app.use(cookieParser());
//允许接收cookie

app.use(flash());

app.use(morgan("dev"));
//错误处理日志  dev pro
app.use(session({
    "name":"fcht", //session的名称
    "secret":"fcht",//设置加密字符串
    "cookie":{
        "maxAge":999999999999999999//失效时间
    },
    "resave":false,//是否每次重新获取session
    saveUninitialized:true//是否每次都初始化    将session存储到内存中
}));
app.use("/backstage",Index);
//处理session


module.exports = app;



