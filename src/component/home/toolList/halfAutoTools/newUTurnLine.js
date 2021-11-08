import React from 'react';
import ToolIcon from 'src/component/common/toolIcon';
import { inject, observer } from 'mobx-react';
import { getLayerByName, getFeatureOption, selectFeature } from 'src/util/vectorUtils';
import { Modal, Icon } from 'antd';
import { autoCreateLine, updateFeatures } from 'src/util/relCtrl/operateCtrl';
import AdMessage from 'src/component/common/adMessage';
import 'less/tool-icon.less';
import 'less/uturn-line.less';
import AdInputNumber from 'src/component/common/form/adInputNumber';
import { DATA_LAYER_MAP } from 'src/config/dataLayerConfig';
import { logDecorator, editInputLimit, editOutputLimit, editLock } from 'src/util/decorator';

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
    constructor(props) {
        super(props);
        this.handleData = this.handleData.bind(this);
        this.addLines = this.addLines.bind(this);
        this.drawLine = this.drawLine.bind(this);
        this.historyLog = null;
        this.state = {
            visibleModal: false,
            num: 8.0,
            visible: false,
            result: null
        };
    }

    componentDidMount() {
        const { DataLayerStore } = this.props;
        DataLayerStore.setUTurnCallback(this.uTurnCallback);
        DataLayerStore.setNewUturnExitEvent(() => {
            this.setState({
                visibleModal: false,
                num: 8.0
            });
        });
    }

    @editLock
    action = () => {
        const { DataLayerStore, AttributeStore } = this.props;
        if (DataLayerStore.editType == 'new_Uturn_line') return;
        DataLayerStore.newUTurnLine();
        AttributeStore.hide('other_close');
        AttributeStore.hideRelFeatures();
        this.setState({ visible: true });
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

    handleOk = async () => {
        const reg = new RegExp('^[0-9]+.?[0-9]*$');
        const { num } = this.state;
        if (num < 0.01 || !reg.test(num)) return false;
        this.setState({
            visibleModal: false,
            visible: false
        });
        await this.addLines();
        this.activeLine(this.historyLog);
    };

    handleCancel = () => {
        const { DataLayerStore } = this.props;
        this.setState({
            visibleModal: false,
            num: 8.0
        });
        DataLayerStore.exitEdit();
    };

    uTurnCallback = (result, event) => {
        if (event.button !== 2) return false;
        this.handleData(result);
    };

    @editInputLimit({ editType: 'new_Uturn_line' })
    @logDecorator({ operate: ACTION_MAP, onlyRun: true })
    handleData(result) {
        const { DataLayerStore } = this.props;
        const layerName = DataLayerStore.getAdEditLayerName();
        const layerNameCN = DATA_LAYER_MAP[layerName].label;
        if (result.length !== 2) {
            throw new Error(`操作错误：应选择 2 条${layerNameCN}`);
        }
        this.setState({
            visibleModal: true,
            result
        });
    }

    // 新建
    @logDecorator({ operate: ACTION_MAP, doubleLog: true })
    async addLines() {
        const { num, result } = this.state;
        const { DataLayerStore } = this.props;
        const layerName = DataLayerStore.getAdEditLayerName();
        let params = {};
        params[layerName] = {};
        params[layerName].type = 'FeatureCollection';
        params[layerName].features = [];
        result.forEach(item => {
            params[layerName].features.push(item.data);
        });
        let type = layerName == 'AD_Lane' ? 'crsLaneType' : 'crsRoadType';
        params[type] = 3;
        params.extDistance = num;
        let historyLog = await autoCreateLine(layerName, params);
        this.historyLog = historyLog;
        await this.drawLine(historyLog.features[1], historyLog);
        return historyLog;
    }

    @editOutputLimit()
    async drawLine(outputData, historyLog) {
        await updateFeatures(historyLog);
    }

    // 显示新构建出的道路线并为选中状态
    activeLine = historyLog => {
        if (!historyLog) return;
        const _feature = historyLog.features[1][0];
        const layer = getLayerByName(_feature.layerName);
        const option = getFeatureOption(_feature);
        const feature = layer.getFeatureByOption(option);
        feature && selectFeature(feature.properties);
    };

    content = () => {
        const { DataLayerStore } = this.props;
        const layerName = DataLayerStore.getAdEditLayerName();
        const text = TIPS_MAP[layerName];
        return (
            <label>
                <Icon type="info-circle" /> {text}
            </label>
        );
    };

    render() {
        let { visibleModal, num, visible } = this.state;
        const reg = new RegExp('^[1-9]\\d{0,9}(\\.\\d{1,2})?$|^0(\\.\\d{1,2})?$');
        const { DataLayerStore } = this.props;
        const { updateKey } = DataLayerStore;
        const layerName = DataLayerStore.getAdEditLayerName();
        visible = DataLayerStore.editType == 'new_Uturn_line' && visible; //掉头

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
}

export default NewUTurnLine;
