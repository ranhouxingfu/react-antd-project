/**
 * Created by pc on 2017/1/11.
 */
/**
 * Created by pc on 2017/1/11.
 */
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
exports.getgoods_list_data = function (req, resp) {
    var revalue = req.query.value;
    //var reqpwd=req.query.pwd;
    mytable();
    mydb.query("select * from t_goodslist", [revalue], function (err, data) {
        resp.send(data);//����data��ajax
    })
    mydb.end();//�ر����ݿ�
};
exports.delete_goodslist = function (req, resp) {
    var revalue = req.body.index;
    mytable();
    mydb.query("DELETE FROM t_goodslist WHERE id = ? ", [parseInt(revalue)], function (err, data) {
        mydb.query("select * from t_goodslist", [], function (err, data) {
            var goodsdata = [];
            for (var i = 0; i < data.length; i++) {
                goodsdata.push(
                    {
                        key: data[i].id,
                        kids:data[i].g_kids,
                        name: data[i].g_name,
                        description: data[i].g_goodsdescription,
                        price:data[i].g_price,
                        sort: data[i].g_sort
                    }
                )
            }
            resp.send(goodsdata);//����data��ajax
        })
        mydb.end();//�ر����ݿ�
        //resp.send(data);//����data��ajax
    })
    //mydb.end();//�ر����ݿ�
}