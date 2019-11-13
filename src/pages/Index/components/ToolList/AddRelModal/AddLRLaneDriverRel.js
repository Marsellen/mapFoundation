import React from 'react';
import { Modal, Radio } from 'antd';

class AddLRLaneDriverRel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            value: 'L_LDIV'
        };
        this.props.onRef(this);
    }

    render() {
        return (
            <Modal
                title="车道中心线属性关系"
                visible={this.state.visible}
                onOk={this.onOk}
                onCancel={this.handleCancel}
                okText="确定"
                cancelText="取消"
                maskClosable={false}
                width={400}>
                {this.renderContent()}
            </Modal>
        );
    }

    renderContent = () => {
        return (
            <Radio.Group onChange={this.onChange} value={this.state.value}>
                <Radio value={'L_LDIV'}>与左侧车道线关联</Radio>
                <Radio value={'R_LDIV'}>与右侧车道线关联</Radio>
            </Radio.Group>
        );
    };

    onChange = e => {
        this.setState({ value: e.target.value });
    };

    show = options => {
        this.options = options;
        this.setState({
            visible: true
        });
    };

    handleCancel = () => {
        this.options = null;
        this.setState({
            visible: false
        });
    };

    onOk = () => {
        this.props.onOk(this.state.value, this.options);
        this.handleCancel();
    };
}

export default AddLRLaneDriverRel;