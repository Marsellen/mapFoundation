import React from 'react';
import { Modal } from 'antd';
import 'less/components/attributes-modal.less';

class AttributesModal extends React.Component {
    render() {
        return (
            <Modal
                footer={null}
                mask={false}
                wrapClassName="ad-attributes-modal"
                title={this.props.title}
                visible={this.props.visible}>
                {this.props.children}
            </Modal>
        );
    }
}

export default AttributesModal;
