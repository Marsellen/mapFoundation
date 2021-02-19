import React from 'react';
import { inject, observer } from 'mobx-react';
import ToolIcon from 'src/components/ToolIcon';
import PictureShowView from './PictureShowView';
import SeniorModal from 'src/components/SeniorModal';
import { getWrappedInstance } from 'src/utils/utils';

import 'less/components/picture-view.less';

@inject('TaskStore')
@inject('PictureShowStore')
@observer
class PictureView extends React.Component {
    pictureShowView = React.createRef();

    render() {
        const { TaskStore, PictureShowStore } = this.props;
        const { activeTaskId } = TaskStore;
        const { visible } = PictureShowStore;
        return (
            <span>
                <ToolIcon
                    id="view-picture-btn"
                    icon="zhaopianshezhi"
                    title="照片窗口"
                    placement="right"
                    className="ad-menu-icon"
                    disabled={!activeTaskId}
                    visible={visible}
                    action={this.toggle}
                />
                <SeniorModal
                    visible={visible}
                    title="照片窗口"
                    footer={null}
                    onCancel={this.toggle}
                    mask={false}
                    maskClosable={false}
                    className="small-modal"
                    wrapClassName="view-picture-modal-wrap"
                    resizeCallback={this.resizeCallback}
                    resizeOptions={{ minWidth: 450, minHeight: 341 }}
                >
                    <PictureShowView ref={this.pictureShowView} />
                </SeniorModal>
            </span>
        );
    }

    toggle = () => {
        const { PictureShowStore } = this.props;
        const { visible, show, hide } = PictureShowStore;
        visible ? hide() : show();
    };

    resizeCallback = () => {
        let pictureShowView = getWrappedInstance(this.pictureShowView.current);
        pictureShowView.resize();
    };
}

export default PictureView;
