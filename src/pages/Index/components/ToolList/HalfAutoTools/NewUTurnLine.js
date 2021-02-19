import React from 'react';
import ToolIcon from 'src/components/ToolIcon';
import { inject, observer } from 'mobx-react';
import { getLayerIDKey, getLayerByName } from 'src/utils/vectorUtils';
import { Modal, Icon, message } from 'antd';
import { autoCreateLine, updateFeatures } from 'src/utils/relCtrl/operateCtrl';
import AdMessage from 'src/components/AdMessage';
import 'less/components/tool-icon.less';
import 'less/components/uturn-line.less';
import AdInputNumber from 'src/components/Form/AdInputNumber';
import { DATA_LAYER_MAP } from 'src/config/DataLayerConfig';
import { logDecorator, editInputLimit, editOutputLimit, editLock } from 'src/utils/decorator';

const ACTION_MAP = {
    AD_Lane: '掉头中心线生成',
    AD_Road: '掉头参考线生成'
};

const TIPS_MAP = {
    AD_Lane: '先选择一条进入中心线，再选择一条退出中心线',
    AD_Road: '先选择一条进入参考线，再选择一条退出参考线'
};
@inject('DataLayerStore')
@inject('AttributeStore')
@observer
class NewUTurnLine extends React.Component {
    constructor() {
        super();
        this.state = {
            visibleModal: false,
            num: 8.0,
            visible: false
        };
    }

    componentDidMount() {
        const { DataLayerStore } = this.props;
        DataLayerStore.setUTurnCallback((result, event) => {
            if (event.button !== 2) return false;
            this.handleData(result);
        });
        DataLayerStore.setNewUturnExitEvent(() => {
            this.setState({
                visibleModal: false,
                num: 8.0
            });
        });
    }
    render() {
        const reg = new RegExp('^[1-9]\\d{0,9}(\\.\\d{1,2})?$|^0(\\.\\d{1,2})?$');
        let { visibleModal, num, visible } = this.state;
        const { DataLayerStore } = this.props;
        const { updateKey } = DataLayerStore;
        visible = DataLayerStore.editType == 'new_Uturn_line' && visible; //掉头
        let editLayer = DataLayerStore.getEditLayer();
        let layerName = editLayer && editLayer.layerName;

        return (
            <div id="new-uturn-line" key={updateKey} onClick={this.action} className="flex-1">
                <ToolIcon icon="diaotou" />
                <div>{ACTION_MAP[layerName]}</div>
                <AdMessage visible={visible} content={this.content()} />
                <Modal
                    className="set-length"
                    title="跨路口延伸长度设置"
                    visible={visibleModal}
                    width={255}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    maskClosable={false}
                    keyboard={false}
                    okText="确定"
                    cancelText="取消"
                >
                    <div className="set-length-number">
                        <AdInputNumber
                            width="66%"
                            type="number"
                            value={num}
                            step={0.01}
                            onChange={this.inputChange}
                        />
                    </div>
                    <span className="unit">m</span>
                    <p id="checkNumber">
                        {num < 0.01
                            ? '延伸长度必须大于0'
                            : !reg.test(num)
                            ? ' 请输入数字，如有小数请精确到小数点后两位'
                            : ''}
                    </p>
                </Modal>
            </div>
        );
    }

    @editInputLimit({ editType: 'new_Uturn_line' })
    @logDecorator({ operate: ACTION_MAP, onlyRun: true })
    handleData(result) {
        const { DataLayerStore } = this.props;
        let editLayer = DataLayerStore.getEditLayer();
        let layerName = editLayer && editLayer.layerName;
        let layerNameCN = DATA_LAYER_MAP[layerName].label;
        if (result.length !== 2) {
            message.error(`操作错误：应选择 2 条${layerNameCN}`);
            throw new Error(`操作错误：应选择 2 条${layerNameCN}`);
        }
        let params = {};
        params[layerName] = {};
        params[layerName].type = 'FeatureCollection';
        params[layerName].features = [];
        result.forEach(item => {
            params[layerName].features.push(item.data);
        });
        //转弯
        let type = layerName == 'AD_Lane' ? 'crsLaneType' : 'crsRoadType';
        params[type] = 3;
        this.setState({
            visibleModal: true,
            params: params
        });
    }

