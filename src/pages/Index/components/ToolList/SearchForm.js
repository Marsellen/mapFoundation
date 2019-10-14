import React from 'react';
import { Form, Input, Select } from 'antd';
import { inject, observer } from 'mobx-react';
import { getLayerItems } from 'src/utils/vectorCtrl/propertyTableCtrl';
import { DATA_LAYER_MAP } from 'src/config/DataLayerConfig';
import { COLUMNS_CONFIG } from 'src/config/PropertiesTableConfig';
const FormItem = Form.Item;

@inject('DataLayerStore')
@inject('AttributeStore')
@observer
class SearchForm extends React.Component {
    constructor() {
        super();
    }
    render() {
        const { DataLayerStore, form } = this.props;
        let options = DataLayerStore.layers || [];
        let editLayer = DataLayerStore.getEditLayer();
        let defaultValue = editLayer ? editLayer.layerName : null;
        
        return (
            <Form labelCol={{ span: 12 }} wrapperCol={{ span: 12 }}>
                        <FormItem label="要素所在图层：">
                        {form.getFieldDecorator('currentLayer', {
                            rules: [{ required: true, message: '请选择要素所在图层!' }],
                            initialValue: defaultValue
                        })(
                            <Select
                                onChange={this.getData}
                                className="layer-select">
                                {options.map((option, index) => {
                                    return (
                                        <Select.Option
                                            key={index}
                                            value={option.value}>
                                            {this.getLabel(option)}
                                        </Select.Option>
                                    );
                                })}
                            </Select>
                        )}
                        </FormItem>
                        <FormItem label="要素用户编号：">
                        {form.getFieldDecorator('No', {
                            rules: [{ required: true, message: '请选择要素用户编号!' }],
                        })(<Input />)}
                        </FormItem>
                    </Form>
        )
    }

    getLabel = item => {
        if (!item.value) {
            return item.label;
        }
        return DATA_LAYER_MAP[item.value]
            ? DATA_LAYER_MAP[item.value].label
            : item.value;
    };

    getData = layerName => {
        if (!layerName) {
            const { DataLayerStore } = this.props;
            let editLayer = DataLayerStore.getEditLayer();
            layerName = editLayer ? editLayer.layerName : null;
        }
        let _columns = layerName ? COLUMNS_CONFIG[layerName] : [];
        let columns = _columns.map(col => {
            return {
                ...col,
                onCell: record => ({
                    record,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    filterBy: col.filterBy
                }),
                sorter: this.sorter(col)
            };
        });
        let dataSource = getLayerItems(layerName);
        
        this.setState({ layerName, columns, dataSource });
    };

    sorter = col => {
        return (a, b) => {
            if (
                /[0-9]/.test(a[col.dataIndex]) &&
                /[0-9]/.test(b[col.dataIndex])
            ) {
                return parseInt(a[col.dataIndex]) - parseInt(b[col.dataIndex]);
            } else {
                if (!a[col.dataIndex] && a[col.dataIndex] !== 0) {
                    return 1;
                }
                if (!b[col.dataIndex] && b[col.dataIndex] !== 0) {
                    return -1;
                }
                return a[col.dataIndex] > b[col.dataIndex] ? 1 : -1;
            }
        };
    };
}

const FormInfo = Form.create()(SearchForm);

export default FormInfo;