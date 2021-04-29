import React from 'react';
import { Icon, Dropdown, Checkbox } from 'antd';

import 'src/asset/less/check-select.less';

const CheckboxGroup = Checkbox.Group;

class CheckSelect extends React.Component {
    constructor(props) {
        super(props);
        let { checkedList, indeterminate, checkAll } = this.getStateFromProps(props);
        this.state = {
            checkedList,
            indeterminate,
            checkAll,
            visible: false
        };
    }

    getStateFromProps(props) {
        let { value, options } = props;
        this.optionMap = options.reduce((set, option) => {
            set[option.value] = option.label;
            return set;
        }, {});
        return {
            checkedList: value,
            indeterminate: !!value.length && value.length < options.length,
            checkAll: value.length === options.length
        };
    }

    render() {
        return (
            <div className="check-select" style={this.props.style}>
                <Dropdown
                    overlay={this.renderMenu()}
                    trigger={['click']}
                    visible={this.state.visible}
                    onVisibleChange={this.onVisibleChange}
                >
                    <div>
                        <div className="select-text">{this.getLabels()}</div>
                        <Icon type="down" />
                    </div>
                </Dropdown>
            </div>
        );
    }

    renderMenu() {
        const { options } = this.props;
        return (
            <div className="drop-menu-container" style={this.props.style}>
                <Checkbox
                    indeterminate={this.state.indeterminate}
                    onChange={this.onCheckAllChange}
                    checked={this.state.checkAll}
                >
                    全选
                </Checkbox>
                <CheckboxGroup
                    options={options}
                    value={this.state.checkedList}
                    onChange={this.onChange}
                />
            </div>
        );
    }

    onCheckAllChange = e => {
        const { options, onChange } = this.props;
        let checkedList = e.target.checked ? options.map(option => option.value) : [];
        this.setState({
            checkedList,
            indeterminate: false,
            checkAll: e.target.checked
        });
        onChange(checkedList);
    };

    onChange = checkedList => {
        const { options, onChange } = this.props;
        this.setState({
            checkedList,
            indeterminate: !!checkedList.length && checkedList.length < options.length,
            checkAll: checkedList.length === options.length
        });
        onChange(checkedList);
    };

    getLabels = () => {
        return (this.state.checkedList || []).map(value => this.optionMap[value]).join('/');
    };

    onVisibleChange = visible => {
        this.setState({ visible });
    };
}

export default CheckSelect;
