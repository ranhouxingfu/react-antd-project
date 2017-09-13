/**
 * Created by pc on 2017/1/11.
 */
/**
 * Created by pc on 2016/12/30.
 */
import React from 'react';
import {Table, Icon,Modal,Popconfirm,Input,Button,message,Breadcrumb} from 'antd';
import { Router, Route, Link, hashHistory, IndexRoute, Redirect, IndexLink} from 'react-router';
export default class goodsdescription extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            goodsData: [],
            loading:false,
            visible:false,
            key:'',
            locationWidth:''
        };
        this.showModal=this.showModal.bind(this);
        this.deleteRow = this.deleteRow.bind(this);
        this.hideModal = this.hideModal.bind(this)
    }

    componentWillMount() {
        var self = this;
        var url = "/getgoods.do";
        self.setState({loading: true});
        $.getJSON(url, function (result) {
            if (!result) {
                return;
            }
            var goodsData = result.map(function (result) {
                return {
                    key: result.id,
                    name: result.g_name,
                    description: result.g_goodsdescription,
                    order: result.g_order
                };
            });
            //data=userData;
            // 更新组件状态，这会触发一次render，此处只更新Pictures数组，不会删除favorites数组
            self.setState({goodsData: goodsData, loading: false});
        });
    }

    componentDidMount() {
        var screenWidth=$(window).width();
        var pagelocationWidth=(screenWidth-150)+"px";
        this.setState({locationWidth:pagelocationWidth})
    }
// 显示弹框
    showModal(key) {
        this.setState({visible: true, key: key})
    }
    //删除特定行
    deleteRow() {
        debugger;
        const index = {index:this.state.key};
        console.log(index);
        var goodsData=[];
        var self=this;
        $.ajax({
            url:'/delgoods.do',
            type:'POST',
            dataType:"json",
            data:index,
            cache:false,
            success:function(data){
                goodsData=data;
                self.setState({
                    goodsData: goodsData,
                    visible: false
                });
                message.success('删除成功!');
            },
            error:function(){
                message.success('操作失败!');
            }
        });
    }


    // 隐藏弹框
    hideModal() {
        this.setState({visible: false})
    }
    render() {
        const self=this;
        const columns = [
            {
                title: '序号',
                width: '5%',
                dataIndex: 'key',
                key: 'key',
                render(text, record, index) {
                    return <div style={{textAlign:"center"}}>{index+1}</div>
                },
                //sorter: (a, b) =>a.key - b.key
            }, {
                title: '名字',
                width: '20%',
                dataIndex: 'name',
                key: 'name',
                render(text, record, index) {
                    return <div style={{textAlign:"center"}}>{record.name}</div>
                }
            }, {
                title: '描述',
                width: '55%',
                dataIndex: 'description',
                key: 'description ',
            }, {
                title: '排序',
                dataIndex: 'order',
                key: 'order',
                //width: '5%',
                render(text, record, index) {
                    return <div style={{textAlign:"center"}}>{record.order}</div>
                },
                sorter: (a, b) =>a.order - b.order
            }, {
                title: '操作',
                key: 'operation',
                width: 100,
                fixed: 'right',
                render(text, record, index) {
                    return <div style={{textAlign:"center"}}><Link style={{color:"green"}}
                                                                   to={{pathname:"myForm",query:{name:'name'}}}>编辑</Link>&nbsp;&nbsp;
                        |&nbsp;&nbsp;<a target="_blank" style={{color:"red"}} onClick={() =>{self.showModal(record.key)}}>删除</a></div>
                }
            }

        ];
        const pagination = {
            total: this.state.goodsData.length,
            showSizeChanger: true,//默认显示分页，每页大小
            onShowSizeChange: (current, pageSize) => {
                console.log('Current: ', current, '; PageSize: ', pageSize);
            },
            onChange(current) {//改变当前页
                //console.log(this.state)
            },

        }
        return (
            <div>
            <Table className="zy-table" columns={columns} dataSource={this.state.goodsData} bordered
                   pagination={pagination}/>
                <Modal title="删除记录" visible={this.state.visible} onOk={()=>{this.deleteRow()}}
                       onCancel={()=>{this.hideModal()}}>
                    确认删除本条记录！
                </Modal>
                </div>
        )
    }
}
