import React from 'react';
import DragM from 'dragm';
import { Modal } from 'antd';

class ModalTitle extends React.Component {
    updateTransform = transformStr => {
        this.modalDom.style.transform = transformStr;
    };

    componentDidMount() {
        const { modalClassName } = this.props;
        this.modalDom = document.getElementsByClassName(modalClassName)[0];
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
    key = guid();

    render() {
        const title = (
            <ModalTitle title={this.props.title} modalClassName={this.key} />
        );
        return (
            <Modal
                {...this.props}
                afterClose={this.afterClose(this.props.afterClose)}
                wrapClassName={this.key}
                title={title}>
                {this.props.children}
            </Modal>
        );
    }

    afterClose = action => {
        return () => {
            action && action();
            this.modalDom = document.getElementsByClassName(this.key)[0];
            this.modalDom.style.transform = 'none';
        };
    };
}

function guid() {
    return 'xxxxxxx'.replace(/[x]/g, function(c) {
        var r = (Math.random() * 16) | 0,
            v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}
