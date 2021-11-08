import React from 'react';
import { Radio, List } from 'antd';
import { inject, observer } from 'mobx-react';
import {
    DATA_LAYER_MAP,
    IMP_RECOGNITION_DISABLED_LAYERS,
    EDIT_LAYER_TYPE_MAP
} from 'src/config/dataLayerConfig';
import ToolIcon from 'src/component/common/toolIcon';
import { getEditableLayerConfig } from 'src/util/taskUtils';
import { editLock } from 'src/util/decorator';

import 'src/asset/less/home.less';

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
        const { updateKey } = DataLayerStore;
        //获取当前编辑图层，若无编辑图层则返回false
        const editLayer = DataLayerStore.adEditLayer;
        const layerName = editLayer && editLayer.layerName;
        const isActive = !!layerName;
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
@inject('VectorsStore')
@inject('TaskStore')
@observer
class EditLayerPicker extends React.Component {
    render() {
        let { DataLayerStore } = this.props;
        const { updateKey } = DataLayerStore;
        let editLayer = DataLayerStore.adEditLayer;
        return (
            <Radio.Group
                key={updateKey}
                onChange={this.onChange}
                value={editLayer ? editLayer.layerName : false}
                style={{ width: '100%' }}
            >
                <Radio value={false}>不启用</Radio>
                <div className="flex flex-row">{this.renderLayersContent()}</div>
            </Radio.Group>
        );
    }

    renderLayersContent() {
        const layerConfig = getEditableLayerConfig();
        return Object.keys(layerConfig).map(key => {
            return (
                <div key={key} className="flex flex-column">
                    <label style={{ fontWeight: 'bold', lineHeight: '30px' }}>
                        {EDIT_LAYER_TYPE_MAP[key]}
                    </label>
                    <List dataSource={layerConfig[key]} renderItem={this.renderLayerList} />
                </div>
            );
        });
    }

    renderLayerList = layerName => {
        return (
            <div>
                <Radio value={layerName} disabled={this.layerDisabled(layerName)}>
                    {this.getLabel(layerName)}
                </Radio>
            </div>
        );
    };

    layerDisabled(layerName) {
        const { TaskStore } = this.props;
        const { activeTask } = TaskStore;
        if (activeTask.processName === 'imp_recognition' && !activeTask.isLocal) {
            if (IMP_RECOGNITION_DISABLED_LAYERS.includes(layerName)) {
                return true;
            }
        }
        return false;
    }

    getLabel = layerName => {
        return DATA_LAYER_MAP[layerName] ? DATA_LAYER_MAP[layerName].label : layerName;
    };

    @editLock
    onChange = e => {
        const { DataLayerStore, ToolCtrlStore, AttributeStore } = this.props;
        const value = e.target.value;
        const layerPicker = DATA_LAYER_MAP[value] ? DATA_LAYER_MAP[value].editName : '';
        this.props._renderValue(layerPicker);
        const layer = DataLayerStore.activeEditor({
            layer: value,
            channel: 'button',
            toolChannel: 'toggle'
        });
        ToolCtrlStore.updateByEditLayer(layer);
        AttributeStore.hide();
        AttributeStore.hideRelFeatures();
    };
}

export default EditLayer;
