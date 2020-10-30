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
import appStore from 'src/store/appStore';
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
                    <Form colon={false} hideRequiredMark={true} key={modelId}>
                        <AdTabs
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
            const roleCode = appStore.loginUser.roleCode;
            const name = appStore.loginUser.name;
            const validStatus = [4, 5]; //4返修，5返工
            if (roleCode === 'quality' && values.attributes.ID) {
                //登录账号为质检员且保存的要素是标记图层时
                values.attributes.QC_PERSON = name; //点击保存直接赋值当前账号
            }
            if (
                roleCode === 'producer' &&
                validStatus.includes(TaskStore.activeTask.manualStatus) &&
                values.attributes.ID
            ) {
                //登录账号为作业员且是返修任务时且保存要素为标记图层时
                values.attributes.FIX_PERSON = name; //点击保存直接赋值当前账号
            }

            AttributeStore.showLoading('保存数据...');
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
