/**
 * Created by pc on 2017/1/13.
 */
import React from "react";
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button ,DatePicker,Radio,message,AutoComplete,Breadcrumb} from 'antd';
import { Router, Route, Link, hashHistory, IndexRoute, Redirect, IndexLink} from 'react-router';
const FormItem = Form.Item
const Option = Select.Option
const RadioGroup = Radio.Group
const Options = AutoComplete.Option;

class add_table_data extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            locationWidth: '',
            defaultvalueData: '',
            defaultusername: '',
            defaultuserage: '',
            defaultuseraddress: '',
            defaultremark: '',
        }
        //this.render = this.render.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    componentWillMount() {
        var self = this;
        var url = "/getform.do?id=" + self.props.location.query.id;
        var id=self.props.location.query.id;
        if(id != null && id != undefined && id != ''){
            $.getJSON(url, function (result) {
                if (!result) {
                    return;
                }
                var defaultvalueData = result.map(function (p) {
                    return {
                        key: p.id,
                        username: p.username,
                        userage: p.userage,
                        useraddress: p.useraddress,
                        remark: p.remark,
                    };
                });
                self.setState({
                    defaultusername: defaultvalueData[0].username,
                    defaultuserage: defaultvalueData[0].userage,
                    defaultuseraddress: defaultvalueData[0].useraddress,
                    defaultremark: defaultvalueData[0].remark
                })
            });
        }

    }

    componentDidMount() {
        var screenWidth = $(window).width();
        var pagelocationWidth = (screenWidth - 150) + "px";//this.setState({locationWidth:pagelocationWidth})
        this.setState({
            locationWidth: pagelocationWidth
        })
    }

    handleSubmit(e) {
        var self = this;
        e.preventDefault();
        var username = self.props.form.getFieldValue('username');
        var age = self.props.form.getFieldValue('age');
        var address = self.props.form.getFieldValue('address');
        var remark = self.props.form.getFieldValue('remark');
        var data = {username: username, age: age, address: address, remark: remark,id:self.props.location.query.id};
        if(self.props.location.query.id !=null && self.props.location.query.id != '' && self.props.location.query.id !=undefined){
            $.ajax({
                url: '/updatedata.do',
                type: 'POST',
                dataType: "json",
                data: data,
                cache: false,
                success: function (data) {
                    message.success('操作成功!');
                    window.location.hash = '/myTable';//跳转页面
                },
                error: function () {
                    message.success('操作失败!');
                }
            })
        }else{
            $.ajax({
                url: '/addtable.do',
                type: 'POST',
                dataType: "json",
                data: data,
                cache: false,
                success: function (data) {
                    message.success('操作成功!');
                    window.location.hash = '/myTable';//跳转页面
                },
                error: function () {
                    message.success('操作失败!');
                }
            })
        }

    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {//栅格布局
            labelCol: {span: 4},
            wrapperCol: {span: 12},
        };
        const tailFormItemLayout = {//栅格布局
            wrapperCol: {
                span: 8,
                offset: 5,
            },
        };
        return (
            <div>
                <Row>
                    <Col sm={{span: 12,offset:2}} xs={{span:24}}>
                        <Form layout="horizontal" onSubmit={this.handleSubmit} method='post'>
                            <FormItem
                                {...formItemLayout}
                                label="姓名"
                                >
                                {getFieldDecorator('username',{ initialValue:this.state.defaultusername}, {
                                    rules: [{required: false, message: '请输入您的真实姓名!'}],
                                })(
                                    <Input/>
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="年龄"
                                >
                                {getFieldDecorator('age', { initialValue:this.state.defaultuserage}, {
                                    rules: [{required: false, message: '请输入您的真实姓名年龄!'}],
                                })(
                                    <Input/>
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="出生日期"
                                >
                                {getFieldDecorator('birthday', {
                                    rules: [{required: false, message: '请输入您的出生日期!'}],
                                })(
                                    <DatePicker className='date'/>
                                )}

                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="家庭住址"
                                >
                                {getFieldDecorator('address', { initialValue:this.state.defaultuseraddress}, {
                                    rules: [{required: false, message: '请输入您的家庭住址!'}],
                                })(
                                    <Input/>
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="备注"
                                >
                                {getFieldDecorator('remark',  { initialValue:this.state.defaultremark},{
                                    rules: [{required: false, message: '备注'}],
                                })(
                                    <Input/>
                                )}
                            </FormItem>
                            <FormItem {...tailFormItemLayout} style={{ marginBottom: 8 }}>
                                {getFieldDecorator('agreement', {
                                    valuePropName: 'checked',
                                })(
                                    <Checkbox>已阅读并且 <a>同意</a></Checkbox>
                                )}
                            </FormItem>
                            <FormItem {...tailFormItemLayout}>
                                <Button type="primary" htmlType="submit"
                                        size="large">提交</Button>&nbsp;&nbsp;&nbsp;&nbsp;<Button type="default"
                                                                                                size="large">重置</Button>
                            </FormItem>
                        </Form>
                    </Col>
                </Row>
            </div>
        )
    }
}
add_table_data = Form.create()(add_table_data)
export default add_table_data