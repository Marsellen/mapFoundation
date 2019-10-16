import React from 'react';
import { inject, observer } from 'mobx-react';
import RcViewer from 'src/components/RcViewer';
import noImg from 'src/assets/img/no-img.png';

@inject('TaskStore')
@inject('PictureShowStore')
@observer
class PictureShowView extends React.Component {
    options = {
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
        title: [4, image => `${image.alt}`],
        viewed: function() {
            //设置相对比例0.6=展示宽度/图片实际宽度
            this.viewer.zoomTo(0.28).move(0, -6.2);
        }
    };

    componentDidMount() {
        this.addListener();
    }

    componentDidUpdate() {
        this.addListener();
    }

    addListener = () => {
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

        return (
            <div className="img-banner">
                <RcViewer options={this.options} ref="viewer">
                    <ul id="images" style={{ display: 'none' }}>
                        {picData.map(this._renderImg)}
                    </ul>
                </RcViewer>
            </div>
        );
    }

    _renderImg = (url, index) => {
        const { TaskStore } = this.props;
        const { activeTaskUrl } = TaskStore;

        return (
            <li key={index}>
                <img src={`${activeTaskUrl}/${url}`} />
            </li>
        );
    };
}
export default PictureShowView;
