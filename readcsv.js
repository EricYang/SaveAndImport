//讀csv檔,合併DB再另存json
var newData
var updateData=[]
var fs=require('fs');
var func=require("./lib/csv2json.js");
var file_type=0;
var target_path="../../Documents/db_Kevin_1126.csv"
fs.readFile(target_path, function (err, data) {
  if (err) throw err;
   // console.log(data.toString());
    //console.log(func.CSV2JSON(data.toString()))
    if(file_type==0){
        newData=JSON.parse(func.CSV2JSON(data.toString()));
    }else if(file_type==1){
        newData=JSON.parse(data);
    }
    console.log("Data:"+util.inspect(newData[0],false,null))
    readNowData();
    });

var util = require('util');
//var MSDB=require('../REST/lib/MSDB').MSDB;
var mongo = require('mongoskin');
var ObjectID=require('mongoskin').ObjectID;
var db_local,db_dev,db_real
//db = mongo.db('mongodb://ericyang:deansoft@SG-deansoft-1225.servers.mongodirector.com:27017/MS?auto_reconnect');
//mydb=new MSDB('localhost:27017/MS?auto_reconnect');
db_local=mongo.db('localhost:27017/MS?auto_reconnect');
db_dev=mongo.db("mongodb://ericyang:deansoft@SG-karaokeclouddev-1366.servers.mongodirector.com:27017/MS?auto_reconnect")
db_real=mongo.db("mongodb://ericyang:deansoft@SG-karaokecloud-1431.servers.mongodirector.com:27017/MS?auto_reconnect")
var fs=require("fs");
var ary=[];
var readNowData=function(){
db_local.collection("kc").find({}).toArray(function(err1,nowData){
    for(var i in newData){
    var obj={}
    var id=String(newData[i]["Cnumber"])+"-C"
       obj['InternalID']=id;
       obj['Title']=newData[i]["songTitleDisplay"];
       obj['ArtistName']=newData[i]["artistDisplay"];
       obj["GenreName"]=newData[i]["genreOne"];
       obj["KeyName"]=newData[i]["songKey"];
       obj["ManufacturerCode"]=newData[i]['Mfg'];
       if(obj["GenreName"]=="")obj["GenreName"]="Misc"
       var now;
       for(var j=0 ;j<nowData.length;j++){
       if(nowData[j]["InternalID"]==id){
            now=nowData[j]
            j=nowData.length;
         }
       }
       if(now){
        obj['Duration']=now['Duration'];
        obj['PlayCount']=Number(now['PlayCount']);

        obj["DateUpdated"]=now['DateUpdated']//{"$date":now['DateUpdated'].getTime()}
        obj["DateAdded"]=now['DateAdded']//{"$date":now['DateAdded'].getTime()}
       }else{
        obj['Duration']=0;
        obj['PlayCount']=0;
        obj["DateUpdated"]=new Date()//{ "$date" :new Date().getTime()};
        obj["DateAdded"]=new Date()//{"$date" :new Date().getTime()};
       }
       updateData.push(obj)
       console.log(util.inspect(obj,false,null));
    }
    //db_local.collection("kfc").insert(updateData,function(err,data){})
    db_dev.collection("songs").insert(updateData,function(err,data){})
    db_real.collection("songs").insert(updateData,function(err,data){})
 //fs.writeFileSync("songs.json",JSON.stringify(updateData))
})

}
