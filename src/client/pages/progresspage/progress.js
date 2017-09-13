/**
 * Created by pc on 2017/1/12.
 */
/**
 * Created by pc on 2017/1/12.
 */
/**
 * Created by pc on 2016/12/12.
 */
import React from 'react';
//var React=require('react')
import { Steps, Button, message,Row,Col,Icon ,Slider, Switch,InputNumber,Progress,Breadcrumb } from 'antd';
import { Router, Route, Link, hashHistory, IndexRoute, Redirect, IndexLink} from 'react-router';
const Step = Steps.Step;
const ButtonGroup = Button.Group;
export default class mySteps extends React.Component {
    constructor(props) {
        super(props)//个人理解super()是继承了整个类的一个引用
        this.state = {//初始状态
            current: 0,
            steps: [{
                title: 'First',
                content: 'First-content',
            }, {
                title: 'Second',
                content: 'Second-content',
            }, {
                title: 'Last',
                content: 'Last-content',
            }],
            disabled: false,
            inputValue: 0,
            marks:{},
            percent:0,
            percent1:0,
            locationWidth:''
        }
        this.NumChange=this.NumChange.bind(this);
        this.increase= this.increase.bind(this);
        this.decline=this.decline.bind(this);
        this.increase1= this.increase1.bind(this);
        this.decline1=this.decline1.bind(this);
    }
    componentWillMount(){
        const marks = {
            0: '0°C',
            26: '26°C',
            37: '37°C',
            40: '50°C',
            100: {
                style: {
                    color: '#f50',
                },
                label: <strong>100°C</strong>,
            }
        }
        this.setState({marks:marks})
    }
    componentDidMount() {
        var screenWidth=$(window).width();
        var pagelocationWidth=(screenWidth-150)+"px";
        this.setState({locationWidth:pagelocationWidth})
    }
    next() {
        const current = this.state.current + 1;
        this.setState({current});
    }

    prev() {
        const current = this.state.current - 1;
        this.setState({current});
    }

    NumChange(value) {
        this.setState({inputValue: value})
    }
    increase() {
        let percent = this.state.percent + 10;
        if (percent > 100) {
            percent = 100;
        }
        this.setState({ percent:percent });
    }
    decline() {
        let percent = this.state.percent - 10;
        if (percent < 0) {
            percent = 0;
        }
        this.setState({percent: percent });
    }
    increase1() {
        let percent = this.state.percent1 + 10;
        if (percent > 100) {
            percent = 100;
        }
        this.setState({ percent1:percent });
    }
    decline1() {
        let percent = this.state.percent1 - 10;
        if (percent < 0) {
            percent = 0;
        }
        this.setState({percent1: percent });
    }
    render() {
        const { current } = this.state;
        const {steps}= this.state;
        //console.log( {steps})
        return (
            <div>
                <h3>steps</h3>
                <Row>
                    <Col span={12}>
                        <Steps current={1}>
                            <Step title="Finished" description="This is a description."/>
                            <Step title="In Progress" description="This is a description."/>
                            <Step title="Waiting" description="This is a description."/>
                        </Steps>
                    </Col>
                    <Col span={12}>
                        <Steps size='small'>
                            <Step status="finish" title="Login" icon={<Icon type="user" />}/>
                            <Step status="finish" title="Verification" icon={<Icon type="solution" />}/>
                            <Step status="process" title="Pay" icon={<Icon type="credit-card" />}/>
                            <Step status="wait" title="Done" icon={<Icon type="smile-o" />}/>
                        </Steps>
                    </Col>
                </Row>
                <Row style={{marginTop:"15px"}}>
                    <Col span={24}>
                        <Steps current={this.state.current}>
                            {steps.map(item => <Step key={item.title} title={item.title}/>)}
                        </Steps>

                        <div className="steps-content">{steps[this.state.current].content}</div>
                        <div className="steps-action">
                            {
                                this.state.current < steps.length - 1 && <Button type="primary" onClick={() => this.next()}>Next</Button>
                            }
                            {
                                this.state.current === steps.length - 1 && <Button type="primary" onClick={() => message.success('Processing complete!')}>Done</Button>
                            }
                            {
                                this.state.current > 0 && <Button style={{ marginLeft: 8 }} type="ghost" onClick={() => this.prev()}>Previous</Button>
                            }
                        </div>
                    </Col>
                </Row>

                <h3 style={{marginTop:"10px"}}>Slider</h3>
                <Row>
                    <Col lg={{span:11}} sm={{span:24}}>
                        <Slider defaultValue={30} disabled={this.state.disabled}/>
                    </Col>
                    <Col lg={{span:11,offset:2}} sm={{span:24}}>
                        <Col span={12}>
                            <Slider min={1} max={20} onChange={this.NumChange} value={this.state.inputValue}/>
                        </Col>
                        <Col span={4}>
                            <InputNumber min={1} max={20} style={{ marginLeft: 16 }} step={1} value={this.state.inputValue} onChange={this.NumChange}/>
                        </Col>
                    </Col>
                </Row>
                <Row>
                    <Col lg={{span:11}} sm={{span:24}}>
                        <h4>included=true</h4>
                        <Slider marks={this.state.marks} defaultValue={37} />
                        <h4>included=false</h4>
                        <Slider marks={this.state.marks} included={false} defaultValue={37} />
                        <h4>marks and step</h4>
                        <Slider marks={this.state.marks} step={10} defaultValue={37} />
                        <h4>step=null</h4>
                        <Slider marks={this.state.marks} step={null} defaultValue={37} />
                    </Col>
                </Row>
                <h3 style={{marginTop:"10px"}}>progress</h3>
                <Row>
                    <Col lg={{span:11}} sm={{span:24}}>
                        <div>
                            <Progress percent={30} />
                            <Progress percent={50} status="active" />
                            <Progress percent={70} status="exception" />
                            <Progress percent={100} />
                            <Progress percent={50} showInfo={false} />
                        </div>

                    </Col>
                    <Col lg={{span:11,offset:2}} sm={{span:24}}>
                        <Col span={24}>
                            <div>
                                <Progress percent={this.state.percent1} />
                                <ButtonGroup>
                                    <Button type="ghost" onClick={this.decline1} icon="minus" />
                                    <Button type="ghost" onClick={this.increase1} icon="plus" />
                                </ButtonGroup>
                            </div>
                        </Col>
                        <Col lg={{span:16}} sm={{span:9}}>
                            <div>
                                <Progress type="circle" percent={75} width={80}/>
                                <Progress type="circle" percent={70} width={80} status="exception" />
                                <Progress type="circle" percent={100} width={80} />
                            </div>
                        </Col>
                        <Col lg={{span:8}} sm={{span:6}}>
                            <div>
                                <Progress type="circle" percent={this.state.percent} width={80}/>
                                <ButtonGroup>
                                    <Button type="ghost" onClick={this.decline} icon="minus" />
                                    <Button type="ghost" onClick={this.increase} icon="plus" />
                                </ButtonGroup>
                            </div>
                        </Col>
                    </Col>
                </Row>
            </div>
        );
    }
}
