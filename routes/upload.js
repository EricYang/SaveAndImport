var fs = require('fs');
var child_process=require('child_process');
var cmd=require('../lib/cmd.js').cmd;
var util=require("util")
var date=require("../lib/date.js")
var path='../../DbImport/'
var file_org_name,file_type
var target_path
var user_ary={
kevin:"Admin12@deansoft",
ericyang:"deansoft"
}
exports.uploadFile=function(req,res){
    console.log("req.files",util.inspect(req.files, false, null));
    // get the temporary location of the file
    var tmp_path = req.files.fileToUpload.path;
    file_org_name=String(req.files.fileToUpload.name)
    file_type=String(req.files.fileToUpload.type)
    // set where the file should actually exists - in this case it is in the "images" directory
    var message,filename=""
    if(file_type.search(/json/)!=-1){
        message="your file is json"
        file_type=1
    }else if(file_type.search(/csv/)!=-1){
         message="your file is csv"
         file_type=0
    }

    target_path = path + req.files.fileToUpload.name;
    console.log("path:"+target_path)
    // move the file from the temporary location to the intended location
    fs.rename(tmp_path, target_path, function(err) {
            if (err) {
             res.render("error",{Name:req.files.fileToUpload.name,Message:message})
            throw err
            };
            // delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted files
            fs.unlink(tmp_path, function() {
                var result={
                    err:err,
                    msg:'File uploaded to: ' + target_path + ' - ' + req.files.fileToUpload.size + ' bytes'
                }
                res.render("import",{Name:req.files.fileToUpload.name,Message:message+" - "+req.files.fileToUpload.size + ' bytes',FileType:file_type,FileName:file_org_name})
                });
            });
};

exports.importDb=function(req,res){
    var user=req.body.username;
    var pwd=req.body.password;
    var filename=req.body.filename;
    cmd=new cmd();
    console.log(filename);
    //return    
    if(user_ary[user]==pwd){
        console.log("yes receive");
        cmd.exec("node readAndSave.js "+file_org_name+" "+file_type,function(data){
        console.log(data);
        res.send("reading... file:"+file_org_name)
        res.send("drop ")
        if(String(data).search(/finish/)!=-1){
            cmd.exec("node dropAndImport.js",function(data){
                 res.send("drop old collection....")
                 if(String(data).search(/finish/)!=-1){
                    cmd.exec("mongoimport -h SG-karaokecloud-1431.servers.mongodirector.com -u ericyang -p deansoft -d MS -c devsongs --file songs.json --jsonArray",function(data){
                            if(String(data).search(/imported/)!=-1){
                                    res.send('finish')
                            }

                 })
            }
        },{encoding: 'utf8',timeout: 0})
        }
        },{ encoding: 'utf8',timeout: 0,maxBuffer: 4000*1024,killSignal: 'SIGTERM',cwd: null,env: null })
    }
}


