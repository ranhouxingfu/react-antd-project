/**
 * Created by pc on 2017/1/17.
 */
import React from 'react';
import {Row,Col,Icon,message,Button,Form,Select,Radio,Breadcrumb,Input} from 'antd';
import { Router, Route, Link, hashHistory, IndexRoute, Redirect, IndexLink} from 'react-router';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
class add_order_data extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            locationWidth: '',
            defaultbuyer: '',
            defaultphonenum: '',
            defaultreceivingTime: '',
            defaultgoods: '',
            defaultnumber: '',
            defaultstandard: '',
            defaultunitprice: '',
            defaultremark: '',
            defaultdelivery: '',
            defaultaddress: '',
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        var screenWidth = $(window).width();
        var pagelocationWidth = (screenWidth - 150) + "px";
        this.setState({locationWidth: pagelocationWidth});
        var self = this;
        var url = "/getOneOrder.do?id=" + self.props.location.query.id;
        var id = self.props.location.query.id;
        if (id != null && id != undefined && id != '') {
            $.getJSON(url, function (result) {
                if (!result) {
                    return;
                }
                var defaultvalueData = result.map(function (res) {
                    return {
                        defaultbuyer: res.buyer,
                        defaultphonenum: res.phonenum,
                        defaultaddress: res.address,
                        defaultreceivingTime: res.receivingTime,
                        defaultdelivery: res.delivery,
                        defaultgoods: res.goods,
                        defaultunitprice: res.unitprice,
                        defaultnumber: res.number,
                        defaultstandard: res.standard,
                        defaultremark: res.remark
                    };
                });
                self.setState({
                    defaultbuyer: defaultvalueData[0].defaultbuyer,
                    defaultphonenum: defaultvalueData[0].defaultphonenum,
                    defaultaddress: defaultvalueData[0].defaultaddress,
                    defaultreceivingTime: defaultvalueData[0].defaultreceivingTime,
                    defaultdelivery: defaultvalueData[0].defaultdelivery,
                    defaultgoods: defaultvalueData[0].defaultgoods,
                    defaultunitprice: defaultvalueData[0].defaultunitprice,
                    defaultnumber: defaultvalueData[0].defaultnumber,
                    defaultstandard: defaultvalueData[0].defaultstandard,
                    defaultremark: defaultvalueData[0].defaultremark
                })
            });
        }
    }

    handleSubmit(e) {
        var self = this;
        e.preventDefault();
        //console.log(self.props.form.getFieldsValue());
        var data = self.props.form.getFieldsValue();
        data.id = self.props.location.query.id;
        if (self.props.location.query.id != null && self.props.location.query.id != '' && self.props.location.query.id != undefined) {
            $.ajax({
                url: '/updateorderlist.do',
                type: 'POST',
                dataType: "json",
                data: data,
                cache: false,
                success: function (data) {
                    message.success('操作成功!');
                    window.location.hash = '/orderlist';//跳转页面
                },
                error: function () {
                    message.success('操作失败!');
                }
            })
        } else {
            $.ajax({
                url: '/postorderlist.do',
                type: 'POST',
                dataType: "json",
                data: data,
                cache: false,
                success: function (data) {
                    message.success('操作成功!');
                    window.location.hash = '/orderlist';//跳转页面
                },
                error: function () {
                    message.success('操作失败!');
                }
            });
        }

    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {//栅格布局
            labelCol: {span: 4},
            wrapperCol: {span: 8},
        };
        const tailFormItemLayout = {//栅格布局
            wrapperCol: {
                span: 8,
                offset: 5,
            },
        };
        //console.log(this.state);
        return (
            <div>
                <Row>
                    <Form layout='horizontal' onSubmit={this.handleSubmit} method='post'>
                        <FormItem
                            {...formItemLayout}
                            label="姓名"
                            >
                            {getFieldDecorator('buyer', {initialValue: this.state.defaultbuyer}, {
                                rules: [{required: false, message: '请输入您的真实姓名!'}],
                            })(
                                <Input/>
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="联系方式"
                            >
                            {getFieldDecorator('phonenum', {initialValue: this.state.defaultphonenum}, {
                                rules: [{required: false, message: '请输入您的准确的联系方式!'}],
                            })(
                                <Input/>
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="收货地址"
                            >
                            {getFieldDecorator('address', {initialValue: this.state.defaultaddress}, {
                                rules: [{required: false, message: '请输入您的准确的收货地址!'}],
                            })(
                                <Input/>
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="收货时间"
                            >
                            {getFieldDecorator('receivingTime', {initialValue: this.state.defaultreceivingTime}, {
                                rules: [{required: false, message: '请选择您的收获时间!'}],
                            })(
                                <RadioGroup onChange={this.onChange}>
                                    <Radio value="法定休息时间">法定休息时间</Radio>
                                    <Radio value="正常上班时间">正常上班时间</Radio>
                                    <Radio value="自动">自动</Radio>
                                </RadioGroup>
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="快递"
                            >
                            {getFieldDecorator('delivery', {initialValue: this.state.defaultdelivery}, {
                                rules: [{required: false, message: '请选择快递!'}],
                            })(
                                <RadioGroup onChange={this.onChange}>
                                    <Radio value="中通">中通</Radio>
                                    <Radio value="申通">申通</Radio>
                                    <Radio value="韵达">韵达</Radio>
                                </RadioGroup>
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="商品名称"
                            >
                            {getFieldDecorator('goods', {initialValue: this.state.defaultgoods}, {
                                rules: [{required: false, message: '请选择您的商品名称!'}],
                            })(
                                <Input/>
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="商品单价"
                            >
                            {getFieldDecorator('unitprice', {initialValue: this.state.defaultunitprice}, {
                                rules: [{required: false}],
                            })(
                                <Input/>
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="商品数量"
                            >
                            {getFieldDecorator('number', {initialValue: this.state.defaultnumber}, {
                                rules: [{required: false, message: '请选择您的商品数量!'}],
                            })(
                                <Input/>
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="商品规格"
                            >
                            {getFieldDecorator('standard', {initialValue: this.state.defaultstandard}, {
                                rules: [{required: false, message: '请选择您的商品规格!'}],
                            })(
                                <Input/>
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="备注"
                            >
                            {getFieldDecorator('remark', {initialValue: this.state.defaultremark}, {
                                rules: [{required: false, message: '备注!'}],
                            })(
                                <Input/>
                            )}
                        </FormItem>
                        <FormItem {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit"
                                    size="large">提交</Button>&nbsp;&nbsp;&nbsp;&nbsp;<Button type="default"
                                                                                            size="large">重置</Button>
                        </FormItem>
                    </Form>
                </Row>
            </div>
        )
    }
}
add_order_data = Form.create()(add_order_data)
export default add_order_data