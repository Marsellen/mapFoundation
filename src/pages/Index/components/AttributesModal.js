import React from 'react';
import { inject, observer } from 'mobx-react';
import { Modal, Form, Button, message } from 'antd';
import { DATA_LAYER_MAP } from 'src/config/DataLayerConfig';
import BasicAttributesForm from './AttributesForm/BasicAttributesForm';
import RelationForm from './AttributesForm/RelationForm';
import AttrsForm from './AttributesForm/AttrsForm';
import AdTabs from 'src/components/AdTabs/index';
import editLog from 'src/models/editLog';
import 'less/components/attributes-modal.less';

@Form.create()
@inject('AttributeStore')
@inject('DataLayerStore')
@inject('OperateHistoryStore')
@observer
class AttributesModal extends React.Component {
    handleCancel = e => {
        const { AttributeStore } = this.props;
        AttributeStore.hide();
    };

    componentDidUpdate() {
        this.props.form.resetFields();
    }

    render() {
        const { AttributeStore } = this.props;
        const { visible, modelId } = AttributeStore;
        return (
            <Modal
                footer={this.renderFooter()}
                mask={false}
                destroyOnClose={true}
                wrapClassName="ad-attributes-modal"
                title={this.renderTitle()}
                visible={visible}
                onCancel={this.handleCancel}>
                <div className="obscuration" />
                <Form colon={false} hideRequiredMark={true} key={modelId}>
                    <AdTabs
                        tabs={[
                            { label: '基础属性', key: 'basicAttribute' },
                            { label: '关联关系', key: 'relation' }
                        ]}>
                        {this.renderForm()}
                        {this.renderRels()}
                    </AdTabs>
                </Form>
            </Modal>
        );
    }

    renderTitle = () => {
        const { AttributeStore } = this.props;
        const { type } = AttributeStore;
        return DATA_LAYER_MAP[type] ? DATA_LAYER_MAP[type].label : type;
    };

    renderFooter = () => {
        const { AttributeStore } = this.props;
        const { readonly } = AttributeStore;
        return readonly ? null : (
            <Button type="primary" onClick={this.save} size="small" ghost>
                保存
            </Button>
        );
    };

    save = () => {
        const {
            form,
            AttributeStore,
            DataLayerStore,
            OperateHistoryStore
        } = this.props;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            // console.log(values);
            AttributeStore.submit(values)
                .then(result => {
                    let feature = result.features[1][0];
                    DataLayerStore.updateFeature(feature);
                    let history = {
                        type: 'updateFeatureRels',
                        data: result
                    };
                    let log = {
                        operateHistory: history,
                        action: 'updateAttributes',
                        result: 'success'
                    };
                    OperateHistoryStore.add(history);
                    editLog.store.add(log);
                    AttributeStore.hide();
                })
                .catch(e => {
                    message.error(e.message || '更新失败: 数据重复');
                });
        });
    };

    renderForm() {
        return (
            <div key="basicAttribute">
                <BasicAttributesForm form={this.props.form} />
                <AttrsForm form={this.props.form} />
            </div>
        );
    }

    renderRels() {
        return <RelationForm key="relation" form={this.props.form} />;
    }
}

export default AttributesModal;
