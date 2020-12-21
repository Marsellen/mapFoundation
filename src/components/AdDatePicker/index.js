import React from 'react';
import { Form, Select, Modal, Checkbox, Radio, Button, Row, Col, message } from 'antd';
import TimePicker from './components/TimePicker';
import './index.less';
const { Option } = Select;

const YEAR_MONTH_DAY_WEEK = ['YEAR_MONTH_DAY_WEEK_CYCLE', 'YEAR_MONTH_DAY_SECTION'];

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
            radioChecked: (dataParams && dataParams.echoDateParams.switchDate) || 'month',
            timeArr:
                dataParams && dataParams.echoTimeArr.length !== 0
                    ? dataParams.echoTimeArr
                    : [params],
            isCheckbox: (dataParams && dataParams.checked) || [],
            yearMonthDayWeekChecked:
                dataParams.yearMonthDayWeekChecked || 'YEAR_MONTH_DAY_WEEK_CYCLE',
            yearMonthCheckbox: dataParams.yearMonthCheckbox || false,
            yearMonthA: dataParams.echoYearMonthParams.yearMonthA || null,
            isYearMonthA: [],
            yearMonthB: dataParams.echoYearMonthParams.yearMonthB || null,
            isYearMonthB: [],
            yearMonthC: dataParams.echoYearMonthParams.yearMonthC || null,
            isYearMonthC: [],
            yearMonthD: dataParams.echoYearMonthParams.yearMonthD || null,
            isYearMonthD: [],
            isYearMonthJ: [],
            yearMonthJ: dataParams.echoMonthDaySectionParams.yearMonthJ || null,
            isYearMonthK: [],
            yearMonthK: dataParams.echoMonthDaySectionParams.yearMonthK || null,
            isYearMonthM: [],
            yearMonthM: dataParams.echoMonthDaySectionParams.yearMonthM || null,
            isYearMonthN: [],
            yearMonthN: dataParams.echoMonthDaySectionParams.yearMonthN || null
        };
    }

    componentDidMount() {
        this.isNotFirstRender = true;
    }

    handleYearMonthDayWeek = value => {
        YEAR_MONTH_DAY_WEEK.forEach(elem => {
            if (value == elem) {
                this.setState({
                    yearMonthDayWeekChecked: elem
                });
            }
        });
    };

    render() {
        const { visible, dataParams } = this.props;
        const { yearMonthDayWeekChecked, isCheckbox, timeArr } = this.state;

        return (
            <Modal
                className="date-picker-modal"
                title="限制时间设置"
                visible={visible}
                width={750}
                onOk={this.handleOk}
                okText="确定"
                cancelText="取消"
                onCancel={this.handleCancel}
            >
                <Checkbox.Group onChange={this.onCheckboxChange} defaultValue={isCheckbox || []}>
                    <Row>
                        <Col className="year-month-day-week-list">
                            <Checkbox
                                className="outer-checkbox"
                                value="radio"
                                checked={String(dataParams.echoDateParams).length !== {}}
                            >
                                年月日周
                            </Checkbox>
                            <Radio
                                className="year-month-day-week"
                                checked={yearMonthDayWeekChecked == 'YEAR_MONTH_DAY_WEEK_CYCLE'}
                                disabled={!isCheckbox.includes('radio')}
                                onChange={() =>
                                    this.handleYearMonthDayWeek('YEAR_MONTH_DAY_WEEK_CYCLE')
                                }
                            >
                                年月日周循环
                            </Radio>
                            {this.renderYearMonthDayWeekCycle(yearMonthDayWeekChecked)}
                            <Radio
                                className="year-month-day-week"
                                checked={yearMonthDayWeekChecked == 'YEAR_MONTH_DAY_SECTION'}
                                disabled={!isCheckbox.includes('radio')}
                                onChange={() =>
                                    this.handleYearMonthDayWeek('YEAR_MONTH_DAY_SECTION')
                                }
                            >
                                年月日区间
                            </Radio>
                            {this.renderYearMonthDaySection(yearMonthDayWeekChecked)}
                        </Col>
                        <Col>
                            <Checkbox value="checkbox"></Checkbox>
                            <span>
                                <span className="time-min">
                                    时分
                                    <Button
                                        disabled={isCheckbox.indexOf('checkbox') === -1}
                                        className="add"
                                        onClick={this.add}
                                    >
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

    renderYearMonthDayWeekCycle = yearMonthDayWeekChecked => {
        const {
            radioChecked,
            isCheckbox,
            isYearMonthA,
            isYearMonthB,
            isYearMonthC,
            isYearMonthD,
            yearMonthCheckbox,
            yearMonthA,
            yearMonthB,
            yearMonthC,
            yearMonthD
        } = this.state;
        const {
            form: { getFieldDecorator, getFieldValue },
            dataParams
        } = this.props;
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
        let isWeek =
            radioChecked === 'week' && yearMonthDayWeekChecked == 'YEAR_MONTH_DAY_WEEK_CYCLE';
        let isMonth =
            radioChecked === 'month' && yearMonthDayWeekChecked == 'YEAR_MONTH_DAY_WEEK_CYCLE';
        const disabled =
            !isCheckbox.includes('radio') || yearMonthDayWeekChecked != 'YEAR_MONTH_DAY_WEEK_CYCLE';
        const diffAC = yearMonthA < yearMonthC;
        return (
            <span className="year-month-day-week-cycle">
                <div className="year-month-day-week-checkbox">
                    <Checkbox
                        className="year-month"
                        disabled={disabled}
                        onChange={this.handleYearMonth}
                    >
                        年/月
                    </Checkbox>
                    <Form.Item>
                        {getFieldDecorator('yearMonthA', {
                            initialValue: yearMonthA || '',
                            rules: [
                                {
                                    required:
                                        !disabled && yearMonthCheckbox && !yearMonthA && yearMonthB,
                                    message: '请填入'
                                }
                            ]
                        })(
                            <Select
                                disabled={!yearMonthCheckbox || disabled}
                                onChange={val =>
                                    this.createSection(
                                        2000,
                                        2100,
                                        val,
                                        'isYearMonthC',
                                        'yearMonthA'
                                    )
                                }
                            >
                                {this.createSection(2000, 2100).map(item => (
                                    <Option
                                        disabled={this.dropdownRender(isYearMonthA, item, true)}
                                        key={item}
                                        value={item}
                                    >
                                        {item}
                                    </Option>
                                ))}
                            </Select>
                        )}
                        <span className="ant-form-text">年</span>
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('yearMonthB', {
                            initialValue: yearMonthB || '',
                            rules: [
                                {
                                    required: !disabled && yearMonthCheckbox && !yearMonthB,
                                    message: '请填入'
                                }
                            ]
                        })(
                            <Select
                                disabled={!yearMonthCheckbox || disabled}
                                onChange={val =>
                                    this.createSection(
                                        1,
                                        12,
                                        val,
                                        'isYearMonthD',
                                        'yearMonthB',
                                        true
                                    )
                                }
                            >
                                {this.createSection(1, 12).map(item => (
                                    <Option
                                        disabled={
                                            !diffAC && this.dropdownRender(isYearMonthB, item, true)
                                        }
                                        key={item}
                                        value={item}
                                    >
                                        {item}
                                    </Option>
                                ))}
                            </Select>
                        )}
                        <span className="ant-form-text">月</span>
                        <span className="gap">~</span>
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('yearMonthC', {
                            initialValue: yearMonthC || '',
                            rules: [
                                {
                                    required:
                                        !disabled &&
                                        yearMonthCheckbox &&
                                        yearMonthA &&
                                        yearMonthB &&
                                        yearMonthD &&
                                        !yearMonthC,
                                    message: '请填入'
                                }
                            ]
                        })(
                            <Select
                                disabled={!yearMonthCheckbox || disabled}
                                onChange={val =>
                                    this.createSection(
                                        2000,
                                        2100,
                                        val,
                                        'isYearMonthA',
                                        'yearMonthC'
                                    )
                                }
                            >
                                {this.createSection(2000, 2100).map(item => (
                                    <Option
                                        disabled={this.dropdownRender(isYearMonthC, item, false)}
                                        key={item}
                                        value={item}
                                    >
                                        {item}
                                    </Option>
                                ))}
                            </Select>
                        )}
                        <span className="ant-form-text">年</span>
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('yearMonthD', {
                            initialValue: yearMonthD || '',
                            rules: [
                                {
                                    required:
                                        !disabled &&
                                        yearMonthCheckbox &&
                                        yearMonthA &&
                                        yearMonthB &&
                                        yearMonthC &&
                                        !yearMonthD,
                                    message: '请填入'
                                }
                            ]
                        })(
                            <Select
                                disabled={!yearMonthCheckbox || disabled}
                                onChange={val =>
                                    this.createSection(1, 12, val, 'isYearMonthB', 'yearMonthD')
                                }
                            >
                                {this.createSection(1, 12).map(item => (
                                    <Option
                                        disabled={
                                            !diffAC &&
                                            this.dropdownRender(isYearMonthD, item, false)
                                        }
                                        key={item}
                                        value={item}
                                    >
                                        {item}
                                    </Option>
                                ))}
                            </Select>
                        )}
                        <span className="ant-form-text">月</span>
                    </Form.Item>
                </div>
                <Radio.Group onChange={this.radioChange} value={radioChecked} disabled={disabled}>
                    <div className="month">
                        <Radio value="month">日/月</Radio>
                        <Form.Item layout="inline">
                            <span className="ant-form-text">每月</span>
                            {getFieldDecorator('month_start', {
                                initialValue:
                                    dataParams.echoDateParams.switchDate === 'month'
                                        ? dataParams.echoDateParams.startDate
                                        : '',
                                rules: [
                                    {
                                        required: isMonth,
                                        message: '必填项'
                                    }
                                ]
                            })(
                                <Select
                                    className="month-select"
                                    showSearch
                                    disabled={disabled || radioChecked !== 'month'}
                                >
                                    {this.createSection(1, 31).map(item => (
                                        <Option
                                            disabled={month_end && month_end <= item}
                                            key={item}
                                            value={item}
                                        >
                                            {item}
                                        </Option>
                                    ))}
                                </Select>
                            )}
                            <span className="ant-form-text">日</span>
                            <span className="gap">~</span>
                        </Form.Item>
                        <Form.Item className="month-end" layout="inline">
                            <span className="ant-form-text">每月</span>
                            {getFieldDecorator('month_end', {
                                initialValue:
                                    dataParams.echoDateParams.switchDate === 'month'
                                        ? dataParams.echoDateParams.endDate
                                        : '',
                                rules: [
                                    {
                                        required: false,
                                        message: '必填'
                                    }
                                ]
                            })(
                                <Select
                                    showSearch
                                    disabled={disabled || radioChecked !== 'month'}
                                    className="month-select"
                                >
                                    {this.createSection(1, 31).map(item => (
                                        <Option
                                            disabled={month_start >= item}
                                            key={item}
                                            value={item}
                                        >
                                            {item}
                                        </Option>
                                    ))}
                                </Select>
                            )}
                            <span className="ant-form-text">日</span>
                        </Form.Item>
                    </div>
                    <div className="week">
                        <Radio value="week">日/周</Radio>
                        <Form.Item>
                            {getFieldDecorator('week_start', {
                                initialValue:
                                    dataParams.echoDateParams.switchDate === 'week'
                                        ? dataParams.echoDateParams.startDate
                                        : '',
                                rules: [
                                    {
                                        required: isWeek,
                                        message: '必填项'
                                    }
                                ]
                            })(
                                <Select disabled={disabled || radioChecked !== 'week'}>
                                    {week.map((item, index) => (
                                        <Option
                                            key={`${item.label}-${index}`}
                                            value={item.value}
                                            disabled={week_end && week_end <= item.value}
                                        >
                                            {item.label}
                                        </Option>
                                    ))}
                                </Select>
                            )}
                            <span className="gap">~</span>
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('week_end', {
                                initialValue:
                                    dataParams.echoDateParams.switchDate === 'week'
                                        ? dataParams.echoDateParams.endDate
                                        : '',
                                rules: [
                                    {
                                        required: false,
                                        message: '必填'
                                    }
                                ]
                            })(
                                <Select disabled={disabled || radioChecked !== 'week'}>
                                    {week.map((item, index) => (
                                        <Option
                                            key={`${item.label}-${index}`}
                                            value={item.value}
                                            disabled={week_start >= item.value}
                                        >
                                            {item.label}
                                        </Option>
                                    ))}
                                </Select>
                            )}
                        </Form.Item>
                    </div>
                </Radio.Group>
            </span>
        );
    };

    renderYearMonthDaySection = yearMonthDayWeekChecked => {
        const {
            isCheckbox,
            isYearMonthJ,
            isYearMonthK,
            isYearMonthM,
            isYearMonthN,
            yearMonthJ,
            yearMonthK,
            yearMonthM,
            yearMonthN
        } = this.state;
        const {
            form: { getFieldDecorator }
        } = this.props;
        const disabled =
            !isCheckbox.includes('radio') || yearMonthDayWeekChecked != 'YEAR_MONTH_DAY_SECTION';
        const diffJM = yearMonthJ < yearMonthM;
        return (
            <span className="year-month-day-section">
                <Form.Item>
                    {getFieldDecorator('yearMonthJ', {
                        initialValue: yearMonthJ || '',
                        rules: [
                            {
                                required: !disabled && !yearMonthJ && yearMonthK,
                                message: '请填入'
                            }
                        ]
                    })(
                        <Select
                            disabled={disabled}
                            onChange={val =>
                                this.createSection(1, 12, val, 'isYearMonthM', 'yearMonthJ')
                            }
                        >
                            {this.createSection(1, 12).map(item => (
                                <Option
                                    disabled={this.dropdownRender(isYearMonthJ, item, true)}
                                    key={item}
                                    value={item}
                                >
                                    {item}
                                </Option>
                            ))}
                        </Select>
                    )}
                    <span className="ant-form-text">月</span>
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('yearMonthK', {
                        initialValue: yearMonthK || '',
                        rules: [
                            {
                                required: !disabled && !yearMonthK,
                                message: '请填入'
                            }
                        ]
                    })(
                        <Select
                            disabled={disabled}
                            onChange={val =>
                                this.createSection(1, 31, val, 'isYearMonthN', 'yearMonthK', true)
                            }
                        >
                            {this.createSection(1, 31).map(item => (
                                <Option
                                    disabled={
                                        !diffJM && this.dropdownRender(isYearMonthK, item, true)
                                    }
                                    key={item}
                                    value={item}
                                >
                                    {item}
                                </Option>
                            ))}
                        </Select>
                    )}
                    <span className="ant-form-text">日</span>
                    <span className="gap">~</span>
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('yearMonthM', {
                        initialValue: yearMonthM || '',
                        rules: [
                            {
                                required:
                                    !disabled &&
                                    yearMonthJ &&
                                    yearMonthK &&
                                    yearMonthN &&
                                    !yearMonthM,
                                message: '请填入'
                            }
                        ]
                    })(
                        <Select
                            disabled={disabled}
                            onChange={val =>
                                this.createSection(1, 12, val, 'isYearMonthJ', 'yearMonthM')
                            }
                        >
                            {this.createSection(1, 12).map(item => (
                                <Option
                                    disabled={this.dropdownRender(isYearMonthM, item, false)}
                                    key={item}
                                    value={item}
                                >
                                    {item}
                                </Option>
                            ))}
                        </Select>
                    )}
                    <span className="ant-form-text">月</span>
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('yearMonthN', {
                        initialValue: yearMonthN || '',
                        rules: [
                            {
                                required:
                                    !disabled &&
                                    yearMonthJ &&
                                    yearMonthK &&
                                    yearMonthM &&
                                    !yearMonthN,
                                message: '请填入'
                            }
                        ]
                    })(
                        <Select
                            disabled={disabled}
                            onChange={val =>
                                this.createSection(1, 31, val, 'isYearMonthK', 'yearMonthN')
                            }
                        >
                            {this.createSection(1, 31).map(item => (
                                <Option
                                    disabled={
                                        !diffJM && this.dropdownRender(isYearMonthN, item, false)
                                    }
                                    key={item}
                                    value={item}
                                >
                                    {item}
                                </Option>
                            ))}
                        </Select>
                    )}
                    <span className="ant-form-text">日</span>
                </Form.Item>
            </span>
        );
    };

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

    handleYearMonth = e => {
        this.setState({
            yearMonthCheckbox: e.target.checked
        });
    };

    createSection = (min, max, checkedValues, isYearMonth, yearMonth, bool) => {
        let data = [];
        for (let i = min; i <= max; i++) {
            data.push(i);
        }
        if (checkedValues) {
            this.setState({
                [`${isYearMonth}`]: data.slice(
                    bool ? checkedValues - min + 1 : checkedValues - min
                ),
                [`${yearMonth}`]: checkedValues
            });
        }
        return data;
    };

    dropdownRender = (cycle = [], item, method) => {
        if (cycle.length > 0) {
            let c = method ? cycle.indexOf(item) > -1 : cycle.indexOf(item) == -1;
            return c ? true : false;
        } else {
            return false;
        }
    };

    handleOk = () => {
        const { radioChecked, isCheckbox, yearMonthCheckbox, yearMonthDayWeekChecked } = this.state;
        const { getFieldValue } = this.props.form;
        const month_start = getFieldValue('month_start');
        const month_end = getFieldValue('month_end') || '';
        const week_start = getFieldValue('week_start');
        const week_end = getFieldValue('week_end') || '';
        const yearMonthA = getFieldValue('yearMonthA');
        const yearMonthB = getFieldValue('yearMonthB');
        const yearMonthC = getFieldValue('yearMonthC');
        const yearMonthD = getFieldValue('yearMonthD');
        const yearMonthJ = getFieldValue('yearMonthJ');
        const yearMonthK = getFieldValue('yearMonthK');
        const yearMonthM = getFieldValue('yearMonthM');
        const yearMonthN = getFieldValue('yearMonthN');
        const timeArr = getFieldValue('timeArr');
        const isChecked = radioChecked === 'month';

        let yearMonthCycle = {
            yearMonthA,
            yearMonthB,
            yearMonthC,
            yearMonthD
        };
        let yearMonthDaySection = {
            yearMonthJ,
            yearMonthK,
            yearMonthM,
            yearMonthN
        };
        const dateFormat = {
            yearMonthCycle: yearMonthCheckbox ? yearMonthCycle : {}, //年月
            startDate: isChecked ? month_start : week_start,
            endDate: isChecked ? month_end : week_end,
            yearMonthDaySection:
                yearMonthDayWeekChecked == 'YEAR_MONTH_DAY_SECTION' ? yearMonthDaySection : {}, //年月日区间
            switchDate: radioChecked || ''
        };
        let option = {
            timeArr,
            dateFormat,
            isCheckbox,
            yearMonthCheckbox,
            yearMonthDayWeekChecked,
            radioChecked
        };
        const isCheckTimeEqual = this.handleEqualTimeArr(timeArr);

        this.props.form.validateFields((err, values) => {
            //console.log('err, values', err, values);
            if ((err || isCheckTimeEqual) && isCheckbox.length !== 0) {
                if (isCheckTimeEqual) {
                    message.warning('时分填写错误，不同行之间不允许设置相同时间！');
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
