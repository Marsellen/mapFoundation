import React from 'react';
import DragM from 'dragm';
import { Modal } from 'antd';
class ModalTitle extends React.Component {
    updateTransform = transformStr => {
        this.modalDom.style.transform = transformStr;
    };

    componentDidMount() {
        this.modalDom = document.getElementsByClassName(
            'ant-modal-wrap' //modal的class是ant-modal-wrap
        )[0];
    }

    render() {
        const { title } = this.props;
        return (
            <DragM updateTransform={this.updateTransform}>
                <div>{title}</div>
            </DragM>
        );
    }
}
export default class SeniorModal extends React.Component {
    render() {
        const title = <ModalTitle title={this.props.title} />;
        return (
            <Modal {...this.props} title={title}>
                {this.props.children}
            </Modal>
        );
    }
}
