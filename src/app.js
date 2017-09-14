'use strict';

import React from 'react';
import ReactDom from 'react-dom';
import { Router, Route, Link, hashHistory, IndexRoute, Redirect, IndexLink } from 'react-router';

// 引入Antd的导航组件
import { Menu, Icon, Breadcrumb } from 'antd';
import '../node_modules/antd/dist/antd.css';
import './client/css/style.css';
const SubMenu = Menu.SubMenu;

// 引入单个页面（包括嵌套的子页面）
import myTable from './client/pages/tablepage/mytable';
import myHome from './client/pages/homepage/home';
import myForm from './client/pages/formpage/myform';
import myChart from './client/pages/chartspage/highcharts';
import goodsdesciption from './client/pages/goodsdescriptionpage/goodsdescription';
import goodslist from './client/pages/goodslistpage/goodslist';
import edittable from './client/pages/tablepage/edittable';
import mybutton from './client/pages/buttonpage/button';
import myprogress from './client/pages/progresspage/progress';
import mytabs from './client/pages/tabspage/tabs';
import mytreeselect from './client/pages/treeselectpage/treeselect';
import mycalendar from './client/pages/calendarpage/calendar';
import add_table_data from './client/pages/tablepage/add_table_data';
import orderlist from './client/pages/orderformpage/orderformlist';
import add_order_data from './client/pages/orderformpage/add_order_data';

let routeMap = {
	'/myHome': "0",
	'/myTable': "1",
	'myForm': '2',
	'/myChart': '3',
	'/goodsdesciption': '4',
	'/goodslist': '5',
	'/edittable': '6',
	'/mybutton': '7',
	'/myprogress': '8',
	'/mytabs': '9',
	'/mytreeselect': '10',
	'/mycalendar': '11',
	'/add_table_data': '12',
	'/orderlist': '13',
	'/add_order_data': '14'
};
// 配置导航
export default class Sider extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			messageList: [],
			current: '1',
			username: '',
			openKeys: ['sub1'],
			topLoaction: '',
			menuName: '',
			icon: '',
			rootSubmenuKeys:['sub1', 'sub2', 'sub3']
		};
		
		this.onOpenChange = this.onOpenChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	componentWillMount() {
		var route = this.props.location.pathname;
		this.setState({
			current: routeMap[route] || '0',
			username: 'admin'
		});

	}

	componentDidMount() {
		var self = this;
	}

	handleClick(subMenu, icon, e) {
		this.setState({
			current: subMenu.key,
			topLoaction: '',
			menuName: '',
			icon: ''
		});
	}

	onOpenChange = (openKeys) => {
		const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
		if(this.state.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
			this.setState({ openKeys });
		} else {
			this.setState({
				openKeys: latestOpenKey ? [latestOpenKey] : [],
			});
		}
	}

	render() {
		return(
			<div>
			
                <div id="leftMenu">
                    <Menu theme="dark"
                        style={{ width: 150 }}
                        mode="inline"
						openKeys={this.state.openKeys}
        				onOpenChange={this.onOpenChange}
                    >
                        <Menu.Item key="0"><Link to="/myHome"><Icon type="mail" />我没有子菜单</Link></Menu.Item>
                        <SubMenu key="sub1" title={<span><Icon type="bars" /><span>组件实例</span></span>}>
                            <Menu.Item key="sub1-1"><Link to="/myTable">表格</Link></Menu.Item>
                            <Menu.Item key="sub1-2"><Link to="/myForm">表单</Link></Menu.Item>
                            <Menu.Item key="sub1-3"><Link to="/myprogress">进度条</Link></Menu.Item>
                            <Menu.Item key="sub1-4"><Link to="/mytreeselect">下拉树</Link></Menu.Item>
                            <Menu.Item key="sub1-5"><Link to="/mytabs">选项卡</Link></Menu.Item>
                            <Menu.Item key="sub1-6"><Link to="/mybutton">按钮</Link></Menu.Item>
                            <Menu.Item key="sub1-7"><Link to="/myChart">图表</Link></Menu.Item>
                            <Menu.Item key="sub1-8"><Link to="/mycalendar">日历</Link></Menu.Item>
                        </SubMenu>
                         <SubMenu key="sub2" title={<span><Icon type="bars" /><span>商品管理</span></span>}>
                            <Menu.Item key="sub2-1"><Link to="/orderlist">商品列表</Link></Menu.Item>
                            <Menu.Item key="sub2-2"><Link to="/goodsdesciption">商品描述</Link></Menu.Item>
                        </SubMenu>
                    </Menu>
                </div>
                
                <div  id="topMenu">
                  <div className="headLog"><img src='./images/logo.png' width="30" id="logo"/></div>
                 <Menu mode="horizontal" className="topMenuBtn">
                        <SubMenu title={<span className="username"><Icon type="user" />{ this.state.username }</span>}>
                            <Menu.Item key="setting:1">退出</Menu.Item>
                        </SubMenu>
                    </Menu>
                            </div>
                            
                <div id="rightWrap">
                               <div id="pageLocation" style={{width:this.state.locationWidth}}>
                    <Breadcrumb>
    					 <Breadcrumb.Item>Home</Breadcrumb.Item>
   						 <Breadcrumb.Item><a href="">Application Center</a></Breadcrumb.Item>
   						 <Breadcrumb.Item><a href="">Application List</a></Breadcrumb.Item>
   						 <Breadcrumb.Item>An Application</Breadcrumb.Item>
  </Breadcrumb>
                </div>
                    <div className="right-box">
                        { this.props.children }
                    </div>
                </div>
            </div>
		)
	}
}

// 配置路由
ReactDom.render((
	<Router history={hashHistory}>
        <Router path="/" component={Sider}>
            <IndexRoute component={myHome} />
            <Router path="myHome" component={myHome}/>
            <Route path="myChart" component={myChart} />
            <Route path="myTable" component={myTable} />
            <Route path="myForm" component={myForm} />
            <Route path="myprogress" component={myprogress} />
              <Route path="goodsdesciption" component={goodsdesciption} />
            <Route path="goodslist" component={goodslist} />
            <Route path="edittable" component={edittable} />
            <Route path="mybutton" component={mybutton} />
             <Route path="mytabs" component={mytabs} />
            <Route path="mytreeselect" component={mytreeselect} />
            <Route path="mycalendar" component={mycalendar} />
              <Route path="add_table_data" component={add_table_data} />
            <Route path="orderlist" component={orderlist} />
            <Route path="add_order_data" component={add_order_data} />
        </Router>
    </Router>
), document.getElementById('app'));
