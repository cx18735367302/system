// db.js
var MongoClient = require("mongodb").MongoClient;
//创建客户端
var setting = require("./setting");
//接收到数据库路径
function connectDB(callback) {
    var url = setting.url;
    MongoClient.connect(url, (err, db) => {
        var dbName=db.db(setting.dbName);
        if (err) {
            callback(err, null);
            return
        };
        callback(err, db,dbName)
    })
}
exports.add=function(collectionName,json,callback){
    // collectionName  集合名称
    //json  数据
    //callback 回调函数
    connectDB((err,db,dbName)=>{
        dbName.collection(collectionName).insert(json,(err,result)=>{
            callback(err,result);
            db.close()
        })
    })
};
exports.find=function(collectionName,json,callback){
    connectDB((err,db,dbName)=>{
        dbName.collection(collectionName).find(json).toArray((err,result)=>{
            callback(err,result);
            db.close()
        })
    })
};
exports.update=function(collectionName,arr,callback){
    connectDB((err,db,dbName)=>{
        dbName.collection(collectionName).update(arr[0],{$set:arr[1]},(err,result)=>{
            callback(err,result);
            db.close()
        })
    })
}
exports.remove=function(collectionName,json,callback){
    connectDB((err,db,dbName)=>{
        dbName.collection(collectionName).remove(json,(err,result)=>{
            callback(err,result);
            db.close()
        })
    })
}