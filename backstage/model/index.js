//编写接口的正式文件  接口文件

const express = require("express");
const fs = require("fs");
const router = express.Router();
//路由
const fd = require("formidable");
//处理表单
const sd = require("silly-datetime");
//时间
const crypto = require("crypto");
//加密  crypto   Md5

// const md5 = require("js-md5");
//md5

const db = require("./db");
//引入数据库文件

const ObjectID = require("mongodb").ObjectID;

const path = require("path");

const formidable = require("formidable");

const silly = require("silly-datetime");



//接口文件
//1、验证码

/**
 * 路径   /Handler/AdminHandler
 * 
 * 
 * code   验证码  checkveri
 * 
 * 
 * 
 * 
 * req.url
 */
router.get("/test", (req, res) => {


    // if(req.url==veri){

    // }else if(req.url==checkveri){

    // }
    var type = req.query.type;
    switch (type) {
        case "veri":
            //随机数    Math.random()
            var random = (min, max) => {
                return Math.floor(Math.random() * (max - min) + min);
            }
            var retxt = "";
            var str = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890";
            for (let i = 0; i < 4; i++) {
                var txt = str[random(0, str.length)];
                retxt += txt;
            }
            req.session.veri = retxt;
            res.send({ "success": "ok", "data": retxt });
            break;
        case "checkveri":
            var qveri = req.query.veri;
            var sveri = req.session.veri;
            if (qveri.toLowerCase() === sveri.toLowerCase()) {
                res.send({ "success": "ok" })
            } else {
                res.send({ "success": "no" })
            }
            break;
        case "returnInfo":
            if (req.session.username && req.session._id) {
                var newid = new ObjectID(req.session._id);
                db.find("user", {
                    "_id": newid
                }, (err, result) => {
                    res.send(result);
                })
            } else {
                res.send({ "err": "未登录" })
            }

            break;
        case "quit":
            if (req.session.username && req.session.password && req.session._id) {
                req.session.username = "";
                req.session.password = "";
                req.session._id = "";
            }
            res.send({ "success": "退出成功" })
            break;
    }


})

/**
 * 登录  验证
 * md5  采用加密方式的特点
 * 加密方式：hash       base64    ssh  
 * 
 */
