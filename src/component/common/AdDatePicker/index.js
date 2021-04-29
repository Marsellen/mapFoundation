import React from 'react';
import { Form, Select, Modal, Checkbox, Radio, Button, Row, Col, message } from 'antd';
import { getData, setValidatorStart, setValidatorEnd, setCallback } from 'src/tool/timeUtils';
import TimePicker from './timePicker';
import 'src/asset/less/ad-date-picker.less';
const { Option } = Select;

const YEAR = getData(2000, 2100);
const MONTH = getData(1, 12);
const DAY = getData(1, 31);

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
        const {
            echoTimeArr,
            checked,
            echoDateParams: { switchDate },
            yearMonthDayWeekChecked,
            yearMonthCheckbox = false,
            echoYearMonthParams: {
                yearMonthA = null,
                yearMonthB = null,
                yearMonthC = null,
                yearMonthD = null
            },
            echoMonthDaySectionParams: {
                yearMonthJ = null,
                yearMonthK = null,
                yearMonthM = null,
                yearMonthN = null
            }
        } = props.dataParams;
        this.state = {
            radioChecked: switchDate || 'month',
            timeArr: echoTimeArr.length !== 0 ? echoTimeArr : [params],
            isCheckbox: checked || [],
            yearMonthDayWeekChecked,
            yearMonthCheckbox,
            yearMonthA,
            isYearMonthA: [],
            yearMonthB,
            isYearMonthB: [],
            yearMonthC,
            isYearMonthC: [],
            yearMonthD,
            isYearMonthD: [],
            isYearMonthJ: [],
            yearMonthJ,
            isYearMonthK: [],
            yearMonthK,
            isYearMonthM: [],
            yearMonthM,
            isYearMonthN: [],
            yearMonthN
        };
    }

    componentDidMount() {
        this.isNotFirstRender = true;
    }

    handleYearMonthDayWeek = value => {
        this.setState({
            yearMonthDayWeekChecked: value
        });
    };

    render() {
        const { visible, dataParams } = this.props;
        const { yearMonthDayWeekChecked, isCheckbox, timeArr } = this.state;
        const echoDateParams = !!dataParams && dataParams.echoDateParams;
        return (
            <Modal
                className="date-picker-modal"
                title="限制时间设置"
                maskClosable={false}
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
                                checked={echoDateParams && String(echoDateParams).length !== {}}
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
                            {this.renderYearMonthDayWeekCycle(
                                yearMonthDayWeekChecked,
                                echoDateParams
                            )}
                            <Radio
                                className="year-month-day-week"
                                checked={yearMonthDayWeekChecked == 'YEAR_MONTH_DAY_SECTION'}
                                disabled={!isCheckbox.includes('radio')}
                                onChange={() =>
                                    this.handleYearMonthDayWeek('YEAR_MONTH_DAY_SECTION')
                                }
                            >
                                月日区间
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

    renderYearMonthDayWeekCycle = (yearMonthDayWeekChecked, echoDateParams) => {
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
            form: { getFieldDecorator, getFieldValue }
        } = this.props;
        const month_start = this.isNotFirstRender
            ? getFieldValue('month_start')
            : echoDateParams.startDate;
        const month_end = this.isNotFirstRender
            ? getFieldValue('month_end')
            : echoDateParams.endDate;
        const week_start = this.isNotFirstRender
            ? getFieldValue('week_start')
            : echoDateParams.startDate;
        const week_end = this.isNotFirstRender ? getFieldValue('week_end') : echoDateParams.endDate;
        const isChecked = yearMonthDayWeekChecked == 'YEAR_MONTH_DAY_WEEK_CYCLE';
        const isWeek = radioChecked === 'week' && isChecked && isCheckbox.includes('radio');
        const isMonth = radioChecked === 'month' && isChecked && isCheckbox.includes('radio');
        const disabled = !isCheckbox.includes('radio') || !isChecked;
        const diffAC = yearMonthA && yearMonthC && yearMonthA < yearMonthC;
        const yearAndMonthDisabled = !disabled && yearMonthCheckbox;
        return (
            <span className="year-month-day-week-cycle">
                <div className="year-month-day-week-checkbox">
                    <Checkbox.Group value={yearMonthCheckbox ? ['yearOrMonth'] : []}>
                        <Checkbox
                            className="year-month"
                            value="yearOrMonth"
                            disabled={disabled}
                            onChange={this.handleYearMonth}
                        >
                            年/月
                        </Checkbox>
                    </Checkbox.Group>
                    <Form.Item>
                        {getFieldDecorator('yearMonthA', {
                            initialValue: yearMonthA || '',
                            rules: [
                                {
                                    required:
                                        !disabled &&
                                        yearMonthCheckbox &&
                                        !yearMonthA &&
                                        yearMonthB &&
                                        !yearMonthD,
                                    message: '请填入'
                                }
                            ]
                        })(
                            <Select
                                disabled={!yearMonthCheckbox || disabled}
                                onDropdownVisibleChange={this.onDropdownChange}
                                dropdownClassName="drop-down-start-year"
                                onChange={val =>
                                    this.setValueAndRange(
                                        YEAR,
                                        val,
                                        'yearMonthA',
                                        'isYearMonthC',
                                        3
                                    )
                                }
                            >
                                {YEAR.map(item => (
                                    <Option
                                        disabled={
                                            !this.isNotFirstRender || yearMonthC
                                                ? Number(yearMonthC) <= item
                                                : this.dropdownRender(item, isYearMonthA)
                                        }
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
                                    required: yearAndMonthDisabled && !yearMonthB,
                                    message: '请填入'
                                },
                                {
                                    validator: yearAndMonthDisabled
                                        ? setValidatorStart(yearMonthA, yearMonthC, yearMonthD)
                                        : setCallback()
                                }
                            ]
                        })(
                            <Select
                                disabled={!yearMonthCheckbox || disabled}
                                onChange={val =>
                                    this.setValueAndRange(
                                        MONTH,
                                        val,
                                        'yearMonthB',
                                        'isYearMonthD',
                                        4
                                    )
                                }
                            >
                                {MONTH.map(item => (
                                    <Option
                                        disabled={
                                            !diffAC
                                                ? yearMonthD
                                                    ? Number(yearMonthD) <= item
                                                    : this.dropdownRender(item, isYearMonthB)
                                                : null
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
                                onDropdownVisibleChange={this.onDropdownChange}
                                dropdownClassName="drop-down-end-year"
                                onChange={val =>
                                    this.setValueAndRange(
                                        YEAR,
                                        val,
                                        'yearMonthC',
                                        'isYearMonthA',
                                        1
                                    )
                                }
                            >
                                {YEAR.map(item => (
                                    <Option
                                        disabled={
                                            !this.isNotFirstRender || yearMonthA
                                                ? Number(yearMonthA) > item
                                                : this.dropdownRender(item, isYearMonthC)
                                        }
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
                                },
                                {
                                    validator: yearAndMonthDisabled
                                        ? setValidatorEnd(yearMonthA, yearMonthB, yearMonthC)
                                        : setCallback()
                                }
                            ]
                        })(
                            <Select
                                disabled={!yearMonthCheckbox || disabled}
                                onChange={val =>
                                    this.setValueAndRange(
                                        MONTH,
                                        val,
                                        'yearMonthD',
                                        'isYearMonthB',
                                        2
                                    )
                                }
                            >
                                {MONTH.map(item => (
                                    <Option
                                        disabled={
                                            !diffAC
                                                ? yearMonthB
                                                    ? Number(yearMonthB) >= item
                                                    : this.dropdownRender(item, isYearMonthD)
                                                : null
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
                                    echoDateParams.switchDate === 'month'
                                        ? echoDateParams.startDate
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
                                    {DAY.map(item => (
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
                                    echoDateParams.switchDate === 'month'
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
                                    showSearch
                                    disabled={disabled || radioChecked !== 'month'}
                                    className="month-select"
                                >
                                    {DAY.map(item => (
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
                                    echoDateParams.switchDate === 'week'
                                        ? echoDateParams.startDate
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
                                    echoDateParams.switchDate === 'week'
                                        ? echoDateParams.endDate
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
                                this.setValueAndRange(MONTH, val, 'yearMonthJ', 'isYearMonthM', 3)
                            }
                        >
                            {MONTH.map(item => (
                                <Option
                                    disabled={
                                        !this.isNotFirstRender || yearMonthM
                                            ? Number(yearMonthM) <= item
                                            : this.dropdownRender(item, isYearMonthJ)
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
                <Form.Item>
                    {getFieldDecorator('yearMonthK', {
                        initialValue: yearMonthK || '',
                        rules: [
                            {
                                required: !disabled && !yearMonthK,
                                message: '请填入'
                            },
                            {
                                validator: !disabled
                                    ? setValidatorStart(yearMonthJ, yearMonthM, yearMonthN)
                                    : setCallback()
                            }
                        ]
                    })(
                        <Select
                            disabled={disabled}
                            onChange={val =>
                                this.setValueAndRange(DAY, val, 'yearMonthK', 'isYearMonthN', 4)
                            }
                        >
                            {DAY.map(item => (
                                <Option
                                    disabled={
                                        !diffJM
                                            ? yearMonthN
                                                ? Number(yearMonthN) <= item
                                                : this.dropdownRender(item, isYearMonthK)
                                            : null
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
                                this.setValueAndRange(MONTH, val, 'yearMonthM', 'isYearMonthJ', 1)
                            }
                        >
                            {MONTH.map(item => (
                                <Option
                                    disabled={
                                        !this.isNotFirstRender || yearMonthJ
                                            ? Number(yearMonthJ) > item
                                            : this.dropdownRender(item, isYearMonthM)
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
                            },
                            {
                                validator: !disabled
                                    ? setValidatorEnd(yearMonthJ, yearMonthK, yearMonthM)
                                    : setCallback()
                            }
                        ]
                    })(
                        <Select
                            disabled={disabled}
                            onChange={val =>
                                this.setValueAndRange(DAY, val, 'yearMonthN', 'isYearMonthK', 2)
                            }
                        >
                            {DAY.map(item => (
                                <Option
                                    disabled={
                                        !diffJM
                                            ? yearMonthK
                                                ? Number(yearMonthK) >= item
                                                : this.dropdownRender(item, isYearMonthN)
                                            : null
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

    onDropdownChange = open => {
        if (open) {
            const { yearMonthA, yearMonthC } = this.state;
            setTimeout(() => {
                let startDropDown = document.querySelector('.drop-down-start-year>div>ul');
                let endDropDown = document.querySelector('.drop-down-end-year>div>ul');
                if (startDropDown && !yearMonthA) {
                    startDropDown.scrollTop = 650;
                }
                if (endDropDown && !yearMonthC) {
                    endDropDown.scrollTop = 650;
                }
            }, 100);
        }
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
            this.props.form.setFieldsValue({
                week_start: null,
                week_end: null,
                month_start: null,
                month_end: null,
                yearMonthA: null,
                yearMonthB: null,
                yearMonthC: null,
                yearMonthD: null,
                yearMonthJ: null,
                yearMonthK: null,
                yearMonthM: null,
                yearMonthN: null
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

    getRange = (data, mode, val, min) => {
        let range = [];
        switch (mode) {
            case 1:
                range = data.slice(0, val - data[0]);
                break;
            case 2:
                range = data.slice(0, val - data[0] + 1);
                break;
            case 3:
                range = data.slice(val - data[0]);
                break;
            case 4:
                range = data.slice(val - data[0] + 1);
                break;
            default:
                break;
        }
        return range;
    };

    setValueAndRange = (range, val, key, rangeKey, mode) => {
        if (!val) return;
        const currentRange = this.getRange(range, mode, val);
        this.setState({
            [key]: val,
            [rangeKey]: currentRange
        });
    };

    dropdownRender = (item, range = []) => {
        if (range.length > 0) {
            let c = range.indexOf(item) == -1;
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
            switchDate: radioChecked || 'month'
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
