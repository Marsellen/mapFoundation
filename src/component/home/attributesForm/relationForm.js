import React from 'react';
import { inject, observer } from 'mobx-react';
import { Empty, Form, Button, Icon } from 'antd';
import EditableCard from './editableCard';
import NewAttrModal from './newAttrModal';
import { getValidator } from 'src/util/validator';
import AdInputNumber from 'src/component/common/form/adInputNumber';
import { isManbuildTask } from 'src/util/taskUtils';

const formItemLayout = {
    labelCol: {
        xs: { span: 16 },
        sm: { span: 10 }
    },
    wrapperCol: {
        xs: { span: 16 },
        sm: { span: 14 }
    }
};

@inject('AttributeStore')
@inject('TaskStore')
@observer
class RelationForm extends React.Component {
    render() {
        const { AttributeStore } = this.props;
        const { rels } = AttributeStore;

        return (
            <div>
                {rels && rels.length > 0 ? (
                    rels.map((item, index) => this.renderItem(item, index))
                ) : (
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                )}
            </div>
        );
    }

    renderItem = (item, index) => {
        if (item.withAttr) {
            return this.renderGroupItem(item, index);
        } else {
            return this.renderInputNumber(item, index, 'rels');
        }
    };

    getReadonlyStatus = () => {
        const { AttributeStore, TaskStore } = this.props;
        const { activeTask } = TaskStore;
        const { isLocal } = activeTask;

        return AttributeStore.readonly || !(isManbuildTask() || isLocal);
    };

    renderInputNumber = (item, index, filedKey) => {
        const { form } = this.props;
        const readonly = this.getReadonlyStatus();
        let key = filedKey + '.' + item.key + (item.id || '');

        return (
            <Form.Item key={index} label={item.name} {...formItemLayout}>
                {!readonly ? (
                    form.getFieldDecorator(key, {
                        rules: [...this.getValidatorSetting(item.validates)],
                        initialValue: item.value
                    })(<AdInputNumber disabled={readonly} type="number" />)
                ) : (
                    <span className="ant-form-text">
                        {this.isPresent(item.value) ? item.value : '--'}
                    </span>
                )}
            </Form.Item>
        );
    };

    renderGroupItem = (item, index) => {
        return (
            <div key={index}>
                {this.renderInputNumber(item, index, 'rels')}
                {this.renderRs(index, item)}
            </div>
        );
    };

    renderRs = (index, { spec, extraInfo } = {}) => {
        switch (spec) {
            case 'AD_Road_Con':
                return this.renderADRoadConRs(extraInfo, index);
            case 'AD_Lane_Con':
                return this.renderADLaneConRs(extraInfo, index);
            default:
                break;
        }
    };

    renderADLaneConRs = (extraInfo, index) => {
        const { form, AttributeStore } = this.props;
        const { attrs } = AttributeStore;
        const readonly = this.getReadonlyStatus();
        let AD_Lane_Con_RS = (attrs.AD_Lane_Con_RS || []).filter(rs => rs.key === extraInfo.REL_ID);
        let newEnable = !readonly && AD_Lane_Con_RS.length == 0;
        return (
            <div>
                {AD_Lane_Con_RS.map(rs =>
                    form.getFieldDecorator('attrs.AD_Lane_Con_RS[' + index + ']', {
                        initialValue: {
                            ...rs,
                            properties: {
                                ...rs.properties
                            }
                        }
                    })(
                        <EditableCard
                            key={Math.random()}
                            index={index}
                            readonly={readonly}
                            onDelete={this.onDelete('AD_Lane_Con_RS')}
                        />
                    )
                )}
                {newEnable && (
                    <Button
                        onClick={this.newAttrs('AD_Lane_Con_RS', extraInfo)}
                        title="添加连接关系交通限制"
                    >
                        <Icon type="plus" />
                    </Button>
                )}
                <NewAttrModal onRef={modal => (this.modal = modal)} handleSave={this.handleSave} />
            </div>
        );
    };
    handleSave = (key, values, properties, onCancel) => {
        const { AttributeStore } = this.props;
        AttributeStore.newAttr(key, values, properties).then(() => {
            onCancel();
        });
    };
    renderADRoadConRs = (extraInfo, index) => {
        const { form, AttributeStore } = this.props;
        const { attrs } = AttributeStore;
        const readonly = this.getReadonlyStatus();
        let AD_Road_Con_RS = (attrs.AD_Road_Con_RS || []).filter(rs => rs.key === extraInfo.REL_ID);
        let newEnable = !readonly && AD_Road_Con_RS.length == 0;
        return (
            <div>
                {AD_Road_Con_RS.map(rs =>
                    form.getFieldDecorator('attrs.AD_Road_Con_RS[' + index + ']', {
                        initialValue: {
                            ...rs,
                            properties: {
                                ...rs.properties
                            }
                        }
                    })(
                        <EditableCard
                            key={Math.random()}
                            index={index}
                            readonly={readonly}
                            onDelete={this.onDelete('AD_Road_Con_RS')}
                        />
                    )
                )}
                {newEnable && (
                    <Button
                        onClick={this.newAttrs('AD_Road_Con_RS', extraInfo)}
                        title="添加连接关系交通限制"
                    >
                        <Icon type="plus" />
                    </Button>
                )}
                <NewAttrModal onRef={modal => (this.modal = modal)} handleSave={this.handleSave} />
            </div>
        );
    };

    newAttrs = (key, properties) => {
        return () => {
            this.modal.show(key, properties);
        };
    };

    onDelete = key => {
        const { form, AttributeStore } = this.props;
        return value => {
            AttributeStore.spliceAttrs(key, value);
            let fieldKey = 'attrs.' + key;
            const records = form.getFieldValue(fieldKey);
            form.setFieldsValue({
                [fieldKey]: records.filter(item => item.sourceId !== value.sourceId)
            });
        };
    };

    isPresent(obj) {
        return (!!obj && String(obj) != '') || obj === 0;
    }

    getValidatorSetting = validates => {
        return validates
            ? [
                {
                    validator: getValidator(validates)
                }
            ]
            : [];
    };
}

export default RelationForm;
