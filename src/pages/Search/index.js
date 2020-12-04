import React, { useReducer } from 'react';
import 'src/assets/less/search.less';
import { ConfigProvider, Form, Input, Button, Select, DatePicker, InputNumber } from 'antd';
import moment from 'moment';
import zh_CN from 'antd/es/locale/zh_CN';
import LogList from 'src/pages/Search/component/LogList';
import { LogStore, logState, LogReducer } from 'src/pages/Search/store/LogStore';
import { DATA_LAYER_MAP } from 'src/config/DataLayerConfig';
import { getLogList } from 'src/pages/Search/request/LogRequest';

const DATA_LAYER_ARR = Object.values(DATA_LAYER_MAP);
const { Option } = Select;

function Search(props) {
    const { getFieldDecorator } = props.form;
    const [state, dispatch] = useReducer(LogReducer, logState);

    const disabledStartDate = startValue => {
        const { getFieldValue } = props.form;
        let endTime = getFieldValue('endTime');
        if (!(startValue && endTime)) return false;
        return startValue.valueOf() > endTime.valueOf();
    };

    const disabledEndDate = endValue => {
        const { getFieldValue } = props.form;
        let startTime = getFieldValue('startTime');
        if (!(endValue && startTime)) return false;
        return endValue.valueOf() <= startTime.valueOf();
    };

    const handleLayerNameChange = value => {
        props.form.setFieldsValue({
            layerName: DATA_LAYER_MAP[value].spec,
            layerField: DATA_LAYER_MAP[value].id
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        props.form.validateFields(async (err, values) => {
            if (err) return;
            const startTime = moment(values.startTime).format('YYYY-MM-DD HH-mm-ss.SSS') || null;
            const endTime = moment(values.endTime).format('YYYY-MM-DD HH-mm-ss.SSS') || null;
            const logListData = await getLogList({
                userName: values.userName,
                taskId: values.taskId,
                startTime: startTime,
                endTime: endTime,
                pageSize: 10,
                pageNumber: 1,
                layerName: values.layerName || '',
                layerField: values.layerField || '',
                layerId: values.layerId || ''
            });
            dispatch({ type: 'setLogList', logListData });
        });
    };

    return (
        <div className="log-wrap">
            <ConfigProvider locale={zh_CN}>
                <Form layout="inline" onSubmit={handleSubmit}>
                    <Form.Item label="用户名">
                        {getFieldDecorator('userName', {
                            rules: [
                                {
                                    required: false,
                                    message: '请输入用户名'
                                }
                            ]
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="任务编号">
                        {getFieldDecorator('taskId', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入用户编号'
                                }
                            ]
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="起始时间">
                        {getFieldDecorator('startTime')(
                            <DatePicker disabledDate={disabledStartDate} />
                        )}
                    </Form.Item>
                    <Form.Item label="结束时间">
                        {getFieldDecorator('endTime')(
                            <DatePicker disabledDate={disabledEndDate} />
                        )}
                    </Form.Item>
                    <Form.Item label="图层名称">
                        {getFieldDecorator('layerName')(
                            <Select
                                onChange={handleLayerNameChange}
                                dropdownMatchSelectWidth={false}
                            >
                                {DATA_LAYER_ARR.map(item => (
                                    <Option key={item.spec}>{item.label}</Option>
                                ))}
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item label="图层对应ID字段名称">
                        {getFieldDecorator('layerField')(
                            <Select
                                onChange={handleLayerNameChange}
                                dropdownMatchSelectWidth={false}
                            >
                                {DATA_LAYER_ARR.map(item => (
                                    <Option key={item.spec}>
                                        {item.id} - {item.label}
                                    </Option>
                                ))}
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item label="ID值">
                        {getFieldDecorator('layerId')(<InputNumber />)}
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            查询
                        </Button>
                    </Form.Item>
                </Form>
                <LogStore.Provider value={{ state, dispatch, form: props.form }}>
                    <LogList />
                </LogStore.Provider>
            </ConfigProvider>
        </div>
    );
}

const WrappedForm = Form.create({ name: 'form' })(Search);

export default WrappedForm;
