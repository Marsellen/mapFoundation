import React from 'react';
import DragM from 'dragm';
import { Modal } from 'antd';

class DragDom extends React.Component {
    updateTransform = (transformStr, tx, ty, tdom) => {
        this.modalDom.style.transform = transformStr;
        this.props.dragCallback(transformStr, tx, ty, tdom);
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
    _dragDom = content => {
        if (!content) return null;
        const { wrapClassName, dragCallback } = this.props;
        return (
            <DragDom
                content={content}
                modalClassName={wrapClassName}
                dragCallback={dragCallback}
            />
        );
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
                wrapClassName={wrapClassName}
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
        };
    };
}
