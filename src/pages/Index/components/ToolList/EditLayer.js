import React from 'react';
import { Radio, List } from 'antd';
import { inject, observer } from 'mobx-react';
import { DATA_LAYER_MAP, TOP_VIEW_DISABLED_LAYERS } from 'src/config/DataLayerConfig';
import { getEditLayers } from 'src/utils/permissionCtrl';
import ToolIcon from 'src/components/ToolIcon';
import 'src/assets/less/home.less';

const EDIT_LAYER = [
    'AD_Road',
    'AD_LaneDivider',
    'AD_Lane',
    'AD_LaneAttrPoint',
    'AD_Arrow',
    'AD_StopLocation',
    'AD_LaneMark_Plg',
    'AD_TrafficLight',
    'AD_RS_Barrier',
    'AD_Map_QC'
];

@inject('DataLayerStore')
@inject('TaskStore')
@observer
class EditLayer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clicked: false,
            layerPicker: ''
        };
    }

    hide = () => {
        this.setState({
            clicked: false
        });
    };

    handleClickChange = visible => {
        if (this.disEditable()) return;
        this.setState({
            clicked: visible
        });
    };

    render() {
        const { clicked } = this.state;
        const { DataLayerStore } = this.props;
        const { getEditLayer, updateKey } = DataLayerStore;
        //获取当前编辑图层，若无编辑图层则返回false
        const editLayer = getEditLayer();
        const layerName = editLayer && editLayer.layerName;
        const isActive = layerName && EDIT_LAYER.includes(layerName);
        return (
            <span className={`bianjituceng ${isActive ? 'active' : ''}`}>
                <ToolIcon
                    icon="bianji3"
                    title="设置编辑图层"
                    disabled={this.disEditable()}
                    visible={clicked}
                    popover={{
                        placement: 'bottom',
                        visible: clicked,
                        onVisibleChange: this.handleClickChange,
                        content: this._renderContent(),
                        trigger: 'click'
                    }}
                />
                <div key={updateKey}>{isActive && this._renderLayerName(editLayer)}</div>
            </span>
        );
    }

    _renderLayerName = editLayer => {
        if (!editLayer) return null;
        const { layerName } = editLayer;
        const layerInfo = DATA_LAYER_MAP[layerName];
        if (!layerInfo) return null;
        const { layerPicker } = this.state;
        const layerNameLabel = layerInfo.editName || layerPicker;
        return <div className="value-color">{layerNameLabel}</div>;
    };

    _renderValue = layerPicker => {
        this.setState({
            layerPicker
        });
    };

    _renderContent() {
        return <EditLayerPicker _renderValue={this._renderValue} />;
    }

    disEditable = () => {
        const { TaskStore } = this.props;
        const { activeTaskId, isValidTask, isEditableTask } = TaskStore;
        return !activeTaskId || !isValidTask || !isEditableTask;
    };
}

@inject('QCMarkerStore')
@inject('DataLayerStore')
@inject('ToolCtrlStore')
@inject('AttributeStore')
@inject('appStore')
@inject('VectorsStore')
@inject('TaskStore')
@observer
class EditLayerPicker extends React.Component {
    render() {
        let { DataLayerStore } = this.props;
        let editLayer = DataLayerStore.getEditLayer();
        return (
            <Radio.Group
                onChange={this.onChange}
                value={editLayer ? editLayer.layerName : false}
                style={{ width: '100%' }}
            >
                <List
                    key={DataLayerStore.updateKey}
                    dataSource={this.topViewLayerDisabled()}
                    renderItem={item => (
                        <div>
                            <Radio value={item.value} disabled={item.disabled}>
                                {this.getLabel(item)}
                            </Radio>
                        </div>
                    )}
                />
            </Radio.Group>
        );
    }

    topViewLayerDisabled = () => {
        let { DataLayerStore, VectorsStore, TaskStore } = this.props;
        let layers = VectorsStore.vectors.vector;
        layers = getEditLayers(layers);
        const { isTopView } = DataLayerStore;
        if (isTopView) {
            layers
                .filter(item => {
                    return TOP_VIEW_DISABLED_LAYERS.includes(item.value);
                })
                .forEach(item => {
                    item.disabled = true;
                });
        }
        if (
            TaskStore.activeTask.processName === 'imp_recognition' &&
            !TaskStore.activeTask.isLocal
        ) {
            layers.forEach(item => {
                if (item.value === 'AD_Road' || item.value === 'AD_Lane') {
                    item.disabled = true;
                }
            });
        }
        return layers;
    };

    getLabel = item => {
        if (!item.value) {
            return item.label;
        }
        return DATA_LAYER_MAP[item.value] ? DATA_LAYER_MAP[item.value].label : item.value;
    };

    onChange = e => {
        const {
            DataLayerStore: { getEditLayerName, exitMarker, activeEditor },
            ToolCtrlStore: { updateByEditLayer },
            AttributeStore: { hide, hideRelFeatures },
            appStore: { loginUser },
            QCMarkerStore: { editStatus }
        } = this.props;
        //如果上一个编辑图层是标注图层，则退出标注图层
        const editLayerName = getEditLayerName();
        if (editStatus || editLayerName === 'AD_Marker') {
            exitMarker();
        }
        //切换编辑图层
        const value = e.target.value;
        const layerPicker = DATA_LAYER_MAP[value] ? DATA_LAYER_MAP[value].editName : '';
        this.props._renderValue(layerPicker);
        const layer = activeEditor(value);
        updateByEditLayer(layer, loginUser);
        hide();
        hideRelFeatures();
    };
}

export default EditLayer;
