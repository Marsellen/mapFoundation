import React from 'react';
import { message, Modal, Select } from 'antd';
import ToolIcon from 'src/component/common/toolIcon';
import { inject, observer } from 'mobx-react';
import AdMessage from 'src/component/common/adMessage';
import AdInputNumber from 'src/component/common/form/adInputNumber';
import { checkSdkError } from 'src/tool/vectorUtils';
import { plgCreate } from 'src/tool/relCtrl/operateCtrl';
import { logDecorator, editInputLimit, editLock } from 'src/tool/decorator';

import 'less/tool-icon.less';
import 'less/dashed-polygon-create.less';

const { Option } = Select;

const PLG_TYPE_GROUP = [
    {
        label: '单虚线',
        value: 1002
    },
    {
        label: '双虚线',
        value: 1004
    },
    {
        label: '左实右虚线',
        value: 1005
    },
    {
        label: '左虚右实线',
        value: 1006
    }
];

const key = 'dashed_polygon_create';
@inject('DataLayerStore')
@inject('AttributeStore')
@observer
class DashedPolygonCreate extends React.Component {
    constructor() {
        super();
        this.state = {
            step: 0,
            message: '',
            msgVisible: false,
            PLG_WIDTH: 0.15,
            PLG_TYPE: 1002
        };
        this.result = [];
    }

    componentDidMount() {
        const { DataLayerStore } = this.props;
        DataLayerStore.setDashedPolygonCreateCallback(this.dashedPolygonCreateCallback);
    }

    componentWillUnmount() {
        this.removeEventListener();
    }
    render() {
        const { DataLayerStore } = this.props;
        let visible = DataLayerStore.editType == 'dashed_polygon_create';
        let { message, msgVisible, PLG_WIDTH } = this.state;
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
                    {this._renderModal(PLG_WIDTH)}
                </Modal>
            </div>
        );
    }

    _renderModal = PLG_WIDTH => {
        const { PLG_TYPE } = this.state;
        return (
            <div>
                <div className="modal-flex">
                    <span>虚线面宽度</span>
                    <AdInputNumber
                        className="modal-content"
                        type="number"
                        value={PLG_WIDTH}
                        max={1}
                        min={0.01}
                        step={0.01}
                        precision={2}
                        onChange={val => this.calcWidth(val)}
                    />
                    <span>m</span>
                </div>
                <div className="modal-flex">
                    <span>虚线面类型</span>
                    <Select
                        className="modal-content"
                        value={PLG_TYPE}
                        onChange={val => {
                            this.setState({ PLG_TYPE: val });
                        }}
                    >
                        {PLG_TYPE_GROUP.map((item, index) => (
                            <Option key={index} value={item.value}>
                                {item.label}
                            </Option>
                        ))}
                    </Select>
                </div>
            </div>
        );
    };

    calcWidth = val => {
        let PLG_WIDTH = Number(val);
        if (!PLG_WIDTH || PLG_WIDTH <= 0) PLG_WIDTH = 0.01;
        if (PLG_WIDTH >= 1) PLG_WIDTH = 1.0;
        PLG_WIDTH = Number(PLG_WIDTH.toFixed(2));
        this.setState({ PLG_WIDTH });
    };

    addEventListener = () => {
        document.addEventListener('keyup', this.shiftCallback);
    };

    shiftCallback = event => {
        const { DataLayerStore } = this.props;
        if (event.key !== 'Shift' || DataLayerStore.editType !== 'dashed_polygon_create') return;
        this.calcWidth(this.state.PLG_WIDTH);
        try {
            this.check();
            this.useSdk();
        } catch (e) {
            this.setState({
                message: e.message
            });
            setTimeout(() => {
                this.setState({
                    message: '选择一根车道线，按shift进入下一步'
                });
            }, 1000);
        }
    };

    removeEventListener = () => {
        document.removeEventListener('keyup', this.shiftCallback);
    };

    check = () => {
        if (!this.result || this.result.length === 0) {
            throw new Error('未选择要素！');
        }
        if (this.result.length != 1) {
            throw new Error('只能选择一条车道线！');
        }
    };

    @editInputLimit({ editType: 'dashed_polygon_create' })
    useSdk = () => {
        const { DataLayerStore } = this.props;
        DataLayerStore.dashedPolygonCreate(1);
        this.removeEventListener();
        this.setState({
            step: 1,
            message: '在线上选择3个点，分别为虚线的实部起点、实部终点、虚部终点，点击右键完成构建',
            msgVisible: true
        });
    };

    dashedPolygonCreateCallback = async (result, event) => {
        const { step } = this.state;
        if (event.button !== 2) {
            this.result = result;
        }
        if (step == 1) {
            this.handerDashedPolygon(result, event);
            this.setState({
                step: 0,
                msgVisible: false,
                message: '',
                PLG_WIDTH: 0.15,
                PLG_TYPE: 1002
            });
        }
    };

    @logDecorator({ operate: '虚线面构建' })
    async handerDashedPolygon(pointData, event) {
        const { DataLayerStore } = this.props;
        if (event.button !== 2) return;
        try {
            const { PLG_WIDTH, PLG_TYPE } = this.state;
            checkSdkError(pointData, '请选点！');
            if (pointData.length != 3) {
                throw new Error('请选择三个点！');
            }
            message.loading({
                key,
                duration: 65,
                content: '正在构建要素...'
            });
            let LOOP_SIZE = [
                pointData[0].data.geometry.coordinates,
                pointData[1].data.geometry.coordinates,
                pointData[2].data.geometry.coordinates
            ];
            let history = await plgCreate(this.result, LOOP_SIZE, PLG_WIDTH, PLG_TYPE);
            return history;
        } catch (err) {
            BuriedPoint.toolLoadBuriedPointStart('dashed_polygon_create', 'right_click');
            BuriedPoint.toolLoadBuriedPointEnd('dashed_polygon_create', 'error');
            BuriedPoint.toolBuriedPointEnd('dashed_polygon_create', 'error');
            console.log(err);
            message.warning({ content: '虚线面构建失败：' + err.message, duration: 3, key });
            DataLayerStore.exitEdit();
            this.removeEventListener();
        }
    }

    @editLock
    action = () => {
        const { DataLayerStore, AttributeStore } = this.props;
        if (DataLayerStore.editType == 'dashed_polygon_create') return;
        this.result = [];
        AttributeStore.hideRelFeatures();
        this.addEventListener();
        DataLayerStore.dashedPolygonCreate();
        this.setState({
            step: 0,
            msgVisible: true,
            message: '选择一根车道线，按shift进入下一步'
        });
    };
}

export default DashedPolygonCreate;
