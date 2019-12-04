import React from 'react';
import { Form, Select, Modal, Checkbox, Radio, Button, Row, Col } from 'antd';
import TimePicker from './components/TimePicker';
import './index.less';
const { Option } = Select;

const month = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    26,
    27,
    28,
    29,
    30,
    31
];
const week = [
    {
        value: '1',
        label: '每周一'
    },
    {
        value: '2',
        label: '每周二'
    },
    {
        value: '3',
        label: '每周三'
    },
    {
        value: '4',
        label: '每周四'
    },
    {
        value: '5',
        label: '每周五'
    },
    {
        value: '6',
        label: '每周六'
    },
    {
        value: '7',
        label: '每周日'
    }
];

const params = {
    startHour: '',
    endHour: '',
    startMin: '00',
    endMin: '00',
    isHour: [],
    isMin: []
};

@Form.create()
class AdDatePicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            radioChecked: props.echoDateParams.switchDate || '',
            timeArr:
                props.echoTimeArr.length !== 0 ? props.echoTimeArr : [params],
            isCheckbox: props.checked || []
        };
    }
    render() {
        const { visible, echoDateParams, checked } = this.props;
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const { radioChecked, timeArr = [], isCheckbox } = this.state;
        const month_start =
            echoDateParams.startDate || getFieldValue('month_start');
        const week_start =
            echoDateParams.startDate || getFieldValue('week_start');
        let isWeek = radioChecked === 'week';
        let isMonth = radioChecked === 'month';

        return (
            <Modal
                title="限制时间设置"
                visible={visible}
                width={580}
                onOk={this.handleOk}
                okText="确定"
                cancelText="取消"
                onCancel={this.handleCancel}>
                <Checkbox.Group
                    onChange={this.onCheckboxChange}
                    defaultValue={checked || []}>
                    <Row>
                        <Col className="radio-group">
                            <Checkbox
                                value="radio"
                                checked={String(echoDateParams).length !== {}}>
                                月/周/日
                            </Checkbox>
                            <Radio.Group
                                onChange={this.radioChange}
                                value={radioChecked}
                                disabled={isCheckbox.indexOf('radio') === -1}>
                                <Radio value="month">
                                    <Form.Item
                                        className="month-start"
                                        layout="inline">
                                        <span className="ant-form-text">
                                            日/月
                                        </span>
                                        <span className="ant-form-text">
                                            每月
                                        </span>
                                        {getFieldDecorator('month_start', {
                                            initialValue:
                                                echoDateParams.switchDate ===
                                                'month'
                                                    ? echoDateParams.startDate
                                                    : '',
                                            rules: [
                                                {
                                                    required: isMonth,
                                                    message: '必填'
                                                }
                                            ]
                                        })(
                                            <Select
                                                className="month-select"
                                                showSearch
                                                disabled={
                                                    radioChecked !== 'month'
                                                }>
                                                {month.map((item, index) => (
                                                    <Option
                                                        key={`${item}-${index}`}
                                                        value={item}>
                                                        {item}
                                                    </Option>
                                                ))}
                                            </Select>
                                        )}
                                        <span className="ant-form-text">
                                            日
                                        </span>
                                        <span className="gap">~</span>
                                    </Form.Item>
                                    <Form.Item
                                        className="month-end"
                                        layout="inline">
                                        <span className="ant-form-text">
                                            每月
                                        </span>
                                        {getFieldDecorator('month_end', {
                                            initialValue:
                                                echoDateParams.switchDate ===
                                                'month'
                                                    ? echoDateParams.endDate
                                                    : '',
                                            rules: [
                                                {
                                                    required: false,
                                                    message: '必填'
                                                }
                                            ]
                                        })(
                                            <Select
                                                disabled={
                                                    radioChecked !== 'month'
                                                }
                                                className="month-select">
                                                {month.map((item, index) => (
                                                    <Option
                                                        key={`${item}-${index}`}
                                                        value={item}
                                                        disabled={
                                                            month_start >= item
                                                                ? true
                                                                : false
                                                        }>
                                                        {item}
                                                    </Option>
                                                ))}
                                            </Select>
                                        )}
                                        <span className="ant-form-text">
                                            日
                                        </span>
                                    </Form.Item>
                                </Radio>
                                <Radio value="week">
                                    <Form.Item className="week-start">
                                        <span className="ant-form-text">
                                            日/周
                                        </span>
                                        {getFieldDecorator('week_start', {
                                            initialValue:
                                                echoDateParams.switchDate ===
                                                'week'
                                                    ? echoDateParams.startDate
                                                    : '',
                                            rules: [
                                                {
                                                    required: isWeek,
                                                    message: '必填'
                                                }
                                            ]
                                        })(
                                            <Select
                                                className="week-select"
                                                disabled={
                                                    radioChecked !== 'week'
                                                }>
                                                {week.map((item, index) => (
                                                    <Option
                                                        key={`${item.label}-${index}`}
                                                        value={item.value}>
                                                        {item.label}
                                                    </Option>
                                                ))}
                                            </Select>
                                        )}
                                        <span className="gap">~</span>
                                    </Form.Item>
                                    <Form.Item className="week-end">
                                        {getFieldDecorator('week_end', {
                                            initialValue:
                                                echoDateParams.switchDate ===
                                                'week'
                                                    ? echoDateParams.endDate
                                                    : '',
                                            rules: [
                                                {
                                                    required: false,
                                                    message: '必填'
                                                }
                                            ]
                                        })(
                                            <Select
                                                disabled={
                                                    radioChecked !== 'week'
                                                }
                                                className="week-select">
                                                {week.map((item, index) => (
                                                    <Option
                                                        key={`${item.label}-${index}`}
                                                        value={item.value}
                                                        disabled={
                                                            week_start >=
                                                            item.value
                                                                ? true
                                                                : false
                                                        }>
                                                        {item.label}
                                                    </Option>
                                                ))}
                                            </Select>
                                        )}
                                    </Form.Item>
                                </Radio>
                            </Radio.Group>
                        </Col>
                        <Col>
                            <Checkbox value="checkbox"></Checkbox>
                            <span>
                                <span className="time-min">
                                    时分
                                    <Button className="add" onClick={this.add}>
                                        添加
                                    </Button>
                                </span>
                                {timeArr.map((item, index) => (
                                    <span
                                        className="time-picker"
                                        key={`time${index}`}>
                                        <TimePicker
                                            key={Math.random()}
                                            isCheckbox={isCheckbox}
                                            index={index}
                                            timeChange={this.timeChange}
                                            value={item}
                                            form={this.props.form}
                                            remove={() => this.remove(index)}
                                        />
                                    </span>
                                ))}
                            </span>
                        </Col>
                    </Row>
                </Checkbox.Group>
            </Modal>
        );
    }
    radioChange = e => {
        // const callback = (err, values) => {
        //     console.log('err, values', err, values);
        // };
        this.setState(
            {
                radioChecked: e.target.value
            }
            // () => {
            //     this.props.form.validateFields(
            //         ['month_start', 'week_start'],
            //         {
            //             force: true
            //         },
            //         callback
            //     );
            // }
        );
    };

    timeChange = (params, index) => {
        const { timeArr } = this.state;
        timeArr[index] = params;
        this.setState({
            timeArr
        });
    };

    onCheckboxChange = checkedValues => {
        this.setState({
            isCheckbox: checkedValues
        });
        this.props.form.validateFields((err, values) => {
            console.log('err, values', err, values);
            if (err) {
                return false;
            }
        });
    };

    handleOk = () => {
        const { timeArr, radioChecked, isCheckbox } = this.state;
        const { getFieldValue } = this.props.form;
        const month_start = getFieldValue('month_start');
        const month_end = getFieldValue('month_end') || '';
        const week_start = getFieldValue('week_start');
        const week_end = getFieldValue('week_end') || '';
        const isChecked = radioChecked === 'month';

        // // 月/周/日必填项
        const dateFormat = {
            startDate: isChecked ? month_start : week_start,
            endDate: isChecked ? month_end : week_end,
            switchDate: radioChecked || ''
        };
        let option = {
            timeArr,
            dateFormat,
            isCheckbox
        };

        this.props.form.validateFields((err, values) => {
            console.log('err, values', err, values);
            if (err) {
                return false;
            }
            this.props.handleDate(option, false);
        });
    };

    handleCancel = () => {
        this.props.handleCancel(false);
    };

    // 时分增加行
    add = () => {
        const { timeArr } = this.state;
        timeArr.push(params);
        this.setState({
            timeArr
        });
    };
    remove = k => {
        const { timeArr } = this.state;
        timeArr.splice(k, 1);

        this.setState({
            timeArr
        });
    };
}

export default AdDatePicker;
