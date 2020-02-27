import React from 'react';
import ToolIcon from 'src/components/ToolIcon';
import { inject, observer } from 'mobx-react';
import AdMessage from 'src/components/AdMessage';
import AdTips from 'src/components/AdTips';
import 'less/components/tool-icon.less';

@inject('DataLayerStore')
@inject('ResourceLayerStore')
@inject('TaskStore')
@observer
class ReadCoordinate extends React.Component {
    render() {
        const { TaskStore, DataLayerStore, ResourceLayerStore } = this.props;
        const { activeTaskId } = TaskStore;
        const { pointCloudChecked } = ResourceLayerStore;
        const {
            coordinateViewPosition,
            readCoordinateResult: coordinate
        } = DataLayerStore;
        let visible = DataLayerStore.editType == 'read_coordinate';
        let content = coordinate
            ? `x: ${coordinate.x.toFixed(3)}, y: ${coordinate.y.toFixed(
                  3
              )}, z: ${coordinate.z.toFixed(3)}`
            : null;
        return (
            <span>
                <ToolIcon
                    id="read-coordinate-btn1"
                    icon="zuobiaoshiqu"
                    title="坐标拾取"
                    className="ad-tool-icon"
                    focusBg={true}
                    visible={visible}
                    action={this.action}
                    disabled={!activeTaskId || !pointCloudChecked}
                />
                <AdMessage visible={visible} content={this.content()} />
                <AdTips
                    visible={visible}
                    content={content}
                    position={coordinateViewPosition}
                />
            </span>
        );
    }

    action = () => {
        const { DataLayerStore } = this.props;
        DataLayerStore.startReadCoordinate();
    };

    content = () => {
        return <label>坐标拾取，按esc退出</label>;
    };
}

export default ReadCoordinate;