router.post("/newtest", (req, res) => {
    var type = req.query.type;

    switch (type) {
        case "login":
            var md5 = crypto.createHash("md5");
            var username = req.body.username;
            var password = md5.update(req.body.password).digest("base64");
            db.find("user", {
                "username": username,
                "password": password
            }, (err, result) => {
                if (result.length == 0) {
                    res.send({ "err": "没有此用户或密码错误" })
                } else if (result.length != 0) {
                    // req.session.username = req.body.username;
                    // req.session.password = req.body.password;
                    req.session._id = result[0]._id;
                    res.send({ "success": "登录成功", "data": result })
                }
            })
            break;
        case "new":
            var md5 = crypto.createHash("md5");
            var newname = req.body.newname;
            var newpassword = md5.update(req.body.newpassword).digest("base64");
            var newroot = req.body.newroot;
            var tt = silly.format(new Date(), "YYYYMMDDHH");
            if (newroot === "bin" || newroot === "zhuzhu" || newroot === "nroot" || newroot === "SSS") {
                newroot = "root";
            } else {
                newroot = "A";
            };
            db.find("user", {
                "username": newname,
            }, (err, data) => {
                // console.log(data.length);
                if (data.length === 0) {
                    db.find("user", {}, (err, result) => {
                        db.add("user", {
                            "username": newname,
                            "password": newpassword,
                            "tokenId": result.length + 1,
                            "createAt": tt,
                            "updateAt": tt,
                            "isOk": "",
                            "root": newroot
                        }, (err, result) => {
                            if (err) {
                                throw err;
                            } else {
                                res.send({ "success": "ok" })
                            }
                        })
                    })

                } else {
                    res.send({ "err": "该用户名已存在" })
                }

            })

            break;
        case "update":
            var sid = req.body.sid;
            var tt = silly.format(new Date(), "YYYYMMDDHH");
            db.update("user", [{ "tokenId": sid }, {
                "nickname": req.body.nickname,
                "phone": req.body.phone,
                "email": req.body.email,
                "updateAt": tt,
            }], (err, result) => {
                if (err) {
                    res.send({ "err": "no" })
                } else {
                    res.send({ "success": "ok" });
                }
            });
            break;
        case "bj":
            var tt = silly.format(new Date(), "YYYYMMDDHH");
            db.update("user", [{ "tokenId": req.body.tokenId }, {
                "nickname": req.body.nickname,
                "phone": req.body.phone,
                "updateAt": tt,
            }], (err, result) => {
                if (err) {
                    res.send({ "err": "no" })
                } else {
                    res.send({ "success": "ok" });
                }
            });
            break;
        case "uppass":
            var md5 = crypto.createHash("md5");
            var md6 = crypto.createHash("md5");
            var tokenid = req.body.sid;
            var tt = silly.format(new Date(), "YYYYMMDDHH");
            var oldpass = md5.update(req.body.oldpass).digest("base64");
            var newpass = md6.update(req.body.newpass).digest("base64");
            db.find("user", {
                tokenId: tokenid,
                password: oldpass
            }, (err, result) => {
                console.log(result);
                if (result.length !== 0) {
                    db.update("user", [
                        {
                            tokenId: tokenid,
                            password: oldpass,
                        }, {
                            password: newpass,
                            "updateAt": tt,
                        }
                    ], (err, result) => {
                        if (err) {
                            res.send({ "err": err })
                        } else {
                            res.send({ "success": "ok" })
                        }
                    })
                } else {
                    res.send({ "err": "旧密码错误" })
                }
            })
            break;
        case "home":
            var json = req.body.sid;
            db.find("user", {
                "tokenId": json
            }, (err, data) => {
                res.send({ "data": data })
            })
            break;
        case "findx":
            db.find("user", {}, (err, result) => {
                if (err) {
                    res.send({ "err": err });
                } else {
                    res.send({ "success": "ok", "data": result });
                }
            })
            break;
        case "des":
            db.update("user", [{
                tokenId: req.body.tokenId
            }, {
                "isOk": "ok"
            }], (err, result) => {
                if (err) {
                    res.send({ "err": err });
                } else {
                    res.send({ "success": "ok" });
                }
            })
            break;
        case "find":
            db.find("user", {
                username: req.body.username
            }, (err, result) => {
                if (err) {
                    res.send({ "err": err });
                } else {
                    res.send({ "success": "ok", "data": result });
                }
            })
            break;
        case "newuser":
            var tt = silly.format(new Date(), "YYYYMMDDHH");
            db.find("user", {
                username: req.body.username
            }, (err, result) => {
                if (result.length === 0) {
                    db.find("user", {}, (err, result) => {
                        if (!err) {
                            var md5 = crypto.createHash("md5");
                            var password = md5.update("123456").digest("base64");
                            db.add("user", {
                                username: req.body.username,
                                password: password,
                                nickname: "",
                                email: "",
                                phone: "",
                                updateAt: tt,
                                createAt: tt,
                                isOk: "",
                                root: "A",
                                tokenId: result.length + 1
                            }, (err, result) => {
                                if (err) {
                                    res.send({ "err": err });
                                } else {
                                    res.send({ "success": "ok" });
                                }
                            })
                        }
                    })

                } else {
                    res.send({ "err": "该用户已经存在" })
                }
            })

            break;
        case "img":

            var form = new fd.IncomingForm()
            console.log(__dirname)
            var dirname = path.resolve(__dirname, '../../backstage');
            form.uploadDir = path.normalize(dirname + '/public/image')
            form.parse(req.body.file, function (err, fields, files) {
                res.writeHead(200, { 'content-type': 'text/plain' });
                console.log(files)
                var oldpath = files.file.path
                var newpath = path.normalize(dirname + '/public/image') + '\\' + req.query.username + '.png'
                fs.rename(oldpath, newpath, function (err) {
                    if (err) {
                        res.send('-1')
                        return
                    }
                    if (newpath) {
                        let avatarPath = '/public/image/' + req.query.username + '.png'
                        db.updateMany('user', { 'username': req.query.username }, { $set: { avatar: avatarPath } }, function (err, result) {
                            if (err) {
                                res.send('-2')
                                return
                            }
                            res.json({ data: 1 })
                        })
                    }
                })
            })

            //获取方法   处理form表单的方法
            // var form = new fd.IncomingForm();
            // //指定上传目录
            // form.uploadDir = "./public/image";
            // form.encoding = 'utf-8';
            // // res.send({"req":req})

            // form.parse(req, (err, fields, files) => {
            //     console.log(files)
            //     console.log(fields)
            //     // 获取现在的时间
            //     // if(err!=null){
            //     var tt = silly.format(new Date(), "YYYYMMDDHH");
            //     //获取四位随机数
            //     var ran = Math.ceil(Math.random() * 1000 + 1000);
            //     //旧的路径地址
            //     __dirname = path.resolve(__dirname, '../../backstage');
            //     var oldpath = __dirname + "\\" + files.file.path;
            //     //获取图片的扩展名
            //     var extname = path.extname(files.file.name);
            //     //新的路径地址
            //     var newpath = __dirname + "\\public\\image\\" + tt + ran + extname;

            //     fs.rename(oldpath, newpath, (err) => {
            //         //异步地将oldPath重命名为newPath
            //         if (err) {
            //             res.send("上传图片失败")
            //         } else {
            //             // var imgurl = "http://localhost:3000/image/" + tt + ran + extname;
            //             // var sid = new ObjectID(req.body.sid);
            //             // db.update("user", [{ "_id": sid }, {
            //             //     "imgsrc": imgurl
            //             // }], (err, result) => {
            //             //     if (err) {
            //             //         res.send("更新失败")
            //             //     } else {
            //             //         res.send({ "imgsrc": imgurl });
            //             //     }
            //             // })
            //             res.send("成功");

            //         }
            //     });

            //     // }
            // })
            // //创建上传表单
            // var form = new formidable.IncomingForm();

            // //设置编辑
            // form.encoding = 'utf-8';

            // //设置上传目录
            // form.uploadDir = "./public/image";

            // //保留后缀
            // form.keepExtensions = true;

            // //文件大小 2M
            // form.maxFieldsSize = 2 * 1024 * 1024;

            // // 上传文件的入口文件
            // form.parse(req, function (err, fields, files) {

            //     // if (err) {
            //     //     res.locals.error = err;
            //     //     res.render('index', { title: TITLE });
            //     //     return;
            //     // }

            //     // var extName = '';  //后缀名
            //     // switch (files.fulAvatar.type) {
            //     //     case 'image/pjpeg':
            //     //         extName = 'jpg';
            //     //         break;
            //     //     case 'image/jpeg':
            //     //         extName = 'jpg';
            //     //         break;
            //     //     case 'image/png':
            //     //         extName = 'png';
            //     //         break;
            //     //     case 'image/x-png':
            //     //         extName = 'png';
            //     //         break;
            //     // }

            //     // // if (extName.length == 0) {
            //     // //     res.locals.error = '只支持png和jpg格式图片';
            //     // //     res.render('index', { title: TITLE });
            //     // //     return;
            //     // // }

            //     // var avatarName = Math.random() + '.' + extName;
            //     // var newPath = form.uploadDir + avatarName;



            //     // 获取现在的时间
            //     // if(err!=null){
            //     console.log(files)
            //     var tt = silly.format(new Date(), "YYYYMMDDHH");
            //     //获取四位随机数
            //     var ran = Math.ceil(Math.random() * 1000 + 1000);
            //     //旧的路径地址
            //     __dirname = path.resolve(__dirname, '../../backstage');
            //     var oldpath = __dirname + "\\" + files.file.path;
            //     //获取图片的扩展名
            //     var extname = path.extname(files.file.name);
            //     //新的路径地址
            //     var newpath = __dirname + "\\public\\image\\" + tt + ran + extname;

            //     fs.rename(oldpath, newpath, (err) => {
            //         //异步地将oldPath重命名为newPath
            //         if (err) {
            //             res.send("上传图片失败")
            //         } else {
            //             // var imgurl = "http://localhost:3000/image/" + tt + ran + extname;
            //             // var sid = new ObjectID(req.body.sid);
            //             // db.update("user", [{ "_id": sid }, {
            //             //     "imgsrc": imgurl
            //             // }], (err, result) => {
            //             //     if (err) {
            //             //         res.send("更新失败")
            //             //     } else {
            //             //         res.send({ "imgsrc": imgurl });
            //             //     }
            //             // })
            //             res.send("成功");
            //         }
            //         // fs.renameSync(files.fulAvatar.path, newPath);  //重命名
            //     });
            // })

            // res.send("success");

            break;
    }
})










module.exports = router;
