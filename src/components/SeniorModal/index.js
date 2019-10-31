import React from 'react';
import DragM from 'dragm';
import { Modal } from 'antd';

class DragDom extends React.Component {
    updateTransform = transformStr => {
        this.modalDom.style.transform = transformStr;
    };

    componentDidMount() {
        const { modalClassName } = this.props;
        this.modalDom = document.getElementsByClassName(modalClassName)[0];
    }

    render() {
        const { content } = this.props;
        return (
            <DragM updateTransform={this.updateTransform} className="clearfix">
                <div>{content}</div>
            </DragM>
        );
    }
}

export default class SeniorModal extends React.Component {
    key = guid();

    _dragDom = content => {
        if (!content) return null;
        return <DragDom content={content} modalClassName={this.key} />;
    };

    render() {
        const {
            title,
            dragDom,
            wrapClassName,
            children,
            afterClose
        } = this.props;
        return (
            <Modal
                {...this.props}
                afterClose={this.afterClose(afterClose)}
                wrapClassName={wrapClassName + ' ' + this.key}
                title={this._dragDom(title)}>
                <div>
                    {this._dragDom(dragDom)}
                    {children}
                </div>
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
