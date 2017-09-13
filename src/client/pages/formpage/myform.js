import React from 'react';
//var React=require('react')
import ReactDom from 'react-dom';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button ,DatePicker,Radio,message,AutoComplete,Breadcrumb} from 'antd';
import { Router, Route, Link, hashHistory, IndexRoute, Redirect, IndexLink} from 'react-router';
const FormItem = Form.Item
const Option = Select.Option
const RadioGroup = Radio.Group
const Options = AutoComplete.Option;
class myForm extends React.Component{
    constructor(props) {
        super(props)
        //console.log(props.location.query)//通过props.location.query方法获取页面传过来的参数
        this.state = {
            passwordDirty: false,
            residences:[],
            resultEmail: [],
            locationWidth:"",
        }
        this.handleSubmit=this.handleSubmit.bind(this);
        this.checkConfirm=this.checkConfirm.bind(this);
        this.checkPassowrd=this.checkPassowrd.bind(this);
        this.handlePasswordBlur=this.handlePasswordBlur.bind(this);
        this.handleEmailChange=this.handleEmailChange.bind(this);
    }
    componentDidMount() {//组件渲染完成
        const residences = [{//初始化数组
            value: '浙江',
            label: '浙江',
            children: [{
                value: '杭州',
                label: '杭州',
                children: [{
                    value: '西湖',
                    label: '西湖',
                }],
            }],
        }, {
            value: '江苏',
            label: '江苏',
            children: [{
                value: '南京',
                label: '南京',
                children: [{
                    value: '中华门',
                    label: '中华门',
                }],
            }],
        }];
        var screenWidth=$(window).width();
        var pagelocationWidth=(screenWidth-150)+"px";
        //this.setState({locationWidth:pagelocationWidth})
        this.setState({
            residences:residences,locationWidth:pagelocationWidth
        })
    }
    //提交表单
    handleSubmit(e){
        e.preventDefault();
        console.log('收到表单值：', this.props.form.getFieldsValue())//此方法同样可以获取到表单值
        var nickname=this.props.form.getFieldValue('nickname');
        var email=this.props.form.getFieldValue('email');
        var password=this.props.form.getFieldValue('password');
        var phone=this.props.form.getFieldValue('phone');
        var residence=this.props.form.getFieldValue('residence');
        var birthday=$(".ant-calendar-range-picker").val();
        var data={nickname:nickname,email:email,password:password,birthday:birthday,phone:phone,capital:residence[0],city:residence[1],street:residence[2]}
        $.ajax({
            url:'/postform.do',
            type:'POST',
            dataType:"json",
            data:data,
            cache:false,
            success:function(data){
                alert(1111)
                message.success('操作成功!');
            },
            error:function(){
                message.success('操作失败!');
            }
        });

    }

    //输入密码
    handlePasswordBlur(e) {
        const value = e.target.value;
        this.setState({ passwordDirty: this.state.passwordDirty || !!value });
    }

    //检查密码是否一致
    checkPassowrd(rule, value, callback) {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('两次输入密码不一致!');
        } else {
            callback();
        }
    }
    checkConfirm(rule, value, callback) {
        const form = this.props.form;
        if (value && this.state.passwordDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }
    //邮箱
    handleEmailChange(value) {
        let result;
        //debugger;
        if (!value || value.indexOf('@') >= 0) {
            result = [];
        } else {
            result = ['gmail.com', '163.com', 'qq.com'].map(domain => `${value}@${domain}`);
        }
        this.setState({ resultEmail:result });
        //console.log(this.state)
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {//栅格布局
            labelCol: {span: 3},
            wrapperCol: {span: 8},
        };
        const tailFormItemLayout = {//栅格布局
            wrapperCol: {
                span: 8,
                offset: 4,
            },
        };
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '86',
        })(
            <Select className="icp-selector" style={{width:"60px"}}>
                <Option value="86">+86</Option>
            </Select>
        );
        //const success = function () {
        //    message.success('操作成功!');
        //}
        const { resultEmail } = this.state;
        //console.log(resultEmail)
        const children = resultEmail.map((email) => {
            return <Options key={email}>{email}</Options>;
        });
        //console.log(children)
        return (
            <div>
            <Form layout="horizontal" onSubmit={this.handleSubmit} method='post'>
                <FormItem
                    {...formItemLayout}
                    label="邮箱"
                    hasFeedback
                    >
                    {getFieldDecorator('email', {
                        rules: [{
                            type: 'email', message: '邮箱格式不正确!',
                        }, {
                            required: true, message: '请输入正确的邮箱!',
                        }],
                    })(
                        <AutoComplete
                            onChange={this.handleEmailChange}
                            placeholder="input here"
                            >
                            {children}
                        </AutoComplete>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="密码"
                    hasFeedback
                    >
                    {getFieldDecorator('password', {
                        rules: [{
                            required: true, message: '请输入正确的密码!',
                        }],
                    })(
                        <Input type="password" onBlur={this.handlePasswordBlur}/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="确认密码"
                    hasFeedback
                    >
                    {getFieldDecorator('confirm', {
                        rules: [{
                            required: true, message: '请再次确认密码!',
                        }],
                    })(
                        <Input type="password"/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label={(
            <span>
              用户名&nbsp;
              <Tooltip title="请设置你的用户名?">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          )}
                    hasFeedback
                    >
                    {getFieldDecorator('nickname', {
                        rules: [{required: true, message: '请输入用户名!'}],
                    })(
                        <Input />
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
                    label="所在城市"
                    >
                    {getFieldDecorator('residence', {
                        initialValue: ['浙江', '杭州', '西湖'],
                        rules: [{type: 'array', required: true, message: '请选择你所在城市!'}],
                    })(
                        <Cascader options={this.state.residences}/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="手机号码"
                    >
                    {getFieldDecorator('phone', {
                        rules: [{required: true, message: '请输入手机号!'}],
                    })(
                        <Input addonBefore={prefixSelector}/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="验证码"
                    extra="We must make sure that your are a human."
                    >
                    <Row gutter={8}>
                        <Col span={12}>
                            {getFieldDecorator('captcha', {
                                rules: [{required: true, message: '请输入获取到的验证码!'}],
                            })(
                                <Input size="large"/>
                            )}
                        </Col>
                        <Col span={12}>
                            <Button size="large">获取验证码</Button>
                        </Col>
                    </Row>
                </FormItem>
                <FormItem {...tailFormItemLayout} style={{ marginBottom: 8 }}>
                    {getFieldDecorator('agreement', {
                        valuePropName: 'checked',
                    })(
                        <Checkbox>已阅读并且 <a>同意</a></Checkbox>
                    )}
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit" size="large">提交</Button>&nbsp;&nbsp;&nbsp;&nbsp;<Button type="default" size="large">重置</Button>
                </FormItem>
            </Form>
                </div>
        );
    }
}

myForm = Form.create()(myForm)
export default myForm