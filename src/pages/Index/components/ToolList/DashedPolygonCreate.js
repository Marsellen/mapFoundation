import React from 'react';
import { Modal, Select } from 'antd';
import ToolIcon from 'src/components/ToolIcon';
import { inject, observer } from 'mobx-react';
import AdMessage from 'src/components/AdMessage';
import AdInputNumber from 'src/components/Form/AdInputNumber';
import 'less/components/tool-icon.less';
import 'less/components/dashed-polygon-create.less';

const { Option } = Select;

const DASHED_TYPE = [
    {
        label: '单虚线',
        value: 1
    },
    {
        label: '双虚线',
        value: 2
    },
    {
        label: '左实右虚线',
        value: 3
    },
    {
        label: '左虚右实线',
        value: 4
    }
];

@inject('DataLayerStore')
@observer
class DashedPolygonCreate extends React.Component {
    constructor() {
        super();
        this.state = {
            message: '',
            msgVisible: false
        }
    }
    render() {
        const { DataLayerStore } = this.props;
        let visible = DataLayerStore.editType == 'dashed_polygon_create';
        let { message, msgVisible } = this.state;
        msgVisible = visible && msgVisible;
        return (
            <div id="dashed-polygon-create" className="flex-1" onClick={this.action}>
                <ToolIcon icon="xuxianmiangoujian" />
                <div>虚线面构建</div>
                <AdMessage visible={msgVisible} content={message} />
                <Modal
                    className="modal"
                    wrapClassName="modal-wrap"
                    title="虚线面构建"
                    visible={visible}
                    footer={null}
                    mask={false}
                    closable={false}
                    zIndex={999}
                    width={318}
                    maskClosable={false}
                >
                    {this._renderModal()}
                </Modal>
            </div>
        )
    }

    _renderModal = () => {
        return (
            <div>
                <div className="modal-flex">
                    <span>虚线面宽度</span>
                    <AdInputNumber 
                        className="modal-content"
                        type="number"
                        defaultValue={0.15}
                        max={1}
                        min={0.01}
                        step={0.01}
                     />
                     <span>m</span>
                </div>
                <div className="modal-flex">
                    <span>虚线面类型</span>
                    <Select className="modal-content">
                        {
                            DASHED_TYPE.map((item, index) => (
                                <Option key={index} value={item.value}>{item.label}</Option>
                            ))
                        }
                    </Select>
                </div>
            </div>
        )
    }

    action = () => {
        const { DataLayerStore } = this.props;
        if (DataLayerStore.editType == 'dashed_polygon_create') return;
        DataLayerStore.dashedPolygonCreate();
        this.setState({
            msgVisible: true,
            message: '选择一根车道线 或 几何层：车道线线要素，按shift进入下一步'
        });
    }
}

export default DashedPolygonCreate;