    @editLock
    action = () => {
        const { DataLayerStore, AttributeStore } = this.props;
        if (DataLayerStore.editType == 'new_Uturn_line') return;
        DataLayerStore.newUTurnLine();
        AttributeStore.hide();
        AttributeStore.hideRelFeatures();
        this.setState({ visible: true });
    };

    handleOk = () => {
        const reg = new RegExp('^[0-9]+.?[0-9]*$');
        const { num, params } = this.state;
        if (num < 0.01 || !reg.test(num)) return false;
        params.extDistance = num;
        this.setState({
            visibleModal: false,
            visible: false
        });
        this.addLines(params);
    };

    handleCancel = () => {
        const { DataLayerStore } = this.props;
        this.setState({
            visibleModal: false,
            num: 8.0
        });
        DataLayerStore.exitEdit();
    };

    inputChange = val => {
        const reg = new RegExp('^[1-9]\\d{0,9}(\\.\\d{1,2})?$|^0(\\.\\d{1,2})?$');
        const checkNumber = document.getElementById('checkNumber');
        if (val < 0.01 || !reg.test(val)) {
            checkNumber.style.display = 'block';
        } else {
            checkNumber.style.display = 'none';
        }
        this.setState({
            num: val
        });
    };

    // 新建
    @logDecorator({ operate: ACTION_MAP })
    async addLines(params) {
        const { DataLayerStore } = this.props;
        let editLayer = DataLayerStore.getEditLayer();
        let layerName = editLayer && editLayer.layerName;
        let layerNameCN = DATA_LAYER_MAP[layerName].label;
        try {
            message.loading({
                content: '正在构建要素...',
                key: 'new_Uturn_line',
                duration: 0
            });
            let historyLog = await autoCreateLine(layerName, params);
            await this.drawLine(historyLog.features[1], historyLog);
            this.activeLine(layerName, historyLog);

            message.success({
                content: `${layerNameCN}生成成功`,
                key: 'new_Uturn_line',
                duration: 3
            });
            return historyLog;
        } catch (e) {
            message.error({
                content: `${layerNameCN}生成失败：${e.message}`,
                key: 'new_Uturn_line',
                duration: 3
            });
            throw new Error(`${layerNameCN}生成失败：${e.message}`);
        }
    }

    @editOutputLimit()
    async drawLine(outputData, historyLog) {
        await updateFeatures(historyLog);
    }

    // 显示新构建出的道路线并为选中状态
    activeLine = (layerLine, historyLog) => {
        let layerName = historyLog.features[1][0].layerName;
        let value =
            historyLog.features[1][0].data.properties[
                layerLine === 'AD_Lane' ? 'LANE_ID' : 'ROAD_ID'
            ];
        let IDKey = getLayerIDKey(layerName);
        let option = {
            key: IDKey,
            value: value
        };
        let layer = getLayerByName(layerName);
        let result = layer.getFeatureByOption(option);
        if (result) {
            let feature = result.properties;
            this.showAttributesModal(feature);
        } else {
            message.warning('所在图层与用户编号不匹配！', 3);
        }
    };

    showAttributesModal = async obj => {
        const { AttributeStore, DataLayerStore } = this.props;
        let editLayer = DataLayerStore.getEditLayer();
        let readonly = (editLayer && editLayer.layerName !== obj.layerName) || !editLayer;
        DataLayerStore.clearHighLightFeatures();
        DataLayerStore.clearPick();
        await AttributeStore.setModel(obj);
        DataLayerStore.setFeatureColor(obj, 'rgb(255,134,237)');
        AttributeStore.show(readonly);
    };

    content = () => {
        const { DataLayerStore } = this.props;
        let editLayer = DataLayerStore.getEditLayer();
        let layerName = editLayer && editLayer.layerName;
        const text = TIPS_MAP[layerName];
        return (
            <label>
                <Icon type="info-circle" /> {text}
            </label>
        );
    };
}

export default NewUTurnLine;
