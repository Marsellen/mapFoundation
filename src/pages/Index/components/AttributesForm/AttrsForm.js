import React from 'react';
import { inject, observer } from 'mobx-react';
import { Button, Icon } from 'antd';
import EditableCard from './EditableCard';
import _ from 'lodash';
import NewAttrModal from './NewAttrModal';

@inject('AttributeStore')
@observer
class AttrsForm extends React.Component {
    render() {
        const { AttributeStore } = this.props;
        const { type } = AttributeStore;

        return type === 'AD_Lane' ? this.renderADLaneAttr() : null;
    }

    renderADLaneAttr = () => {
        const { form, AttributeStore } = this.props;
        const { attrs, readonly } = AttributeStore;
        let newEnable = (!attrs.AD_Lane_RS || attrs.AD_Lane_RS.length == 0) && !readonly;
        return (
            <div>
                {(attrs.AD_Lane_RS || []).map((rs, index) =>
                    form.getFieldDecorator('attrs.AD_Lane_RS[' + index + ']', {
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
                            onDelete={this.onDelete('AD_Lane_RS')}
                        />
                    )
                )}
                {newEnable && (
                    <Button onClick={this.newAttrs('AD_Lane_RS')} title="添加交通限制">
                        <Icon type="plus" />
                    </Button>
                )}
                <NewAttrModal onRef={modal => (this.modal = modal)} />
            </div>
        );
    };

    newAttrs = key => {
        return () => {
            this.modal.show(key);
        };
    };

    addAttrs = key => {
        const { AttributeStore } = this.props;
        return () => {
            AttributeStore.addAttrs(key);
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
}

export default AttrsForm;
