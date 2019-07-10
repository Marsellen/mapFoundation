import React from 'react';
import { inject, observer } from 'mobx-react';
import RcViewer from 'rc-viewer';

@inject('taskStore')
@inject('PictureShowStore')
@observer
class PictureShowView extends React.Component {
    render() {
        activeTaskId;
        const { PictureShowStore, taskStore } = this.props;
        const { picData } = PictureShowStore;
        const { activeTaskId } = taskStore;
        const options = {
            inline: true, //内联模式
            button: false,
            navbar: false,
            title: false,
            toolbar: {
                //工具栏
                zoomIn: 1,
                zoomOut: 1,
                oneToOne: 1,
                reset: 1,
                prev: 0,
                play: 0,
                next: 0,
                rotateLeft: 0,
                rotateRight: 0,
                flipHorizontal: 0,
                flipVertical: 0
            },
            tooltip: false,
            rotatable: false,
            fullscreen: false,
            backdrop: true, //控制背景
            minWidth: 580,
            zoomRatio: 1,
            minZoomRatio: 0.1, //最小比例
            maxZoomRatio: 3 //最大比例
        };
        const methods = {
            ready: function() {
                // 2 methods are available here: "show" and "destroy".
            },
            shown: function() {
                // 9 methods are available here: "hide", "view", "prev", "next", "play", "stop", "full", "exit" and "destroy".
            },
            viewed: function() {
                // All methods are available here except "show".
                // this.viewer.zoomTo(1).rotateTo(180);
                const { viewer } = this.refs.viewer.getViewer();
                viewer.zoom(0.1);
            }
        };
        return (
            <div className="img-banner">
                <RcViewer options={options} methods={methods}>
                    <img src={`${activeTaskId}/tracks/middle/${picData}`} />
                </RcViewer>
            </div>
        );
    }
}
export default PictureShowView;
