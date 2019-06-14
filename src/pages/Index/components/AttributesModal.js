import React from 'react';
import EditableTable from 'src/components/EditableTable';
import { inject, observer } from 'mobx-react';
import { Modal } from 'antd';
import 'less/components/attributes-modal.less';

@inject('AttributeStore')
@observer
class AttributesModal extends React.Component {
    state = {
        visible: false
    };

    constructor(props) {
        super(props);
        const { handleSave } = props;
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
                    handleSave: handleSave
                })
            }
        ];
    }

    componentDidMount() {
        this.props.onRef(this);
    }

    showModal = () => {
        this.setState({
            visible: true
        });
    };

    handleCancel = e => {
        this.setState({
            visible: false
        });
    };

    render() {
        const { AttributeStore } = this.props;
        const { attributes } = AttributeStore;
        return (
            <Modal
                footer={null}
                mask={false}
                wrapClassName="ad-attributes-modal"
                title="属性框"
                visible={this.state.visible}
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
