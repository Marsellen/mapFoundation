import React from 'react';
import { Checkbox, List } from 'antd';
import { inject, observer } from 'mobx-react';
import {
    RESOURCE_LAYER_TRACK,
    RESOURCE_LAYER_VECTOR,
    RESOURCE_LAYER_BOUNDARY,
    RESOURCE_LAYER_POINT_CLOUD
} from 'src/config/DataLayerConfig';
import 'src/assets/less/components/resource-layer.less';
import ToolIcon from 'src/components/ToolIcon';

@inject('AttributeStore')
@inject('ResourceLayerStore')
@inject('DataLayerStore')
@inject('VectorsStore')
@observer
class ResourceLayer extends React.Component {
    render() {
        const { ResourceLayerStore } = this.props;
        const { updateKey, layers } = ResourceLayerStore;

        return (
            <div>
                <List
                    key={updateKey}
                    dataSource={layers}
                    renderItem={(item, index) => {
                        const { value, checked, layerMap } = item;
                        if (value === '多工程') {
                            return this._multiProjectResource(layerMap);
                        } else {
                            return (
                                <div key={`resource_${index}`}>
                                    <Checkbox
                                        value={value}
                                        checked={checked}
                                        onChange={e =>
                                            this.handleChange(e, item)
                                        }>
                                        {value}
                                    </Checkbox>
                                </div>
                            );
                        }
                    }}
                />
            </div>
        );
    }

    _multiProjectResource = layerMap => {
        const { ResourceLayerStore } = this.props;
        const { activeProjectName } = ResourceLayerStore;
        const sortProjectsTracks = Object.keys(layerMap).sort();
        const isSingleProject = sortProjectsTracks.length === 1;
        return sortProjectsTracks.map((projectName, index) => {
            const currentLayerMap = layerMap[projectName];
            const { point_clouds, track } = currentLayerMap;
            const isAcitveLinkTrack = activeProjectName === projectName;
            const currentLayerArr = Object.values(currentLayerMap);
            const allChecked = currentLayerArr.every(item => item.checked);
            const allUnChecked = currentLayerArr.every(item => !item.checked);
            return (
                <dl
                    className={`projects-resource-wrap ${
                        isSingleProject ? 'single-project' : ''
                    }`}
                    key={`multi_project_${index}`}>
                    <dt>
                        <Checkbox
                            value="工程"
                            indeterminate={!allChecked && !allUnChecked}
                            checked={allChecked}
                            onChange={e =>
                                this.handleProjectsChange(e, projectName)
                            }>
                            工程{index + 1}：{projectName}
                        </Checkbox>
                    </dt>
                    {point_clouds && (
                        <dd>
                            <Checkbox
                                value="点云"
                                checked={point_clouds.checked}
                                onChange={e =>
                                    this.handleChange(e, point_clouds)
                                }>
                                点云
                            </Checkbox>
                        </dd>
                    )}
                    {track && (
                        <dd>
                            <Checkbox
                                value="轨迹"
                                checked={track.checked}
                                onChange={e => this.handleChange(e, track)}>
                                轨迹
                            </Checkbox>
                            {isAcitveLinkTrack && (
                                <div className="lock-icon-wrap">
                                    <ToolIcon
                                        className="lock-icon"
                                        icon="guanlian"
                                    />
                                </div>
                            )}
                        </dd>
                    )}
                </dl>
            );
        });
    };

    handleProjectsChange = (e, projectName) => {
        const { ResourceLayerStore, DataLayerStore } = this.props;
        const { projectsToggleAll } = ResourceLayerStore;
        const { checked } = e.target;
        projectsToggleAll(projectName, checked);
        DataLayerStore.exitReadCoordinate();
    };

    handleChange = (e, layerItem) => {
        const { ResourceLayerStore, DataLayerStore, VectorsStore } = this.props;
        const { toggle, projectsToggle } = ResourceLayerStore;
        const { toggleAll } = VectorsStore;
        const { checked } = e.target;
        const { value } = layerItem;

        switch (value) {
            case RESOURCE_LAYER_VECTOR: //高精地图
                toggleAll(checked, 'vector');
                toggle(value, checked);
                break;
            case RESOURCE_LAYER_BOUNDARY: //周边底图
                toggleAll(checked, 'boundary');
                toggle(value, checked);
                break;
            case RESOURCE_LAYER_POINT_CLOUD: //点云
                projectsToggle(layerItem, checked);
                DataLayerStore.exitReadCoordinate();
                break;
            case RESOURCE_LAYER_TRACK: //轨迹
                projectsToggle(layerItem, checked);
                break;
            default:
                toggle(value, checked);
                break;
        }
    };
}

export default ResourceLayer;
