/**
 * Created by pc on 2017/1/11.
 */
import { Table, Input, Popconfirm,Breadcrumb,Icon } from 'antd';
import { Router, Route, Link, hashHistory, IndexRoute, Redirect, IndexLink} from 'react-router';
 class EditableCell extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            value: this.props.value,
            editable: this.props.editable || false,
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.editable !== this.state.editable) {
            this.setState({ editable: nextProps.editable });
            if (nextProps.editable) {
                this.cacheValue = this.state.value;
            }
        }
        if (nextProps.status && nextProps.status !== this.props.status) {
            if (nextProps.status === 'save') {
                this.props.onChange(this.state.value);
            } else if (nextProps.status === 'cancel') {
                this.setState({ value: this.cacheValue });
                this.props.onChange(this.cacheValue);
            }
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.editable !== this.state.editable ||
            nextState.value !== this.state.value;
    }
    handleChange(e) {
        const value = e.target.value;
        this.setState({ value });
    }
    render() {
        const { value, editable } = this.state;
        return (<div>
            {
                editable ?
                    <div>
                        <Input
                            value={value}
                            onChange={e => this.handleChange(e)}
                            />
                    </div>
                    :
                    <div className="editable-row-text">
                        {value.toString() || ' '}
                    </div>
            }
        </div>);
    }
}

export default class EditableTable extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [{
            title: '姓名',
            dataIndex: 'name',
            width: '10%',
            render: (text, record, index) => this.renderColumns(this.state.data, index, 'name', text),
        }, {
            title: '年龄',
            dataIndex: 'age',
            width: '10%',
            render: (text, record, index) => this.renderColumns(this.state.data, index, 'age', text),
        }, {
            title: '地址',
            dataIndex: 'address',
            width: '70%',
            render: (text, record, index) => this.renderColumns(this.state.data, index, 'address', text),
        }, {
            title: '操作',
            dataIndex: 'operation',
            render: (text, record, index) => {
                const { editable } = this.state.data[index].name;
                return (<div className="editable-row-operations" style={{textAlign:"center"}}>
                    {
                        editable ?
                            <span>
              <a onClick={() => this.editDone(index, '保存')}>保存</a>&nbsp;|&nbsp;
              <Popconfirm title="确定取消?" onConfirm={() => this.editDone(index, '取消')}>
                  <a className='red'>取消</a>
              </Popconfirm>
            </span>
                            :
                            <span>
              <a onClick={() => this.edit(index)}>编辑</a>&nbsp;|&nbsp;<a className='red'>删除</a>
            </span>
                    }
                </div>);
            },
        }];
        this.state = {
            data: [{
                key: '0',
                name: {
                    editable: false,
                    value: 'Edward King 0',
                },
                age: {
                    editable: false,
                    value: '32',
                },
                address: {
                    value: 'London, Park Lane no. 0',
                },
            }],
            locationWidth:''
        };
    }
    componentDidMount() {
        var screenWidth=$(window).width();
        var pagelocationWidth=(screenWidth-150)+"px";
        this.setState({locationWidth:pagelocationWidth});
    }
    renderColumns(data, index, key, text) {
        const { editable, status } = data[index][key];
        if (typeof editable === 'undefined') {
            return text;
        }
        return (<EditableCell
            editable={editable}
            value={text}
            onChange={value => this.handleChange(key, index, value)}
            status={status}
            />);
    }
    handleChange(key, index, value) {
        const { data } = this.state;
        data[index][key].value = value;
        this.setState({ data });
    }
    edit(index) {
        const { data } = this.state;
        Object.keys(data[index]).forEach((item) => {
            if (data[index][item] && typeof data[index][item].editable !== 'undefined') {
                data[index][item].editable = true;
            }
        });
        this.setState({ data });
    }
    editDone(index, type) {
        const { data } = this.state;
        Object.keys(data[index]).forEach((item) => {
            if (data[index][item] && typeof data[index][item].editable !== 'undefined') {
                data[index][item].editable = false;
                data[index][item].status = type;
            }
        });
        this.setState({ data }, () => {
            Object.keys(data[index]).forEach((item) => {
                if (data[index][item] && typeof data[index][item].editable !== 'undefined') {
                    delete data[index][item].status;
                }
            });
        });
    }
    render() {
        const { data } = this.state;
        const dataSource = data.map((item) => {
            const obj = {};
            Object.keys(item).forEach((key) => {
                obj[key] = key === 'key' ? item[key] : item[key].value;
            });
            return obj;
        });
        const columns = this.columns;
        return (
            <div>
            <Table bordered dataSource={dataSource} columns={columns} />
                </div>
        )
    }
}
