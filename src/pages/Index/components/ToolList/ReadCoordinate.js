import React from 'react';
import IconFont from 'src/components/IconFont';
import { inject, observer } from 'mobx-react';
import AdMessage from 'src/components/AdMessage';
import AdTips from 'src/components/AdTips';
import 'less/components/tool-icon.less';

@inject('DataLayerStore')
@observer
class ReadCoordinate extends React.Component {
    render() {
        const { DataLayerStore } = this.props;
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
            <div id="read-coordinate-btn" className="flex-1" onClick={this.action}>
                <IconFont type="icon-zuobiaoshiqu" />
                <div>坐标拾取</div>
                <AdMessage visible={visible} content={this.content()} />
                <AdTips
                    visible={visible}
                    content={content}
                    position={coordinateViewPosition}
                />
            </div>
        );
    }

    action = () => {
        if (this.props.disabled) return;
        const { DataLayerStore } = this.props;
        DataLayerStore.startReadCoordinate();
    };

    content = () => {
        return <label>坐标拾取，按esc退出</label>;
    };
}

export default ReadCoordinate;
