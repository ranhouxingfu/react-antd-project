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
exports.getgoods_description_data = function (req, resp) {
    var revalue = req.query.value;
    //var reqpwd=req.query.pwd;
    mytable();
    mydb.query("select * from t_goodsdescription", [revalue], function (err, data) {
        resp.send(data);//����data��ajax
    })
    mydb.end();//�ر����ݿ�
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
            resp.send(goodsdata);//����data��ajax
        })
        mydb.end();//�ر����ݿ�
        //resp.send(data);//����data��ajax
    })
    //mydb.end();//�ر����ݿ�
}