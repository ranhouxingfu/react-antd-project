/**
 * Created by pc on 2017/1/12.
 */
/**
 * Created by pc on 2016/12/13.
 */
//选项卡
import React from 'react';
//var React=require('react')
import { Steps,Button,Row,Col,Icon,Tabs ,Breadcrumb} from 'antd';
import { Router, Route, Link, hashHistory, IndexRoute, Redirect, IndexLink} from 'react-router';
const TabPane=Tabs.TabPane;
export default class myTabs extends React.Component{
    constructor(props){
        super(props);
        this.state={
            locationWidth:''
        }

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
                    <Col span={11}>
                        <Tabs defaultActiveKey="1">
                            <TabPane tab="Tab 1" key="1">Content of Tab Pane 1</TabPane>
                            <TabPane tab="Tab 2" key="2">Content of Tab Pane 2</TabPane>
                            <TabPane tab="Tab 3" key="3">Content of Tab Pane 3</TabPane>
                        </Tabs>
                    </Col>
                    <Col span={11} offset={2}>
                        <Tabs defaultActiveKey="1">
                            <TabPane tab="Tab 1" key="1">Content of tab 1</TabPane>
                            <TabPane tab="Tab 2" key="2">Content of tab 2</TabPane>
                            <TabPane tab="Tab 3" key="3">Content of tab 3</TabPane>
                            <TabPane tab="Tab 4" key="4">Content of tab 4</TabPane>
                            <TabPane tab="Tab 5" key="5">Content of tab 5</TabPane>
                            <TabPane tab="Tab 6" key="6">Content of tab 6</TabPane>
                            <TabPane tab="Tab 7" key="7">Content of tab 7</TabPane>
                            <TabPane tab="Tab 8" key="8">Content of tab 8</TabPane>
                            <TabPane tab="Tab 9" key="9">Content of tab 9</TabPane>
                        </Tabs>
                    </Col>
                </Row>
                <Row style={{marginTop:"15px"}}>
                    <Col span={11}>
                        <Tabs type="card">
                            <TabPane tab="Tab 1" key="1">Content of Tab Pane 1</TabPane>
                            <TabPane tab="Tab 2" key="2">Content of Tab Pane 2</TabPane>
                            <TabPane tab="Tab 3" key="3">Content of Tab Pane 3</TabPane>
                        </Tabs>
                    </Col>
                    <Col span={11} offset={2}>
                        <div className="card-container">
                            <Tabs type="card">
                                <TabPane tab="Tab 1" key="1">Content of Tab Pane 1</TabPane>
                                <TabPane tab="Tab 2" key="2">Content of Tab Pane 2</TabPane>
                                <TabPane tab="Tab 3" key="3">Content of Tab Pane 3</TabPane>
                            </Tabs>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}