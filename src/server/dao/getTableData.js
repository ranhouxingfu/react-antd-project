/**
 * Created by pc on 2017/1/9.
 */

var mysql = require('../node-modules/mysql');
var mydb;
function mytable() {
    mydb = mysql.createConnection({//�������ݿ�����,�����Ƕ��󣬶���������һЩ����
        host: "localhost",
        user: "root",
        password: "123456",
        port: "3306",//���ݿ�˿ں�
        database: "project"
    })
    //�������ݿ�
    mydb.connect();//�������ݿ�
}
/*======��ȡ���ݿ���������=======*/
exports.getData = function (req, resp) {
    var revalue = req.query.value;
    //var reqpwd=req.query.pwd;
    mytable();
    mydb.query("select * from t_usertable", [revalue], function (err, data) {
        resp.send(data);//����data��ajax
    })
    mydb.end();//�ر����ݿ�
};
/*======ɾ������=============*/
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
            resp.send(getdata);//����data��ajax
        })
        mydb.end();//�ر����ݿ�
        //resp.send(data);//����data��ajax
    })
    //mydb.end();//�ر����ݿ�
}
/*=====��������================*/
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
            resp.send(data);//����data��ajax
        //}
    });
    mydb.end();//�ر����ݿ�
}