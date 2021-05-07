import 'less/tool-icon.less';
import React from 'react';
import { inject, observer } from 'mobx-react';
import { Icon } from 'antd';
import ToolIcon from 'src/component/common/toolIcon';
import AdMessage from 'src/component/common/adMessage';
import { getLayerByName, getFeatureOption, selectFeature } from 'src/tool/vectorUtils';
import { autoCreateLineByLaneDivider, updateFeatures } from 'src/tool/relCtrl/operateCtrl';
import { logDecorator, editInputLimit, editOutputLimit, editLock } from 'src/tool/decorator';
import { DATA_LAYER_MAP } from 'src/config/dataLayerConfig';

const ACTION_MAP = {
    AD_Lane: '左右车道线生成中心线',
    AD_Road: '路段中参考线生成'
};
const ICON_MAP = {
    AD_Lane: 'zuoyouchedaoxianshengchengzhongxinxian',
    AD_Road: 'luduanzhongcankaoxian'
};
const TIPS_MAP = {
    AD_Lane: '选择一对左右车道线，左右车道线应方向一致',
    AD_Road: '选择一条车道线'
};

@inject('DataLayerStore')
@inject('AttributeStore')
@observer
class DividerToAutoCreate extends React.Component {
    constructor(props) {
        super(props);
        this.createLineByDivider = this.createLineByDivider.bind(this);
        this.drawLine = this.drawLine.bind(this);
        this.historyLog = null;
        this.state = {
            visible: false
        };
    }

    componentDidMount() {
        const { DataLayerStore } = this.props;
        DataLayerStore.setAroundCallback(this.aroundCallback);
    }

    @editLock
    action = () => {
        const { DataLayerStore, AttributeStore } = this.props;
        if (DataLayerStore.editType == 'new_around_line') return;
        AttributeStore.hide('other_close');
        AttributeStore.hideRelFeatures();
        DataLayerStore.newAroundLine();
        this.setState({ visible: true });
    };

    aroundCallback = async (result, event) => {
        if (event.button !== 2) return false;
        await this.createLineByDivider(result);
        this.activeLine(this.historyLog);
        this.setState({ visible: false });
    };

    @editInputLimit({ editType: 'new_around_line' })
    @logDecorator({ operate: ACTION_MAP })
    async createLineByDivider(result) {
        const { DataLayerStore } = this.props;
        const layerName = DataLayerStore.getAdEditLayerName();
        const layerNameCN = DATA_LAYER_MAP[layerName].label;
        if (
            !(result.length === 2 && layerName == 'AD_Lane') &&
            !(result.length === 1 && layerName == 'AD_Road')
        ) {
            throw new Error(`${layerNameCN}生成失败`);
        }
        let AD_LaneDivider = {
            type: 'FeatureCollection',
            features: []
        };
        result.forEach(item => {
            AD_LaneDivider.features.push(item.data);
        });
        let historyLog = await autoCreateLineByLaneDivider(layerName, { AD_LaneDivider });
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

    content = layerName => {
        const text = TIPS_MAP[layerName];
        return (
            <label>
                <Icon type="info-circle" /> {text}
            </label>
        );
    };

    render() {
        const { updateKey, editType, getAdEditLayerName } = this.props.DataLayerStore;
        const visible = editType == 'new_around_line' && this.state.visible;
        const layerName = getAdEditLayerName();

        return (
            <div
                id="divider-to-auto-create"
                className="flex-1"
                onClick={this.action}
                key={updateKey}
            >
                <ToolIcon icon={ICON_MAP[layerName]} />
                <div>{ACTION_MAP[layerName]}</div>
                <AdMessage visible={visible} content={this.content(layerName)} />
            </div>
        );
    }
}

export default DividerToAutoCreate;
