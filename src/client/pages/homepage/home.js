/**
 * Created by pc on 2017/1/6.
 */
/**
 * Created by pc on 2016/12/22.
 */
import React from 'react';
import { Row, Col, Collapse, Select, DatePicker, Icon, Progress, Breadcrumb } from 'antd';
import Highcharts from 'highcharts';
import { Router, Route, Link, hashHistory, IndexRoute, Redirect, IndexLink } from 'react-router';
const Panel = Collapse.Panel;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;
export default class myHome extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			contract: [],
			notice: [],
			locationWidth: ''
		}
	}
	randerChart() {
		var chart = new Highcharts.Chart({
			chart: {
				renderTo: 'container',
				type: 'column',
				backgroundColor: "none",
				height: 300
			},
			title: {
				text: null
			},
			credits: {
				enabled: false
			},
			xAxis: {
				categories: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
			},
			yAxis: {
				min: 0,
				title: {
					text: '销售额'
				}
			},
			tooltip: {
				headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
				pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
					'<td style="padding:0"><b>{point.y:.1f} Kg</b></td></tr>',
				footerFormat: '</table>',
				shared: true,
				useHTML: true
			},
			plotOptions: {
				column: {
					pointPadding: 0.2,
					borderWidth: 0
				}
			},
			series: [{
				type: 'column',
				name: '苹果',
				data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]

			}, {
				type: 'column',
				name: '草莓',
				data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]

			}, {
				type: 'column',
				name: '荔枝',
				data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2]

			}, {
				type: 'column',
				name: '橘子',
				data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1]

			}, {
				type: 'spline',
				name: '平均值',
				data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1],
				marker: {
					lineWidth: 2,
					lineColor: Highcharts.getOptions().colors[3],
					fillColor: 'white'
				}
			}]
		});
		var chart1 = new Highcharts.Chart({
			chart: {
				renderTo: 'container1',
				type: 'pie',
				backgroundColor: "none",
				height: 200
			},
			title: {
				floating: true,
				text: '比例'

			},
			tooltip: {
				pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
			},
			credits: {
				enabled: false
			},
			//legend: {
			//    align: 'right', //水平方向位置
			//    verticalAlign: 'middle', //垂直方向位置
			//    x: 0, //距离x轴的距离
			//    y: 50 //距离Y轴的距离
			//},
			plotOptions: {
				pie: {
					allowPointSelect: true,
					showInLegend: true,
					cursor: 'pointer',
					dataLabels: {
						//有无数据线
						enabled: false,
						//字体颜色
						//color: 'grey',
						//distance:-10,
						format: '<b>{point.name}</b>: {point.percentage:.1f} %',
						style: {
							color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
						}
					},
					events: {
						click: function(e) {
							var url = e.point.url;
							if(url) {
								window.location.href = url;
							}
						}
					}
				},
				showInLegend: true
			},
			series: [{
				type: 'pie',
				innerSize: '50%',
				name: '销售比例',
				data: [
					{ name: '草莓', y: 45.0 },
					['苹果', 26.8],
					{
						name: '荔枝',
						y: 12.8,
						sliced: true,
						selected: true
					}
				]
			}]
		}, function(c) {
			// 环形图圆心
			var centerX = c.series[0].center[0];
			var centerY = c.series[0].center[1];

			// 标题字体大小，返回类似 16px ，所以需要 parseInt 处理
			var titleHeight = parseInt(c.title.styles.fontSize);

			// 设置图表偏移
			c.setTitle({
				y: centerY + titleHeight / 2
			});
		})
	}
	componentDidMount() {
		this.randerChart();
		const contract = [{
			name: "南京森鹿皮件服饰有限公司",
			date: "2016-01-01",
		}, {
			name: "广东友元国土信息工程有限公司",
			date: "2016-02-11"
		}, {
			name: "青海省广播电视信息网络股份有限公司",
			date: "2016-04-26"
		}, {
			name: "青海航天信息有限公司",
			date: "2016-05-01"
		}, {
			name: "曲靖市绿能燃气运输有限公司",
			date: "2016-08-17"
		}, {
			name: "吉林省蔬菜花卉科学研究院",
			date: "2016-09-11"
		}, {
			name: "四川信息工程有限公司",
			date: "2016-11-01"
		}, {
			name: "成都九红农业科技有限公司",
			date: "2016-12-01"
		}];
		const notice = [{
			type: "通知",
			title: '新版员工守则，即日执行',
			date: '2016-01-01'
		}, {
			type: "公告",
			title: 'OA办公使用指南',
			date: '2016-01-01'
		}, {
			type: "通知",
			title: '2016年销售目标',
			date: '2016-01-01'
		}, {
			type: "公告",
			title: '劳动节集体出游指南',
			date: '2016-01-01'
		}, {
			type: "通知",
			title: '品牌价值的最佳选择',
			date: '2016-01-01'
		}, {
			type: "公告",
			title: '采购商城全新升级自营业正品',
			date: '2016-01-01'
		}];
		var screenWidth = $(window).width();
		var pagelocationWidth = (screenWidth - 150) + "px";
		this.setState({ contract: contract, notice: notice, locationWidth: pagelocationWidth })
	}

	render() {
		const { contract } = this.state;
		const { notice } = this.state;
		const contractGroups = contract.map((compony) => {
			return <li title={compony.name} key={compony.index}><span><a>{compony.name}</a></span><span>{compony.date}</span></li>;
		});
		const noticeGroups = notice.map((notice) => {
			return <li title={notice.title} key={notice.index}><span><span>【{notice.type}】</span><a>{notice.title}</a></span><span>{notice.date}</span></li>;
		})
		return(
			<div>
                <Row className="home-first-row">
                    <Col lg={{span: 16}} xs={{span: 24}}>
                        <Col span={24}>
                            <Col span={6}>
                                <div className="home-first-row-piece">
                                    <Col span={15} className="home-first-row-remind">
                                        <h1>513</h1>
                                        <p>总销售量</p>
                                    </Col>
                                    <Col span={8} className="home-first-row-icon">
                                        <Icon type="tags deepgreen" />
                                    </Col>
                                </div>
                            </Col>
                            <Col span={6}>
                                <div className="home-first-row-piece">
                                    <Col span={15} className="home-first-row-remind">
                                        <h1>5130</h1>
                                        <p>总销售额</p>
                                    </Col>
                                    <Col span={8}  className="home-first-row-icon">
                                        <Icon type="pay-circle deeporange " />
                                    </Col>
                                </div>
                            </Col>
                            <Col span={6}>
                                <div className="home-first-row-piece">
                                    <Col span={15} className="home-first-row-remind">
                                        <h1>222</h1>
                                        <p>回订单数</p>
                                    </Col>
                                    <Col span={8}  className="home-first-row-icon">
                                        <Icon type="delete grey" />
                                    </Col>
                                </div>
                            </Col>
                            <Col span={6}>
                                <div className="home-first-row-piece">
                                    <Col span={15} className="home-first-row-remind">
                                        <h1>4532</h1>
                                        <p>新订单</p>
                                    </Col>
                                    <Col span={8}  className="home-first-row-icon">
                                        <Icon type="shopping-cart deepgreen " />
                                    </Col>
                                </div>
                            </Col>
                            <Col span={24} className="home-first-row-chart-container">
                                <div className="home-first-row-chart">
                                    <Col span={24} style={{height:"360px"}}>
                                        <p> <Icon type="line-chart white" />销售走势</p>
                                        <div id="container" className="chart-box" ></div>
                                    </Col>
                                </div>
                            </Col>
                            <Col span={24} className="home-first-row-otherdiv">
                                <Col span={8}>
                                    <div className="home-first-row-other" >
                                        <p> <Icon type="like-o iColor" />最新签约</p>
                                        <div className="home-first-row-contractDiv">
                                            <ul className="home-first-row-contract">
                                                {contractGroups}
                                            </ul>
                                        </div>
                                    </div>
                                </Col>
                                <Col span={8}>
                                    <div className="home-first-row-other" >
                                        <p><Icon type="notification iColor" />通知公告</p>
                                        <div className="home-first-row-contractDiv">
                                            <ul className="home-first-row-notice">
                                                {noticeGroups}
                                            </ul>
                                        </div>
                                    </div>
                                </Col>
                                <Col span={8}>
                                    <div className="home-first-row-other" >
                                        <p><Icon type="smile-o" />暂定</p>
                                        <div>
                                            <Col span={8}></Col>
                                            <Col span={16}></Col>
                                        </div>
                                    </div>
                                </Col>
                            </Col>
                        </Col>
                    </Col>
                    <Col lg={{span: 8}} xs={{span: 24}}>
                        <div className="home-first-row-chart">
                            <Col span={24} style={{height:"260px"}}>
                                <p> <Icon type="pie-chart white" />销售比例</p>
                                <div id="container1" className="chart-box"></div>
                            </Col>
                            <Col span={24} className="first-row-steps">
                                <p> <Icon type="smile-o white" />目标完成度</p>
                                <div><span>苹果</span><Progress percent={30} /></div>
                                <div><span>草莓</span><Progress percent={10} /></div>
                                <div><span>荔枝</span><Progress percent={50} /></div>
                                <div><span>橘子</span><Progress percent={70} /></div>
                                <div><span>香蕉</span><Progress percent={100} /></div>
                            </Col>
                            <Col span={24} className="home-first-row-last">
                                <p> <Icon type="team iColor" />团队介绍</p>
                                <div></div>
                            </Col>
                        </div>
                    </Col>
                </Row>
            </div>
		)
	}
}