/**
 * Created by pc on 2017/1/11.
 */
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
exports.getgoods_description_data = function (req, resp) {
    var revalue = req.query.value;
    //var reqpwd=req.query.pwd;
    mytable();
    mydb.query("select * from t_goodsdescription", [revalue], function (err, data) {
        resp.send(data);//返回data给ajax
    })
    mydb.end();//关闭数据库
};
exports.delete_goods_description = function (req, resp) {
    var revalue = req.body.index;

    mytable();
    mydb.query("DELETE FROM t_goodsdescription WHERE id = ? ", [parseInt(revalue)], function (err, data) {
        mydb.query("select * from t_goodsdescription", [], function (err, data) {
            var goodsdata = [];
            for (var i = 0; i < data.length; i++) {
                goodsdata.push(
                    {
                        key: data[i].id,
                        name: data[i].g_name,
                        description: data[i].g_goodsdescription,
                        order: data[i].g_order
                    }
                )
            }
            resp.send(goodsdata);//返回data给ajax
        })
        mydb.end();//关闭数据库
        //resp.send(data);//返回data给ajax
    })
    //mydb.end();//关闭数据库
}