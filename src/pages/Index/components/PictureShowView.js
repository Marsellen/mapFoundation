import React from 'react';
import { inject, observer } from 'mobx-react';
import RcViewer from 'src/components/RcViewer';
import IconFont from 'src/components/IconFont';
import noImg from 'src/assets/img/no-img.png';
import { completeSecendUrl } from 'src/utils/taskUtils';

@inject('TaskStore')
@inject('PictureShowStore')
@inject('DataLayerStore')
@observer
class PictureShowView extends React.Component {
    constructor(props) {
        super(props);
        this.options = {
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
                flipVertical: 0,
                nextNode: this.next,
                prevNode: this.previous
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
            title: [4, image => `${image.alt}`],
            viewed: function() {
                //设置相对比例0.6=展示宽度/图片实际宽度
                this.viewer.zoomTo(0.28).move(0, -6.2);
            }
        };
    }

    componentDidMount() {
        this.addListener();
    }

    componentDidUpdate() {
        this.addListener();
    }

    addListener = () => {
        if (!this.refs.viewer) return;
        let element = this.refs.viewer.getViewer().container;
        let imgs = element.querySelectorAll('img');
        imgs.forEach((img, index) => {
            let viewer = this.refs.viewer.getViewer().viewer;
            img.onerror = function() {
                this.src = noImg;
                this.setAttribute('data-original-Url', noImg);
                viewer.update();
                viewer.view(index);
            };
        });
    };

    render() {
        const { PictureShowStore } = this.props;
        const { picData } = PictureShowStore;

        let imgs = picData.filter(img => !!img);

        return (
            <div className="img-banner">
                {imgs.length ? (
                    <RcViewer options={this.options} ref="viewer">
                        <ul id="images" style={{ display: 'none' }}>
                            {imgs.map(this._renderImg)}
                        </ul>
                    </RcViewer>
                ) : (
                    <IconFont className="icondefault" type="icon-zanwutupian" />
                )}
            </div>
        );
    }

    _renderImg = (url, index) => {
        const { TaskStore } = this.props;
        const { activeTask } = TaskStore;

        return (
            <li key={index}>
                <img src={`${completeSecendUrl(url, activeTask)}`} />
            </li>
        );
    };

    next = () => {
        const { PictureShowStore } = this.props;
        let idx = PictureShowStore.getIdx() + 1;
        this.jumpToPoint(idx);
    };

    previous = () => {
        const { PictureShowStore } = this.props;
        let idx = PictureShowStore.getIdx() - 1;
        this.jumpToPoint(idx);
    };

    jumpToPoint = idx => {
        const { PictureShowStore, DataLayerStore } = this.props;
        window.traceLayer.getPoint(idx, item => {
            window.traceLayer.unselect();
            window.traceLayer.select(idx);
            window.map.look({
                x: item.properties.x,
                y: item.properties.y,
                z: item.properties.z
            });
            PictureShowStore.setPicData(item);
        });
        DataLayerStore.exitEdit();
    };
}
export default PictureShowView;
