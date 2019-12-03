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
        label: 1,
        value: '每周一'
    },
    {
        label: 2,
        value: '每周二'
    },
    {
        label: 3,
        value: '每周三'
    },
    {
        label: 4,
        value: '每周四'
    },
    {
        label: 5,
        value: '每周五'
    },
    {
        label: 6,
        value: '每周六'
    },
    {
        label: 7,
        value: '每周日'
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
        const month_start = getFieldValue('month_start');
        const week_start = getFieldValue('week_start');
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
                                                    ? echoDateParams.echoStartDate
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
                                                    ? echoDateParams.echoEndDate
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
                                                    ? this.getWeek(
                                                          echoDateParams
                                                      ).echoStartDate
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
                                                        value={`${item.label}-${item.value}`}>
                                                        {item.value}
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
                                                    ? this.getWeek(
                                                          echoDateParams
                                                      ).echoEndDate
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
                                                        value={`${item.label}-${item.value}`}
                                                        disabled={
                                                            week_start &&
                                                            Number(
                                                                week_start.split(
                                                                    '-'
                                                                )[0]
                                                            ) >= item.label
                                                                ? true
                                                                : false
                                                        }>
                                                        {item.value}
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
                                            wrappedComponentRef={form =>
                                                (this.timesSForm = form)
                                            }
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
        this.setState(
            {
                radioChecked: e.target.value
            },
            () => {
                this.props.form.validateFields(['month_start', 'week_start'], {
                    force: true
                });
            }
        );
    };

    timeChange = (params, index) => {
        const { timeArr } = this.state;
        timeArr[index] = params;
        this.setState({
            timeArr
        });
        let timesSForm = this.timesSForm.props.form;
        timesSForm.validateFields((err, values) => {
            if (!err) {
                console.log('err, values---time', err, values);
            }
        });
    };

    onCheckboxChange = checkedValues => {
        this.setState({
            isCheckbox: checkedValues
        });
    };

    getWeek = params => {
        let newParams = {
            echoStartDate: '',
            echoEndDate: ''
        };
        week.map(item => {
            if (item.label === Number(params.echoStartDate)) {
                newParams.echoStartDate = item.value;
            }
            if (item.label === Number(params.echoEndDate)) {
                newParams.echoEndDate = item.value;
            }
        });
        return newParams;
    };

    handleOk = () => {
        const { timeArr, radioChecked } = this.state;
        const { getFieldValue } = this.props.form;
        const month_start = getFieldValue('month_start');
        const month_end = getFieldValue('month_end');
        const week_start = getFieldValue('week_start');
        const week_end = getFieldValue('week_end');
        // // 月/周/日必填项
        let dateFormat = {};
        if (radioChecked === 'month' && month_start) {
            dateFormat = {
                startDate: month_start,
                endDate: month_end,
                switchDate: 'month'
            };
        } else if (radioChecked === 'week' && week_start) {
            dateFormat = {
                startDate: week_start,
                endDate: week_end,
                switchDate: 'week'
            };
        } else {
            dateFormat = {};
        }
        this.props.handleDate(timeArr, dateFormat, false);
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
