/**
 * Created by pc on 2017/1/6.
 */
import React from 'react';
//var React=require('react')
import {Table, Icon,Modal,Popconfirm,Collapse ,Input,Button,Select,DatePicker,message,Breadcrumb} from 'antd'
import { Router, Route, Link, hashHistory, IndexRoute, Redirect, IndexLink} from 'react-router';
const Panel = Collapse.Panel;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;
//import myHome from '../homepage/home';
//var $ = require('../libs/js/jquery-1.10.2.min').default;
var data=[];
class myTable extends React.Component {
    defaultProps() {
        return {
            name: "auto"
        };
    }

    constructor(props) {
        super(props)//个人理解super()是继承了整个类的一个引用
        this.state = {//初始状态
            userData:[],
            selectedRowKeys: [],
            visible: false,
            key: "",
            filteredInfo: "",
            sortedInfo: "",
            ScreenHeight: $(window).height() - $(".searchCollapse").height() - 250,
            searchText: "",
            filterDropdownVisible: false,
            loading:false,
            locationWidth:"",
        }

        this.onSelectChange = this.onSelectChange.bind(this)//绑定改变复选框状态
        this.handleChange = this.handleChange.bind(this);
        this.handleSlectChange = this.handleSlectChange.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.deleteRow = this.deleteRow.bind(this);
        this.hideModal = this.hideModal.bind(this)
    }
componentWillMount(){
    var self=this;
    var url="/gettable.do";
    self.setState({ loading:true });
    $.getJSON(url, function(result){
        if(!result){
            return;
        }
        var userData = result.map(function(p){
            return {
                key: p.id,
                username:p.username,
                userage: p.userage,
                useraddress: p.useraddress,
                remark: p.remark
            };
        });
        //data=userData;
        // 更新组件状态，这会触发一次render，此处只更新Pictures数组，不会删除favorites数组
        self.setState({ userData: userData,loading:false});
    });
}
componentDidMount(){
    var screenWidth=$(window).width();
    var pagelocationWidth=(screenWidth-150)+"px";
    this.setState({locationWidth:pagelocationWidth})
}

//查询条件
    onInputChange(e) {
        this.setState({searchText: e.target.value})
    }

//表头搜索
    onSearch() {
        const {searchText,userData}=this.state;
        const reg = new RegExp(searchText, 'gi');//正则表达式
        this.setState({
            filterDropdownVisible: false,
            userData:userData.map((record) => {
                const matchName = record.username.match(reg);
                if (!matchName) {
                    return null
                }
                return {
                    key: record.key,
                    userage: record.userage,
                    useraddress: record.useraddress,
                    remark: record.remark,
                    operate: record.operate,
                    username: (
                        <span>
              {record.username.split(reg).map((text, i) => (
                  i > 0 ? [<span className="highlight" key={i}>{matchName[0]}</span>, text] : text
              ))}
            </span>
                    ),
                }
            }).filter(record => !!record)
        })
    }

// checkbox状态
    onSelectChange(selectedRowKeys) {
        this.setState({selectedRowKeys})
    }
//selsect
    handleSlectChange(value) {
        console.log(`selected ${value}`);
    }

    // 显示弹框
    showModal(key) {
        this.setState({visible: true, key: key})
    }

    //排序和搜索
    handleChange(pagination, filters, sorter) {
        this.setState({
            filteredInfo: filters,
            sortedInfo: sorter,
        });
    }

//删除特定行
    deleteRow() {
        const index = {index:this.state.key};
        var userData=[];
        var self=this;
        $.ajax({
            url:'/deltablerow.do',
            type:'POST',
            dataType:"json",
            data:index,
            cache:false,
            success:function(data){
                userData=data;
                self.setState({
                    userData: userData,
                    visible: false
                });
                message.success('删除成功!');
            },
            error:function(){
                message.success('操作失败!');
            }
        });
    }

//日期插件
    onDateChange(date, dateString) {
        //console.log(date, dateString);
    }

    // 隐藏弹框
    hideModal() {
        this.setState({visible: false})
    }

