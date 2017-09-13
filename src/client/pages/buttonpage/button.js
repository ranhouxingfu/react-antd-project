/**
 * Created by pc on 2017/1/12.
 */
/**
 * Created by pc on 2016/12/16.
 */
/**
 * Created by pc on 2016/12/15.
 */
import React from 'react';
//var React=require('react')
import {Button,Row,Col,Breadcrumb,Icon} from 'antd';
import { Router, Route, Link, hashHistory, IndexRoute, Redirect, IndexLink} from 'react-router';
export default class myButton extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            locationWidth:''
        }
    }
    componentDidMount(){
        document.getElementsByClassName("redBtton")[0].addEventListener("click",function(){},false);
        document.getElementsByClassName("greenBtton")[0].addEventListener("click",function(){},false);
        document.getElementsByClassName("blueBtton")[0].addEventListener("click",function(){},false);
        var screenWidth=$(window).width();
        var pagelocationWidth=(screenWidth-150)+"px";
        this.setState({locationWidth:pagelocationWidth});
    }
    render() {
        return (
            <div>
                <Row>
                    <Col span={6}>
                        <Button type="primary" size="small">smallButton</Button>
                        <Button type="primary" style={{marginLeft:5}}>middleButton</Button>
                        <Button type="primary" size="large" style={{marginLeft:5}}>largeButton</Button>
                    </Col>
                    <Col span={6}>
                        <Button type="default" size="small">smallButton</Button>
                        <Button type="default" style={{marginLeft:5}}>middleButton</Button>
                        <Button type="default" size="large" style={{marginLeft:5}}>largeButton</Button>
                    </Col>
                    <Col span={6}>
                        <Button type="ghost" size="small">smallButton</Button>
                        <Button type="ghost" style={{marginLeft:5}}>middleButton</Button>
                        <Button type="ghost" size="large" style={{marginLeft:5}}>largeButton</Button>
                    </Col>
                    <Col span={6}>
                        <Button type="dashed" size="small">smallButton</Button>
                        <Button type="dashed" style={{marginLeft:5}}>middleButton</Button>
                        <Button type="dashed" size="large" style={{marginLeft:5}}>largeButton</Button>
                    </Col>
                </Row>
                <Row style={{marginTop:10}}>
                    <Col span={6}>
                        <Button className={"redBtton"} size="small">#f50</Button>
                        <Button className={"greenBtton"} style={{marginLeft:5}}>#87d068</Button>
                        <Button className={"blueBtton"} style={{marginLeft:5}} size="large">#108ee9</Button>
                    </Col>
                </Row>
            </div>

        )
    }
}
