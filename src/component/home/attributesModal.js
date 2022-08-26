import React from 'react';
import { inject, observer } from 'mobx-react';
import { Modal, Form, Button, message, Spin } from 'antd';
import { DATA_LAYER_MAP } from 'src/config/dataLayerConfig';
import BasicAttributesForm from './attributesForm/basicAttributesForm';
import RelationForm from './attributesForm/relationForm';
import AttrsForm from './attributesForm/attrsForm';
import AdTabs from 'src/component/common/adTabs';
import { updateFeatures } from 'src/util/relCtrl/operateCtrl';
import { logDecorator, editLock } from 'src/util/decorator';
import AttributeStore from 'src/store/home/attributeStore';
import TaskStore from 'src/store/home/taskStore';
import 'less/attributes-modal.less';
import { ATTR_SPEC_CONFIG } from 'src/config/attrsConfig';

@Form.create()
@inject('AttributeStore')
@inject('DataLayerStore')
@observer
class AttributesModal extends React.Component {
    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
    }

    getAttrType = () => {
        const { AttributeStore } = this.props;
        const { layerName } = AttributeStore;
        const attrConfig = ATTR_SPEC_CONFIG.filter(item => item.relSpec === layerName);
        return attrConfig ?? [];
    };

    componentDidMount() {
        const { AttributeStore } = this.props;
        AttributeStore.addToggleListener(this.props.form.resetFields);
    }

    handleCancel = e => {
        const channel = e.keyCode ? 'esc' : e.detail ? 'close' : 'other_close';
        const { AttributeStore } = this.props;
        AttributeStore.hide(channel);
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
                zIndex={1002}
                title={this.renderTitle()}
                visible={visible}
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
        const { layerName } = AttributeStore;
        return DATA_LAYER_MAP[layerName] ? DATA_LAYER_MAP[layerName].label : layerName;
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

    @editLock
    save = () => {
        const { form } = this.props;
        form.validateFields((err, values) => {
            if (err) return;
            this.submit(values);
        });
    };

    @logDecorator({ operate: '修改要素属性', toolType: 'attr_edit_modal' })
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
            return log;
        } catch (e) {
            message.error(e.message || '更新失败: 数据重复');
            AttributeStore.loaded();
            throw e;
        }
    }

    renderForm() {
        const {
            form,
            AttributeStore: { attributes, readonly, layerName, attrs, spliceAttrs, updateKey }
        } = this.props;
        return (
            <div key="basicAttribute">
                <BasicAttributesForm form={form} formConfig={attributes} formStatus={!readonly} />
                {layerName === 'AD_Lane' ? (
                    <>
                        {this.getAttrType().map((item, index) => {
                            return (
                                <AttrsForm
                                    key={index}
                                    updateKey={updateKey}
                                    form={form}
                                    attrType={item.source}
                                    layerName={layerName}
                                    attrs={attrs}
                                    readonly={readonly}
                                    onOk={this.handleSave}
                                    onDelete={spliceAttrs}
                                    batchAssign={true}
                                />
                            );
                        })}
                    </>
                ) : null}
            </div>
        );
    }

    handleSave = (key, values, properties, onCancel) => {
        const { AttributeStore } = this.props;
        AttributeStore.newAttr(key, values, properties).then(() => {
            onCancel();
        });
    };

    renderRels() {
        return <RelationForm key="relation" form={this.props.form} />;
    }
}

export default AttributesModal;
