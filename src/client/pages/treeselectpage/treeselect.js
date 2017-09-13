/**
 * Created by pc on 2017/1/12.
 */
/**
 * Created by pc on 2016/12/13.
 */
import React from 'react';
//var React=require('react')
import { TreeSelect,Row,Col,Tree ,Icon,Breadcrumb} from 'antd';
import { Router, Route, Link, hashHistory, IndexRoute, Redirect, IndexLink} from 'react-router';
const SelectTreeNode=TreeSelect.TreeNode;
const TreeNode=Tree.TreeNode;
export default class myTreeselect extends React.Component{
    constructor(props){
        super(props);
        //this.Props = {
        //      keys: ['0-0-0', '0-0-1']
        //  }
        const keys = this.props.keys;
        this.state={
            value:undefined,
            vaule1:undefined,
            value2:"0-0-0",
            treeData1:[],
            treeData2:[],
            defaultExpandedKeys: keys,
            defaultSelectedKeys: keys,
            defaultCheckedKeys: keys,
            autoExpandParent:true,
            locationWidth:''
        };
        this.onChange=this.onChange.bind(this);
        this.onChangeChild=this.onChangeChild.bind(this);
    }
    componentDidMount(){
        const treeData1 = [{
            label: 'Node1',
            value: '0-0',
            key: '0-0',
            children: [{
                label: 'Child Node1',
                value: '0-0-1',
                key: '0-0-1',
            }, {
                label: 'Child Node2',
                value: '0-0-2',
                key: '0-0-2',
            }],
        }, {
            label: 'Node2',
            value: '0-1',
            key: '0-1',
        }];
        const treeData2=[{
            label: 'list1',
            value: '0-0',
            key: '0-0',
            children: [{
                label: 'Child list1',
                value: '0-0-0',
                key: '0-0-0',
            }, {
                label: 'Child list2',
                value: '0-0-1',
                key: '0-0-1',
            }, {
                label: 'Child list3',
                value: '0-0-2',
                key: '0-0-2',
            }, {
                label: 'Child list4',
                value: '0-0-3',
                key: '0-0-3',
            }]
        },{
            label: 'list2',
            value: '0-1',
            key: '0-1'
        }];
        var screenWidth=$(window).width();
        var pagelocationWidth=(screenWidth-150)+"px";
        this.setState({treeData1:treeData1,treeData2:treeData2,locationWidth:pagelocationWidth});
        //console.log(this.state)
    }
    onChange(value) {
        this.setState({ vaule1:value });
    }
    onChangeChild(value){
        this.setState({value2:value})
    }
    render(){
        const tProps = {
            treeData:this.state.treeData2,
            value: this.state.value2,
            onChange: this.onChangeChild,
            multiple: true,
            treeCheckable: true,
            showCheckedStrategy:TreeSelect.SHOW_PARENT,
            searchPlaceholder: 'Please select',
            style: {
                width: 300,
            },
        }
        return(
            <div>
                <Row>
                    <h3>下拉树</h3>
                    <Col span={6}>
                        <TreeSelect style={{width:300}}  treeDefaultExpandAll>
                            <SelectTreeNode title="parent 1" value="parent 1" key="0-1">
                                <SelectTreeNode title="parent 1-0" key="0-1-1" value="parent 1-0">
                                    <SelectTreeNode value="left1" title="first left" key="random" ></SelectTreeNode>
                                    <SelectTreeNode value="left2" title="thecond left" key="random1" ></SelectTreeNode>
                                </SelectTreeNode>
                            </SelectTreeNode>
                            <SelectTreeNode title="parent 2" value="parent 2" key="0-2">
                                <SelectTreeNode title="parent 2-0" key="0-2-1" value="parent 1-1">
                                    <SelectTreeNode value="right1" title="third left" key="random3" ></SelectTreeNode>
                                    <SelectTreeNode value="right2" title="forth left" key="random4" ></SelectTreeNode>
                                </SelectTreeNode>
                            </SelectTreeNode>
                        </TreeSelect>
                    </Col>
                    <Col span={6}>
                        <TreeSelect
                            style={{ width: 300 }}
                            value={this.state.vaule1}
                            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                            treeData={this.state.treeData1}
                            placeholder="Please select"
                            treeDefaultExpandAll
                            onChange={this.onChange}
                            />
                    </Col>
                    <Col span={6}>
                        <TreeSelect {...tProps} />
                    </Col>
                </Row>
                <Row>
                    <h3>基本树</h3>
                    <Col span={6}>
                        <Tree className="myCls" showLine checkable
                              defaultExpandedKeys={this.state.defaultExpandedKeys}
                              defaultSelectedKeys={this.state.defaultSelectedKeys}
                              defaultCheckedKeys={this.state.defaultCheckedKeys}
                              autoExpandParent={this.state.autoExpandParent}
                            >
                            <TreeNode title="parent 1" key="0-0">
                                <TreeNode title="parent 1-0" key="0-0-0" disabled>
                                    <TreeNode title="leaf" key="0-0-0-0" disableCheckbox />
                                    <TreeNode title="leaf" key="0-0-0-1" />
                                </TreeNode>
                                <TreeNode title="parent 1-1" key="0-0-1">
                                    <TreeNode title={<span style={{ color: '#08c' }}>sss</span>} key="0-0-1-0" />
                                </TreeNode>
                            </TreeNode>
                        </Tree>
                    </Col>
                </Row>
            </div>
        )
    }
}