import React from 'react';
import { inject, observer } from 'mobx-react';
import { Empty, Form, Input, message } from 'antd';

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
        return this.renderInput(item, index, 'rels');
    };

    renderInput = (item, index, filedKey) => {
        const { form, AttributeStore } = this.props;
        const { readonly } = AttributeStore;

        return (
            <Form.Item key={index} label={item.name} {...formItemLayout}>
                {!readonly ? (
                    form.getFieldDecorator(filedKey + '.' + item.key, {
                        rules: [
                            {
                                required: item.required,
                                message: `${item.name}必填`
                            },
                            ...(item.validates || []).map(validate => validate)
                        ],
                        initialValue: item.value
                    })(<Input disabled={readonly} />)
                ) : (
                    <span className="ant-form-text">
                        {this.isPresent(item.value) ? item.value : '--'}
                    </span>
                )}
            </Form.Item>
        );
    };

    isPresent(obj) {
        return (!!obj && String(obj) != '') || obj === 0;
    }
}

export default RelationForm;
