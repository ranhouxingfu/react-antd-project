/**
 * Created by pc on 2017/1/9.
 */
var mysql=require('../node-modules/mysql');
var mydb;
function mytable(){
    mydb=mysql.createConnection({//创建数据库连接,传的是对象，对象里面是一些属性
        host:"localhost",
        user:"root",
        password:"123456",
        port:"3306",//数据库端口号
        database:"project"
    })
    //操作数据库
    mydb.connect();//连接数据库
}
/*======获取数据库的相关数据=======*/
exports.postFormValue=function(req,resp){
    var nickname=req.body.nickname;
    var email=req.body.email;
    var password=req.body.password;
    var phone=req.body.phone;
    var capital=req.body.capital;
    var city=req.body.city;
    var street=req.body.street;
    var birthday=req.body.birthday;
    var data=[];
    data.push(email);
    data.push(password);
    data.push(nickname);
    data.push(birthday);
    data.push(capital);
    data.push(city);
    data.push(street);
    data.push(phone);
    mytable();
    mydb.query("insert into t_userMessage(email,pwd,username,birthday,capital,city,street,phonenum) values (?,?,?,?,?,?,?,?)",data,function(err,data){
        resp.send(data);//返回data给ajax
    })
    mydb.end();//关闭数据库
}
//初始化表单值
exports.getdefaultformValue=function(req,resp){
    var id=req.query.id;
    mytable();
    mydb.query("select * from t_usertable where id=?", [id], function (err, data) {
        resp.send(data);//返回data给ajax
    })
    mydb.end();//关闭数据库
}
//刷新数据
exports.updatetableData=function(req,resp){
    var id=req.body.id;
    var username=req.body.username;
    var userage=req.body.age;
    var useraddress=req.body.address;
    var remark=req.body.remark;
    mytable();
    mydb.query("update  t_usertable  set username=?,userage=?,useraddress=?,remark=? WHERE id=?",[username,userage,useraddress,remark,id],function(err,data){
        resp.send(data);
    });
}