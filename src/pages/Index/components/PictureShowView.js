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
            // button: false,
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
            tooltip: false, //放大或缩小时显示具有图像比率（百分比）的工具提示
            rotatable: false, //旋转图像
            fullscreen: true, //全屏
            transition: false, //过渡
            backdrop: true, //控制背景
            minWidth: 580,
            zoomRatio: 0.1, //通过旋转鼠标缩放图像时定义比率
            minZoomRatio: 0.1, //最小比例
            maxZoomRatio: 3, //最大比例
            viewed: function() {
                this.viewer.zoomTo(0.58);
            }
        };
        return (
            <div className="img-banner">
                <RcViewer options={options}>
                    <img
                        src={`${activeTaskId}/tracks/middle/${picData}`}
                    />
                </RcViewer>
            </div>
        );
    }
}
export default PictureShowView;
