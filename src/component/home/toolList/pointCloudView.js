import React from 'react';
import { inject, observer } from 'mobx-react';
import ToolIcon from 'src/component/common/toolIcon';
import { getLayersByNames, getAllLayersExByName } from 'src/util/vectorUtils';
import { LINE_LAYERS } from 'src/config/dataLayerConfig';

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
        if (!isPCVVisible) {
            if (window.pointCloudLayer) return window.pointCloudLayer.show();
            //加载点云
            const { min, max } = window.map.getScreenBox();
            // const params = {
            //     region: {
            //         type: 'FeatureCollection',
            //         features: [
            //             {
            //                 type: 'Feature',
            //                 geometry: {
            //                     type: 'Polygon',
            //                     coordinates: [
            //                         [
            //                             [...min, 1],
            //                             [max[0], min[1], 1],
            //                             [...max, 1],
            //                             [min[0], max[1], 1],
            //                             [...min, 1]
            //                         ]
            //                     ]
            //                 }
            //             }
            //         ]
            //     }
            // };
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
                                        [13518600.647115381, 3651565.895589719, 1],
                                        [13521821.058935942, 3651565.895589719, 1],
                                        [13521821.058935942, 3654786.3074102807, 1],
                                        [13518600.647115381, 3654786.3074102807, 1],
                                        [13518600.647115381, 3651565.895589719, 1]
                                    ]
                                ]
                            }
                        }
                    ]
                }
            };
            const data = await dataPrepareSearch(params);
            const urlArr = data.map(item => item.las['LiDAR_1-PAN64'].dataPath);
            initPointCloud(urlArr);
        } else {
            if (window.pointCloudLayer) return window.pointCloudLayer.hide();
            //关闭点云
        }
        PCViewMode(!isPCVVisible);
    };
}

export default pointCloudView;
