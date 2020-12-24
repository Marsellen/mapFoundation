import React from 'react';
import { inject, observer } from 'mobx-react';
import { Modal, Form, Button, message, Spin } from 'antd';
import { DATA_LAYER_MAP } from 'src/config/DataLayerConfig';
import BasicAttributesForm from './AttributesForm/BasicAttributesForm';
import RelationForm from './AttributesForm/RelationForm';
import AttrsForm from './AttributesForm/AttrsForm';
import AdTabs from 'src/components/AdTabs/index';
import { updateFeatures } from 'src/utils/relCtrl/operateCtrl';
import { logDecorator } from 'src/utils/decorator';
import AttributeStore from 'src/pages/Index/store/AttributeStore';
import DataLayerStore from 'src/pages/Index/store/DataLayerStore';
import TaskStore from 'src/pages/Index/store/TaskStore';
import 'less/components/attributes-modal.less';

@Form.create()
@inject('AttributeStore')
@inject('DataLayerStore')
@observer
class AttributesModal extends React.Component {
    componentDidMount() {
        const { AttributeStore } = this.props;
        AttributeStore.addToggleListener(this.props.form.resetFields);
    }

    handleCancel = e => {
        const { DataLayerStore, AttributeStore } = this.props;
        DataLayerStore.UnQCAttrModal(['error_layer']);
        AttributeStore.hide();
        AttributeStore.showTime(true);
    };

    render() {
        const { AttributeStore } = this.props;
        const { visible, loading, loadingMessage, modelId } = AttributeStore;
        return (
            <Modal
                footer={this.renderFooter()}
                mask={false}
                destroyOnClose={true}
                wrapClassName="ad-attributes-modal"
                title={this.renderTitle()}
                visible={visible}
                zIndex={2}
                onCancel={this.handleCancel}
            >
                <div className="obscuration" />
                <Spin spinning={loading} tip={loadingMessage}>
                    <Form colon={false} hideRequiredMark={true}>
                        <AdTabs
                            updateKey={modelId}
                            tabs={[
                                { label: '基础属性', key: 'basicAttribute' },
                                { label: '关联关系', key: 'relation' }
                            ]}
                        >
                            {this.renderForm()}
                            {this.renderRels()}
                        </AdTabs>
                    </Form>
                </Spin>
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
        const { readonly, loading } = AttributeStore;
        return readonly ? null : (
            <Button type="primary" disabled={loading} onClick={this.save} size="small" ghost>
                保存
            </Button>
        );
    };

    save = () => {
        const { form } = this.props;
        form.validateFields((err, values) => {
            if (err) return;
            this.submit(values);
        });
    };

    @logDecorator({ operate: '修改要素属性' })
    async submit(values) {
        try {
            AttributeStore.showLoading('保存数据...');
            if (values.attributes.OBJ_FUNC) {
                // 交通标牌子对象转为字符串
                values.attributes.OBJ_FUNC = JSON.stringify(values.attributes.OBJ_FUNC);
            }

            let log = await AttributeStore.submit(values, TaskStore.activeTask);
            await updateFeatures(log);
            AttributeStore.hideRelFeatures();
            AttributeStore.hide();
            DataLayerStore.UnQCAttrModal(['error_layer']);
            return log;
        } catch (e) {
            message.error(e.message || '更新失败: 数据重复');
            AttributeStore.loaded();
            throw e;
        }
    }

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
