import React from 'react';
import EditableTable from 'src/components/EditableTable';
import { inject, observer } from 'mobx-react';
import { Modal } from 'antd';
import 'less/components/attributes-modal.less';

@inject('AttributeStore')
@observer
class AttributesModal extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: '属性',
                dataIndex: 'name',
                width: 100
            },
            {
                title: '值',
                dataIndex: 'value',
                onCell: record => ({
                    record,
                    editable: true,
                    title: '值',
                    dataIndex: 'value',
                    handleSave: this.handleSave
                })
            }
        ];
    }

    handleSave = row => {
        const { AttributeStore } = this.props;
        AttributeStore.setAttributes(row);
    };

    handleCancel = e => {
        const { AttributeStore } = this.props;
        AttributeStore.hide();
    };

    render() {
        const { AttributeStore } = this.props;
        const { attributes, visible } = AttributeStore;
        return (
            <Modal
                footer={null}
                mask={false}
                wrapClassName="ad-attributes-modal"
                title="属性框"
                visible={visible}
                onCancel={this.handleCancel}>
                <EditableTable
                    dataSource={attributes}
                    columns={this.columns}
                    pagination={false}
                    bordered
                    size="small"
                    scroll={{ y: 300 }}
                />
            </Modal>
        );
    }
}

export default AttributesModal;
