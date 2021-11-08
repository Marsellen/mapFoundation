import React from 'react';
import { Modal, Radio } from 'antd';
import { inject, observer } from 'mobx-react';
import BuriedPoint from 'src/util/buriedPoint';

var relType = 'L_LDIV';

@inject('DataLayerStore')
@observer
class AddLRLaneDriverRel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            value: relType
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
                width={400}
            >
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
        relType = e.target.value;
        this.setState({ value: e.target.value });
    };

    show = options => {
        this.options = options;
        this.setState({
            visible: true
        });
    };

    handleCancel = e => {
        const { DataLayerStore } = this.props;
        this.options = null;
        this.setState({
            visible: false
        });
        let channel = 'close';
        if (e.keyCode) channel = 'esc';
        if (e.currentTarget.className === 'ant-btn') channel = 'cancel';
        if (e.currentTarget.className === 'ant-modal-close') channel = 'close';
        DataLayerStore.exitEdit(channel);
    };

    onOk = () => {
        BuriedPoint.toolLoadBuriedPointStart('new_rel', 'right_click');
        this.props.onOk(this.state.value, this.options);
        this.options = null;
        this.setState({
            visible: false
        });
    };
}

export default AddLRLaneDriverRel;
