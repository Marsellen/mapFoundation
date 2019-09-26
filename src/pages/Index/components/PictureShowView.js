import React from 'react';
import { inject, observer } from 'mobx-react';
import RcViewer from 'rc-viewer';
import IconFont from 'src/components/IconFont';

@inject('TaskStore')
@inject('PictureShowStore')
@observer
class PictureShowView extends React.Component {
    render() {
        const { PictureShowStore, TaskStore } = this.props;
        const { picData } = PictureShowStore;
        const { activeTaskId } = TaskStore;
        const options = {
            inline: true, //内联模式
            // button: false,//右上角全屏
            navbar: false,
            // title: false,
            toolbar: {
                //工具栏
                zoomIn: 1,
                zoomOut: 1,
                oneToOne: 1,
                reset: 1,
                prev: 1,
                play: 0,
                next: 1,
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
            minWidth: 600,
            zoomRatio: 0.1, //通过旋转鼠标缩放图像时定义比率
            minZoomRatio: 0.1, //最小比例
            maxZoomRatio: 3, //最大比例
            viewed: function() {
                //设置相对比例0.6=展示宽度/图片实际宽度
                this.viewer.zoomTo(0.28).move(0, -6.2);
            }
        };
        return (
            <div className="img-banner">
                {this.isArrPresent(picData) ? (
                    <RcViewer options={options} ref="viewer">
                        <ul id="images">
                            {picData.map((url, index) => {
                                return (
                                    <li key={index}>
                                        <img src={`${activeTaskId}/${url}`} />
                                    </li>
                                );
                            })}
                            )
                        </ul>
                    </RcViewer>
                ) : (
                    <IconFont className="icondefault" type="icon-zanwutupian" />
                )}
            </div>
        );
    }

    isArrPresent(arr) {
        return arr.reduce((sum, item) => {
            return sum || !!item;
        }, false);
    }
}
export default PictureShowView;
