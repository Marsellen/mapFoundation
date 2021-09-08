import React from 'react';
import { Button, Icon } from 'antd';
import EditableCard from './editableCard';
import _ from 'lodash';
import NewAttrModal from './newAttrModal';

class AttrsForm extends React.Component {
    newAttrs = attrType => {
        return () => {
            this.modal.show(attrType);
        };
    };

    onDelete = attrType => {
        const { form, onDelete } = this.props;
        return value => {
            onDelete(attrType, value);
            let fieldKey = 'attrs.' + attrType;
            const records = form.getFieldValue(fieldKey);
            form.setFieldsValue({
                [fieldKey]: records.filter(item => item.sourceId !== value.sourceId)
            });
        };
    };

    render = () => {
        const { form, onOk, attrs, attrType, readonly, updateKey } = this.props;
        const newEnable = (!attrs[attrType] || attrs[attrType].length == 0) && !readonly;

        return (
            <div>
                {(attrs[attrType] || []).map((rs, index) =>
                    form.getFieldDecorator(`attrs.${attrType}[${index}]`, {
                        initialValue: {
                            ...rs,
                            properties: {
                                ...rs.properties
                            }
                        }
                    })(
                        <EditableCard
                            key={updateKey + Math.random()}
                            index={index}
                            readonly={readonly}
                            onDelete={this.onDelete(attrType)}
                        />
                    )
                )}
                {newEnable && (
                    <Button onClick={this.newAttrs(attrType)} title="添加交通限制">
                        <Icon type="plus" />
                    </Button>
                )}
                <NewAttrModal onRef={modal => (this.modal = modal)} handleSave={onOk} />
            </div>
        );
    };
}

export default AttrsForm;
