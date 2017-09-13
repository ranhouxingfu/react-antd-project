/**
 * Created by pc on 2017/1/16.
 */
import React from 'react';
import {Row,Col,Icon,message,Table,Breadcrumb,Modal} from 'antd';
import { Router, Route, Link, hashHistory, IndexRoute, Redirect, IndexLink} from 'react-router';
export default class myorderlist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            orderData: [],
            ScreenWidth: 600,
            locationWidth: "",
            visible: false,
            key:''
        };
        this.showModal = this.showModal.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillMount() {
        var self = this;
        var url = "/getorderlist.do";
        self.setState({loading: true});
        $.getJSON(url, function (result) {
            if (!result) {
                return;
            }
            var orderData = result.map(function (p) {
                return {
                    key: p.id,
                    buyer: p.buyer,
                    phonenum: p.phonenum,
                    address: p.address,
                    receivingTime: p.receivingTime,
                    delivery: p.delivery,
                    goods: p.goods,
                    unitprice: p.unitprice,
                    number: p.number,
                    totalprice: p.totalprice,
                    standard: p.standard,
                    remark: p.remark
                };
            });
            //data=userData;
            // 更新组件状态，这会触发一次render，此处只更新Pictures数组，不会删除favorites数组
            self.setState({orderData: orderData, loading: false});
        });
    }

    componentDidMount() {
        var screenWidth = $(window).width();
        var pagelocationWidth = (screenWidth - 150) + "px";
        this.setState({locationWidth: pagelocationWidth})
    }

;
    // 显示弹框
    showModal(key) {
        this.setState({visible: true, key: key})
    }

    hideModal() {
        this.setState({visible: false})
    }
    deleteRow(){
        const id = {id:this.state.key};
        var orderData=[];
        var self=this;
        $.ajax({
            url:'/delOneOrder.do',
            type:'POST',
            dataType:"json",
            data:id,
            cache:false,
            success:function(data){
                orderData=data;
                self.setState({
                    orderData: orderData,
                    visible: false
                });
                message.success('删除成功!');
            },
            error:function(){
                message.success('操作失败!');
            }
        });

    }
    //排序和搜索
    handleChange(pagination, filters, sorter) {
        this.setState({
            filteredInfo: filters,
            sortedInfo: sorter,
        });
    }

    render() {
        const self=this;
        const columns = [{
            title: '序号',
            //width: 80,
            dataIndex: 'key',
            key: 'key',
            render(text, record, index) {
                return <div style={{textAlign:"center"}}>{index + 1}</div>
            },
            //sorter: (a, b) =>a.key - b.key
        }, {
            title: '买家',
            //width: 100,
            dataIndex: 'buyer',
            key: "buyer",
            //fixed: 'right',
            render(text, record, index) {
                return <div style={{textAlign:"center"}}>{record.buyer}</div>
            }
        }, {
            title: '联系方式',
            //width: 180,
            dataIndex: 'phonenum',
            key: "phonenum",
            render(text, record, index) {
                return <div style={{textAlign:"center"}}>{record.phonenum}</div>
            },

        }, {
            title: '收货住址',
            //width: 300,
            dataIndex: 'address',
            key: "address",
            render(text, record, index) {
                return <div style={{textAlign:"left"}}>{record.address}</div>
            }
        }, {
            title: '快递',
            //width: 150,
            dataIndex: 'delivery',
            key: "delivery",
            render(text, record, index) {
                return <div style={{textAlign:"center"}}>{record.delivery}</div>
            }
        }, {
            title: '收货时间',
            //width: 180,
            dataIndex: 'receivingTime',
            key: "receivingTime",
            render(text, record, index) {
                return <div style={{textAlign:"center"}}>{record.receivingTime}</div>
            }
        }, {
            title: '商品',
            //width: 100,
            dataIndex: 'goods',
            key: "goods",
            render(text, record) {
                return <div style={{textAlign:"center"}}>{record.goods}</div>
            }
        }, {
            title: '单价',
            //width: 100,
            dataIndex: 'unitprice',
            key: "unitprice",
            render(text, record) {
                return <div style={{textAlign:"center"}}>{record.unitprice}</div>
            }
        }, {
            title: '数量',
            //width: 80,
            dataIndex: 'number',
            key: "number",
            render(text, record) {
                return <div style={{textAlign:"center"}}>{record.number}</div>
            }
        }, {
            title: '价格',
            //width: 100,
            dataIndex: 'totalprice',
            key: "totalprice",
            render(text, record) {
                return <div style={{textAlign:"center"}}>{record.totalprice}</div>
            }
        }, {
            title: '规格',
            //width: 150,
            dataIndex: 'standard',
            key: "standard",
            render(text, record) {
                return <div style={{textAlign:"center"}}>{record.standard}</div>
            }
        }, {
            title: '备注',
            //width: 200,
            dataIndex: 'remark',
            key: 'remark',
            render(text, record) {
                return <div style={{textAlign:"left"}}>{record.remark}</div>
            }
        }, {
            title: '操作',
            key: 'operation',
            width: 100,
            fixed: 'right',
            render(text, record, index) {
                return <div style={{textAlign:"center"}}><Link style={{color:"green"}}
                                                               to={{pathname:"add_order_data",query:{id:record.key}}}>编辑</Link>&nbsp;&nbsp;
                    |&nbsp;&nbsp;<a target="_blank" style={{color:"red"}} onClick={() =>{self.showModal(record.key)} }>删除</a>
                </div>
            }
        }]
        const pagination = {
            total: this.state.orderData.length,
            showSizeChanger: true,//默认显示分页，每页大小
            onShowSizeChange: (current, pageSize) => {
                console.log('Current: ', current, '; PageSize: ', pageSize);
            },
            onChange(current) {//改变当前页
                console.log(this.state)
            },
        }
        return (
            <div>
                <Table className="zy-table" columns={columns} dataSource={this.state.orderData}
                       bordered loading={this.state.loading} pagination={pagination} onChange={this.handleChange}
                       scroll={{x:1300}}
                    />
                <Modal title="删除记录" visible={this.state.visible} onOk={()=>{this.deleteRow()}}
                       onCancel={()=>{this.hideModal()}}>
                    确认删除本条记录！
                </Modal>
            </div>
        )
    }
}