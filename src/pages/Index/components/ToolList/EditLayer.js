import React from 'react';
import { Radio, List } from 'antd';
import { inject, observer } from 'mobx-react';
import {
    DATA_LAYER_MAP,
    TOP_VIEW_DISABLED_LAYERS
} from 'src/config/DataLayerConfig';
import { getEditLayers } from 'src/utils/permissionCtrl';
import ToolIcon from 'src/components/ToolIcon';
import 'src/assets/less/home.less';

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
        const { layerPicker, clicked } = this.state;
        const { DataLayerStore } = this.props;
        const { getEditLayer, updateKey } = DataLayerStore;
        //获取当前编辑图层，若无编辑图层则返回false
        const editLayer = getEditLayer();
        return (
            <span className={`bianjituceng ${editLayer ? 'active' : ''}`}>
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
                {editLayer && (
                    <div className="value-color" key={updateKey}>
                        {DATA_LAYER_MAP[editLayer && editLayer.layerName]
                            .editName || layerPicker}
                    </div>
                )}
            </span>
        );
    }

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

@inject('DataLayerStore')
@inject('ToolCtrlStore')
@inject('AttributeStore')
@inject('appStore')
@inject('VectorsStore')
@observer
class EditLayerPicker extends React.Component {
    render() {
        let { DataLayerStore } = this.props;
        let editLayer = DataLayerStore.getEditLayer();
        return (
            <Radio.Group
                onChange={this.onChange}
                value={editLayer ? editLayer.layerName : false}
                style={{ width: '100%' }}>
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
        let { DataLayerStore, VectorsStore } = this.props;

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
        return layers;
    };

    getLabel = item => {
        if (!item.value) {
            return item.label;
        }
        return DATA_LAYER_MAP[item.value]
            ? DATA_LAYER_MAP[item.value].label
            : item.value;
    };

    onChange = e => {
        const {
            DataLayerStore,
            ToolCtrlStore,
            AttributeStore,
            appStore
        } = this.props;
        const layerPicker = DATA_LAYER_MAP[e.target.value]
            ? DATA_LAYER_MAP[e.target.value].editName
            : '';
        this.props._renderValue(layerPicker);
        let userInfo = appStore.loginUser;
        let layer = DataLayerStore.activeEditor(e.target.value);
        ToolCtrlStore.updateByEditLayer(layer, userInfo);
        AttributeStore.hide();
        AttributeStore.hideRelFeatures();
    };
}

export default EditLayer;
