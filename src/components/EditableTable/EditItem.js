import React from 'react';
import { Form, Select } from 'antd';
import { TYPE_SELECT_OPTION_MAP } from 'src/config/ADMapDataConfig';
import AdInput from 'src/components/Form/AdInput';
import AdInputNumber from 'src/components/Form/AdInputNumber';

@Form.create()
class EditItem extends React.Component {
    state = {
        editing: false
    };

    render() {
        const { record } = this.props;
        let renderAction = 'render' + record.domType;
        return this[renderAction]();
    }

    renderText(hover, action, text) {
        const { dataIndex, record } = this.props;
        text = text || record[dataIndex];
        return (
            <div
                className={
                    hover ? 'editable-cell-value-wrap' : 'cell-value-wrap'
                }
                onClick={action ? action : () => {}}>
                {text}
            </div>
        );
    }

    renderInputNumber() {
        const { record, form, dataIndex, title } = this.props;
        const { editing } = this.state;
        return editing ? (
            <Form.Item style={{ margin: 0 }}>
                {form.getFieldDecorator(dataIndex, {
                    rules: [
                        {
                            required: true,
                            message: `${title}必填,请输入合法的数字`
                        }
                    ],
                    initialValue: record[dataIndex]
                })(
                    <AdInputNumber
                        type="number"
                        ref={node => (this.node = node)}
                        onPressEnter={this.save}
                        onBlur={this.save}
                    />
                )}
            </Form.Item>
        ) : (
            this.renderText(true, this.toggleEdit)
        );
    }

    renderInput() {
        const { record, form, dataIndex, title } = this.props;
        const { editing } = this.state;
        return editing ? (
            <Form.Item style={{ margin: 0 }}>
                {form.getFieldDecorator(dataIndex, {
                    rules: [
                        {
                            required: true,
                            message: `${title}必填`
                        }
                    ],
                    initialValue: record[dataIndex]
                })(
                    <AdInput
                        ref={node => (this.node = node)}
                        onPressEnter={this.save}
                        onBlur={this.save}
                    />
                )}
            </Form.Item>
        ) : (
            this.renderText(true, this.toggleEdit)
        );
    }

    renderSelect() {
        const { record, form, dataIndex, title } = this.props;
        const { editing } = this.state;
        const options = TYPE_SELECT_OPTION_MAP[record.type];
        let option = options.find(op => {
            return op.value == record[dataIndex];
        });
        let text = option ? option.label : record[dataIndex];
        return editing ? (
            <Form.Item style={{ margin: 0 }}>
                {form.getFieldDecorator(dataIndex, {
                    rules: [
                        {
                            required: true,
                            message: `${title}必填`
                        }
                    ],
                    initialValue: record[dataIndex]
                })(
                    <Select
                        showSearch
                        style={{ width: '100%' }}
                        optionFilterProp="children"
                        onChange={this.handleChange}
                        onBlur={this.toggleEdit}
                        filterOption={(input, option) =>
                            option.props.children
                                .toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0
                        }
                        ref={node => (this.node = node)}>
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
        ) : (
            this.renderText(true, this.toggleEdit, text)
        );
    }

    toggleEdit = () => {
        const editing = !this.state.editing;
        this.setState({ editing }, () => {
            if (editing) {
                this.node.focus();
            }
        });
    };

    save = e => {
        const { record, handleSave, form } = this.props;
        form.validateFields((error, values) => {
            if (error && error[e.currentTarget.id]) {
                return;
            }
            handleSave({ ...record, ...values });
            this.toggleEdit();
        });
    };

    handleChange = value => {
        const { record, handleSave } = this.props;
        handleSave({ ...record, value: value });
    };
}

export default EditItem;
