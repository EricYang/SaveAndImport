//取得process參數
var file_name=process.argv[2];
var file_type=process.argv[3];
var path='../../DbImport/'
console.log("show file_name:"+file_name);
console.log("show file_type:"+file_type);
//讀csv檔,合併DB再另存json
var newData
var updateData=[]
var fs=require('fs');
var func=require("./lib/csv2json.js");
var target_path=path+file_name
console.log("path:"+target_path)
fs.readFile(target_path, function (err, data) {
  if (err) {
  console.log(err)
  throw err;
  }
    //console.log(data.toString());
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
var db;
//db = mongo.db('mongodb://ericyang:deansoft@SG-deansoft-1225.servers.mongodirector.com:27017/MS?auto_reconnect');
//mydb=new MSDB('localhost:27017/MS?auto_reconnect');
//db=mongo.db('localhost:27017/MS?auto_reconnect');
db=mongo.db("mongodb://ericyang:deansoft@SG-karaokecloud-1431.servers.mongodirector.com:27017/MS?auto_reconnect")
var fs=require("fs");
var ary=[];
var readNowData=function(){
db.collection("songs").find({}).toArray(function(err1,nowData){
    var a=0
    for(var i in newData){
    var obj={}
    var id=String(newData[i]["Cnumber"])+"-C"
       obj['InternalID']=id;
       obj['Title']=newData[i]["songTitleDisplay"];
       obj['ArtistName']=newData[i]["artistDisplay"];
       obj["GenreName"]=newData[i]["genreOne"];
       obj["KeyName"]=newData[i]["songKey"];
       obj["ManufacturerCode"]=newData[i]['Mfg'];
       if(obj["GenreName"]=="")obj["GenreName"]="Misc";
       
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
        obj["DateUpdated"]={"$date":now['DateUpdated'].getTime()}
        obj["DateAdded"]={"$date":now['DateAdded'].getTime()}
       }else{
        obj['Duration']=0;
        obj['PlayCount']=0;
        obj["DateUpdated"]={ "$date" :new Date().getTime()};
        obj["DateAdded"]={"$date" :new Date().getTime()};
       }
       updateData.push(obj)
       console.log(util.inspect(obj,false,null));
       console.log(a)
       a++
    }
    //db.collection("usongs").insert(updateData,function(err,data){})
    console.log("finish")
 fs.writeFileSync("./songs.json",JSON.stringify(updateData))
})

}
