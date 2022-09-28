import React from 'react';
import { inject, observer } from 'mobx-react';
import RenderConfigWindow from './renderMode/renderConfigWindow';
import BufferConfigWindow from './bufferConfig/bufferConfigWindow';
import 'less/multimedia-modal.less';
import ToolIcon from 'src/component/common/toolIcon';
import PointCloudLayer from 'src/component/home/pointCloudLayer';

const MENU_LIST = [
    // {
    //     id: 'picture-icon',
    //     title: '图片显示窗口',
    //     icon: 'zhaopianshezhi',
    //     storeName: 'PictureShowStore',
    //     content: <PictureShowView />
    // },
    {
        id: 'point-cloud-icon',
        title: '图层控制',
        icon: 'ziliaotuceng',
        storeName: 'PointCloudStore',
        content: <PointCloudLayer />
    },
    {
        id: 'define-icon',
        title: '渲染设置',
        icon: 'xuanranshezhi',
        storeName: 'TextStore',
        content: <RenderConfigWindow />
    },
    {
        id: 'buffer-render-icon',
        title: 'buffer渲染',
        icon: 'yaosulunkuobuffer',
        storeName: 'BufferStore',
        content: <BufferConfigWindow />
    }
];
@inject('DefineModeStore')
@inject('RenderModeStore')
@inject('TextStore')
@inject('PictureShowStore')
@inject('PointCloudStore')
@inject('BufferStore')
@observer
class MenuList extends React.Component {
    handleClick = storeName => {
        //点击'渲染设置窗口'，需要等数据准备好之后，才能打开
        if (storeName === 'TextStore') {
            const { vectorConfigMap } = this.props.DefineModeStore;
            if (!vectorConfigMap) return;
        }
        //关闭其它窗口，只显示当前点击窗口
        const { visible, show, hide } = this.props[storeName];
        MENU_LIST.forEach(item => {
            if (item.storeName === storeName) return;
            this.props[item.storeName].hide();
        });
        visible ? hide() : show();
    };

    render() {
        return (
            <div className="multimedia-container multimedia-container-right">
                {/* 遍历出页签 */}
                {MENU_LIST.map((item, index) => {
                    const { id, title, storeName, icon, content } = item;
                    const { visible } = this.props[storeName];
                    return (
                        <div key={id}>
                            <div
                                id={id}
                                title={title}
                                onClick={() => this.handleClick(storeName)}
                                style={{ top: 41 * index }}
                                className={`menu-list-icon ${visible ? 'on' : ''}`}
                            >
                                <ToolIcon icon={icon} />
                            </div>
                            {visible && content}
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default MenuList;
