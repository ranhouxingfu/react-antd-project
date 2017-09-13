/**
 * Created by pc on 2017/1/9.
 */

var mysql = require('../node-modules/mysql');
var mydb;
function mytable() {
    mydb = mysql.createConnection({//创建数据库连接,传的是对象，对象里面是一些属性
        host: "localhost",
        user: "root",
        password: "123456",
        port: "3306",//数据库端口号
        database: "project"
    })
    //操作数据库
    mydb.connect();//连接数据库
}
/*======获取数据库的相关数据=======*/
exports.getData = function (req, resp) {
    var revalue = req.query.value;
    //var reqpwd=req.query.pwd;
    mytable();
    mydb.query("select * from t_usertable", [revalue], function (err, data) {
        resp.send(data);//返回data给ajax
    })
    mydb.end();//关闭数据库
};
/*======删除数据=============*/
exports.deleteData = function (req, resp) {
    var revalue = req.body.index;
    mytable();
    mydb.query("DELETE FROM t_usertable WHERE id = ? ", [parseInt(revalue)], function (err, data) {
        mydb.query("select * from t_usertable", [], function (err, data) {
            var getdata = [];
            for (var i = 0; i < data.length; i++) {
                getdata.push(
                    {
                        key: data[i].id,
                        username: data[i].username,
                        userage: data[i].userage,
                        useraddress: data[i].useraddress
                    }
                )
            }
            resp.send(getdata);//返回data给ajax
        })
        mydb.end();//关闭数据库
        //resp.send(data);//返回data给ajax
    })
    //mydb.end();//关闭数据库
}
/*=====新增数据================*/
exports.addData=function(req,resp){
    var getValue=req.body;
    var data=[];
    data.push(getValue.username);
    data.push(getValue.age);
    data.push(getValue.address);
    data.push(getValue.remark);
    mytable();
    mydb.query("insert into t_usertable(username,userage,useraddress,remark) values (?,?,?,?)",data,function(err,data){
        //if(data !='' ||data !=undefined || data !=null){
            resp.send(data);//返回data给ajax
        //}
    });
    mydb.end();//关闭数据库
}