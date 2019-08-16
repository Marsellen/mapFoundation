import React from 'react';
import { inject, observer } from 'mobx-react';
import { Button } from 'antd';
import EditableCard from './EditableCard';
import _ from 'lodash';
import NewAttrModal from './NewAttrModal';

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
class AttrsForm extends React.Component {
    render() {
        const { AttributeStore } = this.props;
        const { type } = AttributeStore;

        switch (type) {
            case 'AD_Lane':
                return this.renderADLaneAttr();
            case 'AD_TrafficSign':
                return this.renderADTrafficSignAttr();
            case 'AD_TrafficLight':
                return this.renderADTrafficLightAttr();
            default:
                return <div />;
        }
    }

    renderADLaneAttr = () => {
        const { form, AttributeStore } = this.props;
        const { attrs } = AttributeStore;
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
                            key={index}
                            index={index}
                            onDelete={this.onDelete('AD_Lane_RS')}
                        />
                    )
                )}
                <Button onClick={this.newAttrs('AD_Lane_RS')} />
                <NewAttrModal onRef={modal => (this.modal = modal)} />
            </div>
        );
    };

    renderADTrafficSignAttr = () => {
        const { form, AttributeStore } = this.props;
        const { attrs } = AttributeStore;
        return (
            <div>
                {(attrs.AD_TS_Content || []).map((rs, index) =>
                    form.getFieldDecorator(
                        'attrs.AD_TS_Content[' + index + ']',
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
                            onDelete={this.onDelete('AD_TS_Content')}
                        />
                    )
                )}
                <Button onClick={this.newAttrs('AD_TS_Content')} />
                <NewAttrModal onRef={modal => (this.modal = modal)} />
            </div>
        );
    };

    renderADTrafficLightAttr = () => {
        const { form, AttributeStore } = this.props;
        const { attrs } = AttributeStore;
        return (
            <div>
                {(attrs.AD_Sub_Lamp || []).map((rs, index) =>
                    form.getFieldDecorator('attrs.AD_Sub_Lamp[' + index + ']', {
                        initialValue: {
                            ...rs,
                            properties: {
                                ...rs.properties
                            }
                        }
                    })(
                        <EditableCard
                            key={index}
                            index={index}
                            onDelete={this.onDelete('AD_Sub_Lamp')}
                        />
                    )
                )}
                <Button onClick={this.newAttrs('AD_Sub_Lamp')} />
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
        return index => {
            AttributeStore.spliceAttrs(key, index);
            let fieldKey = 'attrs.' + key;
            const records = form.getFieldValue(fieldKey);
            form.setFieldsValue({
                [fieldKey]: records.filter((item, i) => i !== index)
            });
        };
    };
}

export default AttrsForm;
