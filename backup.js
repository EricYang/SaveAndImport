var fs=require("fs");
var util=require("util");
var cmd=require("./routes/cmd.js").cmd;
var backup_path="../../mongoexport/";
var kc_host="SG-karaokecloud-1431.servers.mongodirector.com"
var wesing_host="SG-deansoft-1225.servers.mongodirector.com"
var ary=[{host:"SG-karaokecloud-1431.servers.mongodirector.com",db:"MS",prj_name:"kc",collection:"songs"},
{host:"SG-deansoft-1225.servers.mongodirector.com",db:"MS",prj_name:"wesing",collection:"artist"},
{host:"SG-deansoft-1225.servers.mongodirector.com",db:"MS",prj_name:"wesing",collection:"songs"},
{host:"SG-deansoft-1225.servers.mongodirector.com",db:"MS",prj_name:"wesing",collection:"esongs"},
    ]
var Today=new Date()
    cmd=new cmd();
function Appendzero(obj)
{
    if(obj<10) return "0" +""+ obj;
    else return obj;

}

var todayStr=Today.getFullYear() +''+ Appendzero(Today.getMonth()+1) +''+ Appendzero(Today.getDate())
var backup_path_today=backup_path+todayStr


fs.exists(backup_path_today, function (exists) {
        if(!exists){
        fs.mkdirSync(backup_path_today)
        fs.mkdirSync(backup_path_today+"/wesing")
        fs.mkdirSync(backup_path_today+"/kc")
        run();
        }
        })


var exportCollection=function(obj){
    cmd.exec("mongoexport -h "+obj.host+" -u ericyang -p deansoft -d "+obj.db+" -c "+obj.collection+" -o "+backup_path_today+"/"+obj.prj_name+"/"+obj.collection+".json",function(data){
            console.log(data)
            })
}
var run=function(){
    for(var i in ary){  
        exportCollection(ary[i])
    }
}

