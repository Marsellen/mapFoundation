import React from 'react';
import { inject, observer } from 'mobx-react';
import ToolIcon from 'src/component/common/toolIcon';
import PictureShowView from './pictureShowView';
import SeniorModal from 'src/component/common/seniorModal';
import { getWrappedInstance } from 'src/tool/utils';

import 'less/picture-view.less';

@inject('TaskStore')
@inject('PictureShowStore')
@observer
class PictureView extends React.Component {
    pictureShowView = React.createRef();

    render() {
        const { TaskStore, PictureShowStore } = this.props;
        const { activeTaskId } = TaskStore;
        const { visible, hide } = PictureShowStore;
        return (
            <span>
                <ToolIcon
                    id="picture-icon"
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
                    onCancel={hide}
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
