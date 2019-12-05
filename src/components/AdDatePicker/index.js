import React from 'react';
import {
    Form,
    Select,
    Modal,
    Checkbox,
    Radio,
    Button,
    Row,
    Col,
    message
} from 'antd';
import AdSelect from 'src/components/Form/AdSelect';
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
        let dataParams = props.dataParams;
        this.state = {
            radioChecked:
                (dataParams && dataParams.echoDateParams.switchDate) || '',
            timeArr:
                dataParams && dataParams.echoTimeArr.length !== 0
                    ? dataParams.echoTimeArr
                    : [params],
            isCheckbox: (dataParams && dataParams.checked) || []
        };
    }

    componentDidMount() {
        this.isNotFirstRender = true;
    }

    render() {
        const { visible, dataParams } = this.props;
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const { radioChecked, isCheckbox, timeArr } = this.state;
        const month_start = this.isNotFirstRender
            ? getFieldValue('month_start')
            : dataParams.echoDateParams.startDate;
        const month_end = this.isNotFirstRender
            ? getFieldValue('month_end')
            : dataParams.echoDateParams.endDate;
        const week_start = this.isNotFirstRender
            ? getFieldValue('week_start')
            : dataParams.echoDateParams.startDate;
        const week_end = this.isNotFirstRender
            ? getFieldValue('week_end')
            : dataParams.echoDateParams.endDate;
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
                    defaultValue={isCheckbox || []}>
                    <Row>
                        <Col className="radio-group">
                            <Checkbox
                                value="radio"
                                checked={
                                    String(dataParams.echoDateParams).length !==
                                    {}
                                }>
                                月/周/日
                            </Checkbox>
                            <Radio.Group
                                onChange={this.radioChange}
                                value={radioChecked}
                                disabled={isCheckbox.indexOf('radio') === -1}>
                                <Radio value="month"></Radio>
                                <Form.Item
                                    className="month-start"
                                    layout="inline">
                                    <span className="ant-form-text">日/月</span>
                                    <span className="ant-form-text">每月</span>
                                    {getFieldDecorator('month_start', {
                                        initialValue:
                                            dataParams.echoDateParams
                                                .switchDate === 'month'
                                                ? dataParams.echoDateParams
                                                      .startDate
                                                : '',
                                        rules: [
                                            {
                                                required: isMonth,
                                                message: '必填项'
                                            }
                                        ]
                                    })(
                                        <AdSelect
                                            className="month-select"
                                            showSearch
                                            disabled={
                                                isCheckbox.indexOf('radio') ===
                                                    -1 ||
                                                radioChecked !== 'month'
                                            }>
                                            {month.map((item, index) => (
                                                <Option
                                                    key={`${item}-${index}`}
                                                    value={item}
                                                    disabled={
                                                        month_end &&
                                                        month_end < item
                                                            ? true
                                                            : false
                                                    }>
                                                    {item}
                                                </Option>
                                            ))}
                                        </AdSelect>
                                    )}
                                    <span className="ant-form-text">日</span>
                                    <span className="gap">~</span>
                                </Form.Item>
                                <Form.Item
                                    className="month-end"
                                    layout="inline">
                                    <span className="ant-form-text">每月</span>
                                    {getFieldDecorator('month_end', {
                                        initialValue:
                                            dataParams.echoDateParams
                                                .switchDate === 'month'
                                                ? dataParams.echoDateParams
                                                      .endDate
                                                : '',
                                        rules: [
                                            {
                                                required: false,
                                                message: '必填'
                                            }
                                        ]
                                    })(
                                        <AdSelect
                                            disabled={
                                                isCheckbox.indexOf('radio') ===
                                                    -1 ||
                                                radioChecked !== 'month'
                                            }
                                            className="month-select">
                                            {month.map((item, index) => (
                                                <Option
                                                    key={`${item}-${index}`}
                                                    value={item}
                                                    disabled={
                                                        month_start > item
                                                            ? true
                                                            : false
                                                    }>
                                                    {item}
                                                </Option>
                                            ))}
                                        </AdSelect>
                                    )}
                                    <span className="ant-form-text">日</span>
                                </Form.Item>
                                <span className="week-radio">
                                    <Radio value="week"></Radio>
                                    <Form.Item className="week-start">
                                        <span className="ant-form-text">
                                            日/周
                                        </span>
                                        {getFieldDecorator('week_start', {
                                            initialValue:
                                                dataParams.echoDateParams
                                                    .switchDate === 'week'
                                                    ? dataParams.echoDateParams
                                                          .startDate
                                                    : '',
                                            rules: [
                                                {
                                                    required: isWeek,
                                                    message: '必填项'
                                                }
                                            ]
                                        })(
                                            <AdSelect
                                                className="week-select"
                                                disabled={
                                                    isCheckbox.indexOf(
                                                        'radio'
                                                    ) === -1 ||
                                                    radioChecked !== 'week'
                                                }>
                                                {week.map((item, index) => (
                                                    <Option
                                                        key={`${item.label}-${index}`}
                                                        value={item.value}
                                                        disabled={
                                                            week_end &&
                                                            week_end <
                                                                item.value
                                                                ? true
                                                                : false
                                                        }>
                                                        {item.label}
                                                    </Option>
                                                ))}
                                            </AdSelect>
                                        )}
                                        <span className="gap">~</span>
                                    </Form.Item>
                                    <Form.Item className="week-end">
                                        {getFieldDecorator('week_end', {
                                            initialValue:
                                                dataParams.echoDateParams
                                                    .switchDate === 'week'
                                                    ? dataParams.echoDateParams
                                                          .endDate
                                                    : '',
                                            rules: [
                                                {
                                                    required: false,
                                                    message: '必填'
                                                }
                                            ]
                                        })(
                                            <AdSelect
                                                disabled={
                                                    isCheckbox.indexOf(
                                                        'radio'
                                                    ) === -1 ||
                                                    radioChecked !== 'week'
                                                }
                                                className="week-select">
                                                {week.map((item, index) => (
                                                    <Option
                                                        key={`${item.label}-${index}`}
                                                        value={item.value}
                                                        disabled={
                                                            week_start >
                                                            item.value
                                                                ? true
                                                                : false
                                                        }>
                                                        {item.label}
                                                    </Option>
                                                ))}
                                            </AdSelect>
                                        )}
                                    </Form.Item>
                                </span>
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
                                <span className="time-picker">
                                    {timeArr.map((time, index) => (
                                        <TimePicker
                                            key={Math.random()}
                                            isCheckbox={isCheckbox}
                                            index={index}
                                            value={time}
                                            timeChange={this.timeChange}
                                            form={this.props.form}
                                            remove={this.remove}
                                        />
                                    ))}
                                </span>
                            </span>
                        </Col>
                    </Row>
                </Checkbox.Group>
            </Modal>
        );
    }
    radioChange = e => {
        if (e.target.value == 'month') {
            this.props.form.setFieldsValue({
                week_start: null,
                week_end: null
            });
        } else if (e.target.value == 'week') {
            this.props.form.setFieldsValue({
                month_start: null,
                month_end: null
            });
        }
        this.setState({
            radioChecked: e.target.value
        });
    };

    onCheckboxChange = checkedValues => {
        let radioChecked = this.state.radioChecked;
        if (!checkedValues.includes('radio')) {
            radioChecked = null;
            this.props.form.setFieldsValue({
                week_start: null,
                week_end: null,
                month_start: null,
                month_end: null
            });
        }

        this.setState({
            isCheckbox: checkedValues,
            radioChecked
        });
    };

    handleOk = () => {
        const { radioChecked, isCheckbox } = this.state;
        const { getFieldValue } = this.props.form;
        const month_start = getFieldValue('month_start');
        const month_end = getFieldValue('month_end') || '';
        const week_start = getFieldValue('week_start');
        const week_end = getFieldValue('week_end') || '';
        const timeArr = getFieldValue('timeArr');
        const isChecked = radioChecked === 'month';

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
        const isCheckTimeEqual = this.handleEqualTimeArr(timeArr);

        this.props.form.validateFields((err, values) => {
            //console.log('err, values', err, values);
            if (err || isCheckTimeEqual) {
                if (isCheckTimeEqual) {
                    message.warning(
                        '时分填写错误，不同行之间不允许设置相同时间！'
                    );
                }
                return false;
            }
            this.props.handleDate(option, false);
        });
    };

    handleEqualTimeArr = timeArr => {
        if (timeArr.length > 1) {
            for (let i = 0; i < timeArr.length; i++) {
                for (let j = i + 1; j < timeArr.length; j++) {
                    if (
                        timeArr[i].startHour === timeArr[j].startHour &&
                        timeArr[i].startMin === timeArr[j].startMin &&
                        timeArr[i].endHour === timeArr[j].endHour &&
                        timeArr[i].endMin === timeArr[j].endMin
                    ) {
                        // this.equalTime.push({ index: j, value: timeArr[i] });
                        return true;
                    }
                }
            }
        } else {
            return false;
        }
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
    remove = index => {
        const { timeArr } = this.state;
        timeArr.splice(index, 1);
        this.setState({
            timeArr
        });
        let _timeArr = this.props.form.getFieldValue('timeArr');
        _timeArr.splice(index, 1);
        this.props.form.setFieldsValue({ timeArr: _timeArr });
    };

    timeChange = (time, index) => {
        let { timeArr } = this.state;
        timeArr[index] = time;
        this.setState({
            timeArr
        });
    };
}

export default AdDatePicker;
