import React from 'react';
import { inject, observer } from 'mobx-react';
import { Empty, Form, Button, Icon } from 'antd';
import EditableCard from './EditableCard';
import NewAttrModal from './NewAttrModal';
import AdInput from 'src/components/Form/Input';
import { getValidator } from 'src/utils/form/validator';
import AdInputNumber from 'src/components/Form/InputNumber';

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

    renderInputNumber = (item, index, filedKey) => {
        const { form, AttributeStore } = this.props;
        const { readonly } = AttributeStore;
        let key = filedKey + '.' + item.key + item.id;

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
                {this.renderRs(item)}
            </div>
        );
    };

    renderRs = ({ spec, extraInfo } = {}) => {
        if (spec == 'AD_Lane_Con') {
            return this.renderADLaneConRs(extraInfo);
        }
        // switch (spec) {
        //     case 'AD_Lane_Con':
        //         return this.renderADLaneConRs(extraInfo);
        //     default:
        //         break;
        // }
    };

    renderADLaneConRs = extraInfo => {
        const { form, AttributeStore } = this.props;
        const { attrs, readonly } = AttributeStore;
        let newEnable =
            !readonly &&
            (!attrs.AD_Lane_Con_RS || attrs.AD_Lane_Con_RS.length == 0);
        return (
            <div>
                {(attrs.AD_Lane_Con_RS || []).map((rs, index) =>
                    form.getFieldDecorator(
                        'attrs.AD_Lane_Con_RS[' + index + ']',
                        {
                            initialValue: {
                                ...rs,
                                properties: {
                                    ...rs.properties
                                }
                            }
                        }
                    )(
                        <EditableCard
                            key={index}
                            index={index}
                            readonly={readonly}
                            onDelete={this.onDelete('AD_Lane_Con_RS')}
                        />
                    )
                )}
                {newEnable && (
                    <Button
                        onClick={this.newAttrs('AD_Lane_Con_RS', extraInfo)}
                        title="添加连接关系交通限制">
                        <Icon type="plus" />
                    </Button>
                )}
                <NewAttrModal onRef={modal => (this.modal = modal)} />
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
        return index => {
            AttributeStore.spliceAttrs(key, index);
            let fieldKey = 'attrs.' + key;
            const records = form.getFieldValue(fieldKey);
            form.setFieldsValue({
                [fieldKey]: records.filter((item, i) => i !== index)
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
