import React from 'react';
import { inject, observer } from 'mobx-react';
import { Empty, Form, Input } from 'antd';

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
            return this.renderInput(item, index, 'rels');
        }
    };

    renderInput = (item, index, filedKey) => {
        const { form, AttributeStore } = this.props;
        const { readonly } = AttributeStore;
        let key = filedKey + '.id' + item.id + '.' + item.key;

        return (
            <Form.Item key={index} label={item.name} {...formItemLayout}>
                {!readonly ? (
                    form.getFieldDecorator(key, {
                        rules: [
                            {
                                required: true,
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

    renderGroupItem = (item, index) => {
        return (
            <div key={index}>
                {this.renderInput(item, index, 'rels')}
                {}
            </div>
        );
    };

    isPresent(obj) {
        return (!!obj && String(obj) != '') || obj === 0;
    }
}

export default RelationForm;