    render() {//初始化表格宽度和列名
        let self = this;
        let { sortedInfo, filteredInfo } = this.state;
        sortedInfo = sortedInfo || {};
        filteredInfo = filteredInfo || {};
        const columns = [{
            title: '序号',
            width: '8%',
            dataIndex: 'key',
            key: 'key',
            render(text, record, index) {
                return <div style={{textAlign:"center"}}>{index+1}</div>
            },
            sorter: (a, b) =>a.key - b.key
        }, {
            title: '姓名',
            width: '10%',
            dataIndex: 'username',
            key: "username",
            render(text, record, index) {
                return <div style={{textAlign:"center"}}>{record.username}</div>
            },
            filterDropdown: (
                <div className="custom-filter-dropdown">
                    <Input
                        placeholder="Search name"
                        value={this.state.searchText}
                        onChange={this.onInputChange}
                        onPressEnter={this.onSearch}
                        />
                    <Button type="primary" onClick={this.onSearch}>查询</Button>
                </div>
            ),
            filterDropdownVisible: this.state.filterDropdownVisible,
            onFilterDropdownVisibleChange: visible => this.setState({filterDropdownVisible: visible}),
        }, {
            title: '年龄',
            width: '10%',
            dataIndex: 'userage',
            key: "userage",
            render(text, record, index) {
                return <div style={{textAlign:"center"}}>{record.userage}</div>
            },
            sorter: (a, b) => a.userage - b.userage,
            //sortOrder: sortedInfo.columnKey === 'age' && sortedInfo.order,

        }, {
            title: '住址',
            width: '30%',
            dataIndex: 'useraddress',
            key: "useraddress",
            filters: [
                {text: '西湖区湖底公园2号', value: '西湖区湖底公园2号'},
                {text: '西湖区湖底公园22号', value: '西湖区湖底公园22号'},
            ],
            filteredValue: filteredInfo.useraddress,
            onFilter: (value, record) => record.useraddress.includes(value),
            sorter: (a, b) => a.useraddress.length - b.useraddress.length,
            //sortOrder: sortedInfo.columnKey === 'address' && sortedInfo.order,
            render(text, record, index) {
                return <div style={{textAlign:"left"}}>{record.useraddress}</div>
            }
        }, {
            title: '备注',
            //width: '20%',
            dataIndex: 'remark',
            render(text,record) {
                return <a href={text} target="_blank" style={{textAlign:"center"}}>{record.remark}</a>
            }
        }, {
            title: '操作',
            key: 'operation',
            width: 100,
            fixed: 'right',
            render(text, record, index) {
                return <div style={{textAlign:"center"}}><Link style={{color:"green"}}
                                                               to={{pathname:"add_table_data",query:{id:record.key}}}>编辑</Link>&nbsp;&nbsp;
                    |&nbsp;&nbsp;<a target="_blank" style={{color:"red"}} onClick={() =>{self.showModal(record.key)} }>删除</a>
                </div>
            }
        }]
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange
        }
        const pagination = {
            total: this.state.userData.length,
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
                <Collapse style={{marginBottom:"5px"}} className="searchCollapse" onChange={this.searchChangeHeight}>
                    <Panel header="查询条件" defaultActiveKey={['1']}>
                        <span>姓名：<Input style={{width:120}}/></span>
                        <span>所在单位： <Select size="large" defaultValue="lucy" style={{ width: 150}}
                                            onChange={this.handleSlectChange}>
                            <Option value="jack">Jack</Option>
                            <Option value="lucy">Lucy</Option>
                            <Option value="disabled" disabled>Disabled</Option>
                            <Option value="yiminghe">Yiminghe</Option>
                        </Select></span>
                        <span>起始日期：  <DatePicker onChange={this.onDateChange}/>
                               截止日期<DatePicker onChange={this.onDateChange}/></span>
                    </Panel>
                </Collapse>
                <Table className="zy-table" rowSelection={rowSelection} columns={columns} dataSource={this.state.userData}
                       bordered loading={this.state.loading} pagination={pagination} onChange={this.handleChange}
                       scroll={{ y: this.state.ScreenHeight }}/>
                <Modal title="删除记录" visible={this.state.visible} onOk={()=>{this.deleteRow()}}
                       onCancel={()=>{this.hideModal()}}>
                    确认删除本条记录！
                </Modal></div>
        )
    }
}
export default myTable;

