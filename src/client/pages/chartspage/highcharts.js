/**
 * Created by pc on 2017/1/10.
 */
import React from 'react';
//var React=require('react')
import Highcharts from 'highcharts';
import {Row,Col,Breadcrumb,Icon} from 'antd';
import { Router, Route, Link, hashHistory, IndexRoute, Redirect, IndexLink} from 'react-router';
export default class myChart extends React.Component {
    constructor(props){
        super(props);
        this.state={
            locationWidth:''
        }
    }
    randerChart() {
        var chart = new Highcharts.Chart({
            chart: {
                renderTo: 'container',
                type: 'column'
            },
            title: {
                text: null
            },
            credits: {
                enabled: false
            },
            xAxis: {
                categories: ['一月', '二月', '三月', '四月', '五月', '六月','七月', '八月', '九月', '十月', '十一月', '十二月']
            },
            yAxis: {
                min: 0,
                title: {
                    text: '降水量（毫米）'
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
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
                name: '东京',
                data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]

            }, {
                name: '纽约',
                data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]

            }, {
                name: '伦敦',
                data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2]

            }, {
                name: '柏林',
                data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1]

            }]
        });
        var chart1 = new Highcharts.Chart({
            chart: {
                renderTo: 'container1',
                type: 'pie'
            },
            title: {
                text: '各城市2016年夏季降雨量'
            },
            credits: {
                enabled: false
            },
            tooltip:{
                pointFormat:'{series.name}:<b>{point.percentage:.1f}%</b>'
            },
            plotOptions:{
                pie:{
                    alloPointSelect:true,
                    cursor:'pointer',
                    dataLabels:{
                        enabled:true,
                        format:'<b>{point.name}</b>:{point.percentage:.1f}%'
                    },
                    showInLegend:true
                }
            },
            series:[{
                name:'降雨量',
                colorByPoint:true,
                data: [{
                    name: '东京',
                    y:10
                    //data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]

                }, {
                    name: '纽约',
                    y:30
                    //data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]

                }, {
                    name: '伦敦',
                    y:20
                    //data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2]

                }, {
                    name: '柏林',
                    y:40
                    //data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1]

                }]
            }]
        });
        var chart2 = new Highcharts.Chart({
            chart: {
                renderTo: 'container2',
                //type: 'column'
            },
            title: {
                text: '混合图表',
            },
            credits: {
                enabled: false
            },
            xAxis: {
                categories: ['一月', '二月', '三月', '四月', '五月', '六月','七月', '八月', '九月', '十月', '十一月', '十二月']
            },

            labels:{
                items:[{
                    html:'比例图',
                    style:{
                        left:'50px',
                        top:'30px',
                        color:(Highcharts.theme&&Highcharts.theme.textColor) || 'black'
                    }
                }]
            },

            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f}%</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            series: [{
                type:'column',
                name: '东京',
                data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
            }, {
                type:'column',
                name: '纽约',
                data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]

            }, {
                type:'column',
                name: '伦敦',
                data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2]

            }, {
                type:'column',
                name: '柏林',
                data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1]
            },{
                type:'line',
                name:'平均值',
                data:[40,20,60,80,30,90,10,50,30,60,70,40],
                maker:{
                    lineWidth:2,
                    lineColor:Highcharts.getOptions().colors[6],
                    fillColor:'white'
                }
            },
                {
                    type:'pie',
                    name:'所占百分比',
                    data:[{
                        name:'东京',
                        y:10,
                        color:Highcharts.getOptions().colors[0]
                    },{
                        name:'纽约',
                        y:40,
                        color:Highcharts.getOptions().colors[1]
                    },{
                        name:'伦敦',
                        y:20,
                        color:Highcharts.getOptions().colors[2]
                    },{
                        name:'柏林',
                        y:30,
                        color:Highcharts.getOptions().colors[3]
                    }],
                    center:[100,80],
                    size:100,
                    showInLegend:false,
                    dataLabels:{
                        enabled:false
                    }
                }]
        })
    }

    componentDidMount() {
        this.randerChart();
        var screenWidth=$(window).width();
        var pagelocationWidth=(screenWidth-150)+"px";
        this.setState({locationWidth:pagelocationWidth})
    }

    render() {
        return (
            <div>
                <Row>
                    <Col span={24}><div  id="container" className="chart-box"></div></Col>
                </Row>
                <Row>
                    <Col span={12}><div  id="container1" className="chart-box"></div></Col>
                    <Col span={12}><div  id="container2" className="chart-box"></div></Col>
                </Row>
            </div>
        )
    }
}