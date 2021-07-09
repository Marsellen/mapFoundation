import React from 'react';
import { inject, observer } from 'mobx-react';
import RcViewer from 'src/component/common/rcViewer';
import noImg from 'src/asset/img/no-img.png';
import { completeSecendUrl } from 'src/tool/taskUtils';
import { locatePicture } from 'src/tool/pictureCtrl';
import { message } from 'antd';
import 'src/asset/less/picture-show-view.less';
import SetLinkTrackModal from 'src/component/home/setLinkTrackModal';

const titleMap = [
    {
        className: 'viewer-prev-node',
        title: '上一轨迹点'
    },
    {
        className: 'viewer-next-node',
        title: '下一轨迹点'
    },
    {
        className: 'viewer-locate-picture',
        title: '点云照片联动'
    },
    {
        className: 'viewer-zoom-in',
        title: '放大'
    },
    {
        className: 'viewer-zoom-out',
        title: '缩小'
    },
    {
        className: 'viewer-one-to-one',
        title: '还原真实图片大小'
    },
    {
        className: 'viewer-reset',
        title: '还原'
    },
    {
        className: 'viewer-prev',
        title: '上一张'
    },
    {
        className: 'viewer-next',
        title: '下一张'
    }
];

@inject('ResourceLayerStore')
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
                nextNode: this.next,
                prevNode: this.previous,
                locatePicture: this.locatePicture,
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
            minWidth: 450,
            zoomRatio: 0.1, //通过旋转鼠标缩放图像时定义比率
            minZoomRatio: 0.1, //最小比例
            maxZoomRatio: 3, //最大比例
            title: [4, image => `${image.alt}`],
            viewed: () => {
                if (!this.refs.viewer) return;
                let viewer = this.refs.viewer.getViewer().viewer;
                viewer.renderViewer();
                const { DataLayerStore } = this.props;
                if (DataLayerStore.locatePictureStatus) {
                    document.querySelector('.viewer-locate-picture').classList.add('active');
                }
                titleMap.forEach(this.addTitle);
            }
        };
    }

    componentDidMount() {
        this.addListener();
        this.registerLocatePictureEvent();
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
            img.onerror = function () {
                this.src = noImg;
                this.setAttribute('data-original-Url', noImg);
                viewer.update();
                viewer.view(index);
            };
        });
    };

    render() {
        const { PictureShowStore, ResourceLayerStore } = this.props;
        const { picData, visible } = PictureShowStore;
        const { activeProjectName } = ResourceLayerStore;
        let imgs = picData.filter(img => !!img);

        return (
            <div className="multimedia-view-container">
                <SetLinkTrackModal key={activeProjectName} />
                <div className="img-banner">
                    <RcViewer options={this.options} ref="viewer">
                        <ul id="images" style={{ display: 'none' }}>
                            {visible && imgs.length ? (
                                imgs.map(this._renderImg)
                            ) : (
                                <img src={noImg} alt="暂无图片" />
                            )}
                        </ul>
                    </RcViewer>
                </div>
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
        const { PictureShowStore, DataLayerStore, ResourceLayerStore } = this.props;
        const { activeTrackName } = ResourceLayerStore;

        window.trackLayer.getPoint(activeTrackName, idx, item => {
            window.trackLayer.unSelect();
            window.trackLayer.select(activeTrackName, idx);
            window.map.look({
                x: item.properties.x,
                y: item.properties.y,
                z: item.properties.z
            });
            PictureShowStore.setPicData(item);
        });
        DataLayerStore.exitEdit();
    };

    locatePicture = e => {
        const { DataLayerStore, PictureShowStore } = this.props;
        DataLayerStore.toggleLocatePicture();
        e.target.classList.toggle('active');
        PictureShowStore.toggleActiveBtn('viewer-locate-picture');
    };

    registerLocatePictureEvent = () => {
        const { DataLayerStore } = this.props;
        DataLayerStore.registerLocatePictureEvent(this.locatePictureEvent);
    };

    locatePictureEvent = async pointWkt => {
        try {
            if (!pointWkt) return;
            const { PictureShowStore, TaskStore, ResourceLayerStore } = this.props;
            const { visible } = PictureShowStore;
            if (!visible) return;
            const { activeProjectName, getTrackPart } = ResourceLayerStore;
            const { activeTaskId } = TaskStore;
            let result = await locatePicture(pointWkt, activeTaskId, activeProjectName);
            const { trackpoint, index } = result;
            const activeTrackName = getTrackPart(trackpoint);
            window.trackLayer.unSelect();
            window.trackLayer.select(activeTrackName, index);
            PictureShowStore.setPicDataFormTrack(result);
        } catch (e) {
            message.warning('图片查看失败：' + e.message, 3);
        }
    };

    addTitle = item => {
        document.querySelector(`.${item.className}`).setAttribute('title', item.title);
    };

    resize() {
        let viewer = this.refs.viewer.getViewer().viewer;
        viewer.resize();
    }
}
export default PictureShowView;
