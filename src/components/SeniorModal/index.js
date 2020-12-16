import React from 'react';
import { Modal } from 'antd';
import Drag from './drag';
import Resize from './resize';
import './style.less';

export default class SeniorModal extends React.Component {
    constructor(props) {
        super(props);
        this.wrapId = Math.random().toString(36);
        this.titleId = Math.random().toString(36);
        this.resize = new Resize(props.resizeOptions);
        this.drag = new Drag();
    }

    _dragDom = content => {
        if (!content) return null;
        return (
            <div className={`clearfix ${this.titleId}`}>
                <div>{content}</div>
            </div>
        );
    };

    componentDidMount() {
        setTimeout(this.installPlugin);
    }

    componentDidUpdate() {
        setTimeout(this.installPlugin);
    }

    installPlugin = () => {
        const { resizeCallback } = this.props;
        this.resize.addResizeEvent(this.wrapId);
        this.resize.registerCallback(resizeCallback);
        this.drag.installListener(this.titleId, this.wrapId);
        this.drag.registerCallback(resizeCallback);
    };

    render() {
        const { title, children, wrapClassName, dragDom } = this.props;
        return (
            <Modal
                {...this.props}
                wrapClassName={`resize-modal-wrap ${this.wrapId} ${wrapClassName}`}
                title={this._dragDom(title)}
            >
                {dragDom && this._dragDom(dragDom)}
                <div>{children}</div>
            </Modal>
        );
    }
}
