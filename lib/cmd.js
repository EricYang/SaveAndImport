var child_process=require('child_process');
var util=require("util")
var cmd_host="-h localhost",
    cmd_db="-d MS",
    cmd_col="-c tkc",
    cmd_file="--file ../../mongoexport/songs.json"
    var cmd1={
func:"mongoimport",arg:[cmd_host,cmd_db,cmd_col,cmd_file]
    }
var cmd=function(){
}
cmd.prototype.spawn=function(cmd,callback){
    console.log("cmd",util.inspect(cmd, false, null));
    console.log("command");
    child = child_process.spawn(cmd.func,cmd.arg);
    child.stdout.setEncoding('utf8');
    child.stdout.on('data', function(data) {
            callback(data)
            });
}
cmd.prototype.exec=function(cmd,callback,option){
    console.log("cmd",util.inspect(cmd, false, null));
    console.log("command");
    child = child_process.exec(cmd,option)
    child.stdout.setEncoding('utf8');
    child.stdout.on('data', function(data) {
            callback(data)
            });
}
exports.cmd=cmd
