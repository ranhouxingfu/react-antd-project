

var http = require('http')
var express = require('express')
var path = require('path')

var favicon = require('serve-favicon')
var logger = require('morgan')
var methodOverride = require('method-override')
var session = require('express-session')
var bodyParser = require('body-parser')
var multer = require('multer')
var errorHandler = require('errorhandler')

var app = express()



var getTableData=require('./src/server/dao/getTableData');
var postformContent=require('./src/server/dao/postFromValue');
var goodsdecription=require('./src/server/dao/goodsdescription');
var goodslist=require('./src/server/dao/goodslist');
var orderlist=require('./src/server/dao/orderListValue');


// all environments
app.set('port', process.env.PORT || 3000)
app.set('views', path.join(__dirname, '/src/client'))
app.set('view engine', 'html')
app.use(favicon(path.join(__dirname, '/src/client/images/logo.png')))
app.use(logger('dev'))
app.use(methodOverride())
app.use(session({ resave: true,
                  saveUninitialized: true,
                  secret: 'uwotm8' }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(multer())
app.use(express.static(path.join(__dirname, '/src/client')))

//设置监听
//表单
app.post('/postform.do',postformContent.postFormValue);
app.get('/getform.do',postformContent.getdefaultformValue);
//表格
app.post('/updatedata.do',postformContent.updatetableData);
app.get('/gettable.do',getTableData.getData);
app.post('/deltablerow.do',getTableData.deleteData);
app.post('/addtable.do',getTableData.addData);
//商品描述
app.get('/getgoods.do',goodsdecription.getgoods_description_data);
app.post('/delgoods.do',goodsdecription.delete_goods_description);
//商品列表
app.get('/getgoodslist.do',goodslist.getgoods_list_data);
app.post('/delgoodslist.do',goodslist.delete_goodslist);
//订单管理
app.post('/postorderlist.do',orderlist.postOrderValue);
app.get('/getorderlist.do',orderlist.getOrderData);
app.post('/updateorderlist.do',orderlist.updateOrderData);
app.get('/getOneOrder.do',orderlist.getOneOrderData);
app.post('/delOneOrder.do',orderlist.delete_order_data);

app.get('/', function (req, res) {
	res.render('index');
});
// error handling middleware should be loaded after the loading the routes
if (app.get('env') === 'development') {
  app.use(errorHandler())
}

var server = http.createServer(app)
server.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'))
})