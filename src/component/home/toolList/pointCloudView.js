import React from 'react';
import { inject, observer } from 'mobx-react';
import ToolIcon from 'src/component/common/toolIcon';
import { getLayersByNames, getAllLayersExByName } from 'src/util/vectorUtils';
import { LINE_LAYERS } from 'src/config/dataLayerConfig';
import { message } from 'antd';

@inject('TaskStore')
@inject('DataLayerStore')
@inject('ToolCtrlStore')
@inject('AttributeStore')
@inject('RightMenuStore')
@observer
class pointCloudView extends React.Component {
    render() {
        const { DataLayerStore } = this.props;
        const { isPCVVisible } = DataLayerStore;
        return (
            <div>
                <ToolIcon
                    id="top-view-btn"
                    icon="dianyuncengji"
                    title="加载点云"
                    placement="left"
                    className="ad-icon-topview"
                    visible={isPCVVisible}
                    action={this.action}
                />
            </div>
        );
    }

    action = async () => {
        if (!window.map) return;
        const {
            DataLayerStore: { isPCVVisible, PCViewMode, initPointCloud },
            TaskStore: { dataPrepareSearch }
        } = this.props;
        PCViewMode(!isPCVVisible);
        if (!isPCVVisible) {
            if (window.nowPointCloudLayer) return window.nowPointCloudLayer.show();
            //加载点云
            const { min, max } = window.extent;
            // console.log(min, max);
            const params = {
                region: {
                    type: 'FeatureCollection',
                    features: [
                        {
                            type: 'Feature',
                            geometry: {
                                type: 'Polygon',
                                coordinates: [
                                    [
                                        [...min],
                                        [max[0], min[1]],
                                        [...max],
                                        [min[0], max[1]],
                                        [...min]
                                    ]
                                ]
                            }
                        }
                    ]
                }
            };
            const data = await dataPrepareSearch(params);
            if (data && data.length > 0) {
                const urlArr = data?.map(item => item.las['LiDAR_1-PAN64'].dataPath) || [];
                initPointCloud(urlArr);
            } else {
                message.info('暂无匹配点云数据！');
                PCViewMode(false);
            }
        } else {
            if (window.nowPointCloudLayer) return window.nowPointCloudLayer.hide();
            //关闭点云
        }
    };
}

export default pointCloudView;
