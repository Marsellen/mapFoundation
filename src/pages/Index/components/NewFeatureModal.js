import React from 'react';
import { Modal, Form, Input, Select, Button } from 'antd';
import { inject, observer } from 'mobx-react';
import { TYPE_SELECT_OPTION_MAP } from 'src/config/ADMapDataConfig';
import { DATA_LAYER_MAP } from 'src/config/DataLayerConfig';
import { getLayerByName } from 'src/utils/vectorUtils';
import editLog from 'src/models/editLog';

@Form.create()
@inject('NewFeatureStore')
@inject('OperateHistoryStore')
@observer
class NewFeatureModal extends React.Component {
    render() {
        const { NewFeatureStore } = this.props;
        const { visible, fromData, fromType } = NewFeatureStore;
        const formItemLayout = {
            labelCol: {
                xs: { span: 16 },
                sm: { span: 6 }
            },
            wrapperCol: {
                xs: { span: 16 },
                sm: { span: 18 }
            }
        };
        let label =
            fromType && DATA_LAYER_MAP[fromType]
                ? DATA_LAYER_MAP[fromType].label
                : '';
        let title = '新建' + label;
        return (
            <Modal
                centered
                bodyStyle={{ maxHeight: '60vh', overflow: 'auto' }}
                visible={visible}
                title={title}
                onCancel={this.cancel}
                keyboard={false}
                maskClosable={false}
                footer={<Button onClick={this.save}>保存</Button>}>
                <Form {...formItemLayout}>
                    {fromData.map((item, index) =>
                        this.renderItem(item, index)
                    )}
                </Form>
            </Modal>
        );
    }

    renderItem = (item, index) => {
        return this['render' + item.domType](item, index);
    };

    renderText = (item, index) => {
        const { form } = this.props;
        return (
            <Form.Item key={index} label={item.name}>
                {form.getFieldDecorator(item.key, {
                    initialValue: item.value
                })(<Input disabled />)}
            </Form.Item>
        );
    };

    renderInput = (item, index) => {
        const { form } = this.props;
        return (
            <Form.Item key={index} label={item.name}>
                {form.getFieldDecorator(item.key, {
                    rules: [
                        {
                            required: true,
                            message: `${item.name}必填`
                        }
                    ],
                    initialValue: item.value
                })(<Input />)}
            </Form.Item>
        );
    };

    renderSelect = (item, index) => {
        const { form } = this.props;
        const options = TYPE_SELECT_OPTION_MAP[item.type];
        return (
            <Form.Item key={index} label={item.name}>
                {form.getFieldDecorator(item.key, {
                    rules: [
                        {
                            required: true,
                            message: `${item.name}必填`
                        }
                    ],
                    initialValue: item.value
                })(
                    <Select
                        showSearch
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                            option.props.children
                                .toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0
                        }>
                        {options.map((option, index) => {
                            return (
                                <Select.Option key={index} value={option.value}>
                                    {option.label}
                                </Select.Option>
                            );
                        })}
                    </Select>
                )}
            </Form.Item>
        );
    };

    save = () => {
        const { form, NewFeatureStore, OperateHistoryStore } = this.props;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            NewFeatureStore.save(values, (feature, layerName) => {
                let history = {
                    type: 'addFeature',
                    feature: feature,
                    layerName: layerName
                };
                let log = {
                    operateHistory: history,
                    action: 'newFeature',
                    result: 'success'
                };
                OperateHistoryStore.add(history);
                editLog.store.add(log);
            });
        });
    };

    cancel = () => {
        const { NewFeatureStore } = this.props;
        const { fromType } = NewFeatureStore;
        Modal.confirm({
            title: '您确定放弃正在新建的内容?',
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                let layer = getLayerByName(fromType);
                let key = DATA_LAYER_MAP[fromType].id;
                let value = NewFeatureStore.getFeatureValue(key);
                layer.layer.removeFeatureByOption({
                    key,
                    value
                });
                NewFeatureStore.hide();
            }
        });
    };
}

export default NewFeatureModal;
