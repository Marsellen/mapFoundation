import React from 'react';
import { inject, observer } from 'mobx-react';
import { Modal, Form, Button } from 'antd';
import { DATA_LAYER_MAP } from 'src/config/DataLayerConfig';
import BasicAttributesForm from './AttributesForm/BasicAttributesForm';
import RelationForm from './AttributesForm/RelationForm';
import AdTabs from 'src/components/AdTabs/index';
import 'less/components/attributes-modal.less';

@Form.create()
@inject('AttributeStore')
@inject('DataLayerStore')
@observer
class AttributesModal extends React.Component {
    handleCancel = e => {
        const { AttributeStore } = this.props;
        AttributeStore.hide();
    };

    render() {
        const { AttributeStore } = this.props;
        const { visible } = AttributeStore;
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
                <Form colon={false} hideRequiredMark={true}>
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
        const { form, AttributeStore, DataLayerStore } = this.props;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            console.log(values);
            AttributeStore.submit(values).then(result => {
                DataLayerStore.updateFeature(result);
            });
            AttributeStore.hide();
        });
    };

    renderForm() {
        return (
            <BasicAttributesForm key="basicAttribute" form={this.props.form} />
        );
    }

    renderRels() {
        return <RelationForm key="relation" form={this.props.form} />;
    }
}

export default AttributesModal;
