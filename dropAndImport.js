var util = require('util');
//var MSDB=require('../REST/lib/MSDB').MSDB;
var mongo = require('mongoskin');
var ObjectID=require('mongoskin').ObjectID;
var db;
//db = mongo.db('mongodb://ericyang:deansoft@SG-deansoft-1225.servers.mongodirector.com:27017/MS?auto_reconnect');
//mydb=new MSDB('localhost:27017/MS?auto_reconnect');
//db=mongo.db('localhost:27017/MS?auto_reconnect');
db=mongo.db("mongodb://ericyang:deansoft@SG-karaokecloud-1431.servers.mongodirector.com:27017/MS?auto_reconnect")
console.log("drop")
var fs=require("fs");
var ary=[];
db.dropCollection("devsongs", function(err,data){
if(err)throw err
console.log("finish")
})
