/**
 * Created by pc on 2017/1/17.
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
};

//新增订单数据
exports.postOrderValue=function(req,resp){
    var value=req.body;
    var data=[];
    var totalPrice=parseFloat(req.body.unitprice)*parseFloat(req.body.number);
    data.push(req.body.buyer);
    data.push(req.body.phonenum);
    data.push(req.body.address);
    data.push(req.body.receivingTime);
    data.push(req.body.delivery);
    data.push(req.body.goods);
    data.push(parseFloat(req.body.unitprice));
    data.push(parseFloat(req.body.number));
    data.push(totalPrice);
    data.push(req.body.standard);
    data.push(req.body.remark);
    mytable();
    mydb.query("insert into t_orderlist(buyer,phonenum,address,receivingTime,delivery,goods,unitprice,number,totalPrice,standard,remark) values (?,?,?,?,?,?,?,?,?,?,?)",data,function(err,data){
        console.log(err);
        resp.send(data);
    })
}
//获取所有订单数据
exports.getOrderData=function(req,resp){
    mytable();
    mydb.query("select * from t_orderlist",[],function(err,data){
        resp.send(data);
    })
}
//点击编辑获取的单个订单数据
exports.getOneOrderData=function(req,resp){
    var id=req.query.id;
    mytable();
    mydb.query("select * from t_orderlist where id=?",[id],function(err,data){
        resp.send(data);
    })
}
//编辑订单数据
exports.updateOrderData=function(req,resp){
    var id=req.body.id;
    var buyer=req.body.buyer;
    var phonenum=req.body.phonenum;
    var address=req.body.address;
    var receivingTime=req.body.receivingTime;
    var delivery=req.body.delivery;
    var goods=req.body.goods
    var unitprice=parseFloat(req.body.unitprice);
    var number=parseInt(req.body.number);
    var  totalPrice=unitprice*number;
    var standard=req.body.standard;
    var remark=req.body.remark;
    mytable();
    mydb.query("update  t_orderlist  set buyer=?,phonenum=?,address=?,receivingTime=?,delivery=?,goods=?,unitprice=?,number=?,totalprice=?,standard=?,remark=? WHERE id=?",[buyer,phonenum,address,receivingTime,delivery,goods,unitprice,number,totalPrice,standard,remark,id],function(err,data){
        resp.send(data);
    })
    mydb.end();
}
//删除订单数据
exports.delete_order_data=function(req,resp){
    var id=req.body.id;
    mytable();
    mydb.query("delete from t_orderlist where id=?",[id],function(err,data){
        mydb.query("select * from t_orderlist", [], function (err, data) {
            var getdata = [];
            for (var i = 0; i < data.length; i++) {
                getdata.push(
                    {
                        key: data[i].id,
                        buyer: data[i].buyer,
                        phonenum: data[i].phonenum,
                        address: data[i].address,
                        receivingTime: data[i].receivingTime,
                        delivery: data[i].delivery,
                        goods: data[i].goods,
                        unitprice: data[i].unitprice,
                        number: data[i].number,
                        totalPrice: data[i].totalprice,
                        standard: data[i].standard,
                        remark: data[i].remark,
                    }
                )
            }
            resp.send(getdata);//返回data给ajax
        })
        mydb.end();
    })
}