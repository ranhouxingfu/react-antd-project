/**
 * Created by pc on 2017/1/12.
 */
/**
 * Created by pc on 2016/12/13.
 */
import React from "react";
//var React=require('react')
import {Calendar,Icon,Row,Col,Breadcrumb} from "antd";
import { Router, Route, Link, hashHistory, IndexRoute, Redirect, IndexLink} from 'react-router';
import moment from 'moment';
export default  class myCalendar extends React.Component{
    constructor(props){
        super(props);
        this.state={
            locationWidth:''
        }
        this.monthCellRender=this.monthCellRender.bind(this);
        this.dateCellRender=this.dateCellRender.bind(this);
    }
    monthCellRender(value) {
        return <div>Custom monthly {value.month()}</div>;
    }
    dateCellRender(value) {
        return <div>Custom date {value.date()}</div>;
    }
    componentDidMount(){
        var screenWidth=$(window).width();
        var pagelocationWidth=(screenWidth-150)+"px";
        this.setState({locationWidth:pagelocationWidth})
    }
    render(){
        return(
            <div>
                <Row>
                    <h3>基本日历</h3>
                    <Col span={24}>
                        <Calendar />
                    </Col>
                </Row>
                <Row>
                    <h3>带内容的日历</h3>
                    <Col span={24}>
                        <Calendar defaultValue={moment('2010-10-10', 'YYYY-MM-DD')}
                                  dateCellRender={this.dateCellRender} monthCellRender={this.monthCellRender}
                            />
                    </Col>
                </Row>
            </div>
        )

    }
}