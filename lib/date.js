var Appendzero=function(obj)
{
    if(obj<10) return "0" +""+ obj;
    else return obj;

}
exports.today=function(){
var Today=new Date()
var todayStr=Today.getFullYear() +''+ Appendzero(Today.getMonth()+1) +''+ Appendzero(Today.getDate())
return todayStr;
}
