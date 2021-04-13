import React from 'react';
import ToolIcon from 'src/components/ToolIcon';
import { inject, observer } from 'mobx-react';
import { getLayerByName, getFeatureOption, selectFeature } from 'src/utils/vectorUtils';
import { Icon } from 'antd';
import { autoCreateLine, updateFeatures } from 'src/utils/relCtrl/operateCtrl';
import AdMessage from 'src/components/AdMessage';
import 'less/components/tool-icon.less';
import 'less/components/uturn-line.less';
import { DATA_LAYER_MAP } from 'src/config/DataLayerConfig';
import { logDecorator, editInputLimit, editOutputLimit, editLock } from 'src/utils/decorator';

const ACTION_MAP = {
    AD_Lane: '路口内直行中心线生成',
    AD_Road: '路口内直行参考线生成'
};

const TIPS_MAP = {
    AD_Lane: '先选择一条进入中心线，再选择一条退出中心线',
    AD_Road: '先选择一条进入参考线，再选择一条退出参考线'
};

@inject('DataLayerStore')
@inject('AttributeStore')
@observer
class NewStraightLine extends React.Component {
    constructor(props) {
        super(props);
        this.handleData = this.handleData.bind(this);
        this.drawLine = this.drawLine.bind(this);
        this.historyLog = null;
        this.state = {
            visible: false
        };
    }

    componentDidMount() {
        const { DataLayerStore } = this.props;
        DataLayerStore.setStraightCallback(this.straightCallback);
    }

    @editLock
    action = () => {
        const { DataLayerStore, AttributeStore } = this.props;
        if (DataLayerStore.editType == 'new_straight_line') return;
        AttributeStore.hide('other_close');
        AttributeStore.hideRelFeatures();
        DataLayerStore.newStraightLine();
        this.setState({ visible: true });
    };

    straightCallback = async (result, event) => {
        if (event.button !== 2) return false;
        await this.handleData(result);
        this.activeLine(this.historyLog);
        this.setState({ visible: false });
    };

    @editInputLimit({ editType: 'new_straight_line' })
    @logDecorator({ operate: ACTION_MAP })
    async handleData(result) {
        const { DataLayerStore } = this.props;
        const layerName = DataLayerStore.getAdEditLayerName();
        const layerNameCN = DATA_LAYER_MAP[layerName].label;
        if (result.length !== 2) {
            throw new Error(`操作错误：应选择 2 条${layerNameCN}`);
        }
        let params = {};
        params[layerName] = {};
        params[layerName].type = 'FeatureCollection';
        params[layerName].features = [];
        result.forEach(item => {
            params[layerName].features.push(item.data);
        });
        let type = layerName == 'AD_Lane' ? 'crsLaneType' : 'crsRoadType';
        params[type] = 1;
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
        const { DataLayerStore } = this.props;
        const { updateKey } = DataLayerStore;
        const visible = DataLayerStore.editType == 'new_straight_line' && this.state.visible;
        const layerName = DataLayerStore.getAdEditLayerName();

        return (
            <div id="new-straight-line" key={updateKey} onClick={this.action} className="flex-1">
                <ToolIcon icon="zhixing1" />
                <div>{ACTION_MAP[layerName]}</div>
                <AdMessage visible={visible} content={this.content()} />
            </div>
        );
    }
}

export default NewStraightLine;
