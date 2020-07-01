import React from 'react';
import { Form, Select } from 'antd';
import ToolIcon from 'src/components/ToolIcon';
const { Option } = Select;

const hour = [
    '00',
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23'
];
const addHour = [
    '00',
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
    '24'
];

const min = [
    '00',
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
    '24',
    '25',
    '26',
    '27',
    '28',
    '29',
    '30',
    '31',
    '32',
    '33',
    '34',
    '35',
    '36',
    '37',
    '38',
    '39',
    '40',
    '41',
    '42',
    '43',
    '44',
    '45',
    '46',
    '47',
    '48',
    '49',
    '50',
    '51',
    '52',
    '53',
    '54',
    '55',
    '56',
    '57',
    '58',
    '59'
];

class TimePicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            timeData: props.value
        };
    }

    render() {
        const { isCheckbox, index, form } = this.props;
        const { getFieldDecorator } = form;
        const { timeData } = this.state;
        const disabled = isCheckbox.indexOf('checkbox') === -1;
        const startHourRange = timeData.startMin > timeData.endMin;
        const equal = timeData.startHour === timeData.endHour;

        return (
            <Form layout="inline">
                <Form.Item>
                    {getFieldDecorator(`timeArr[${index}].startHour`, {
                        initialValue: timeData.startHour,
                        rules: [
                            {
                                required: isCheckbox.indexOf('checkbox') > -1,
                                message: '时为必填项'
                            }
                        ]
                    })(
                        <Select
                            showSearch
                            disabled={disabled}
                            onChange={this.handleStartHour}>
                            {hour.map((item, index) => (
                                <Option
                                    key={`${item}-${index}`}
                                    value={item}
                                    disabled={
                                        (timeData.endHour &&
                                            timeData.endHour < item) ||
                                        (startHourRange &&
                                            timeData.endHour <= item)
                                            ? true
                                            : false
                                    }>
                                    {item}
                                </Option>
                            ))}
                        </Select>
                    )}
                    <span className="time-risk">:</span>
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator(`timeArr[${index}].startMin`, {
                        initialValue: timeData.startMin,
                        rules: [
                            {
                                required: true,
                                message: '必填'
                            }
                        ]
                    })(
                        <Select
                            showSearch
                            disabled={disabled}
                            onChange={this.handleStartMin}>
                            {min.map((item, index) => (
                                <Option
                                    key={`${item}-${index}`}
                                    value={item}
                                    disabled={
                                        equal &&
                                        timeData.isEndMin &&
                                        timeData.isEndMin.indexOf(item) === -1
                                            ? true
                                            : false
                                    }>
                                    {item}
                                </Option>
                            ))}
                        </Select>
                    )}
                    <span className="gap">~</span>
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator(`timeArr[${index}].endHour`, {
                        initialValue: timeData.endHour,
                        rules: [
                            {
                                required: isCheckbox.indexOf('checkbox') > -1,
                                message: '时为必填项'
                            }
                        ]
                    })(
                        <Select
                            showSearch
                            disabled={disabled}
                            onChange={this.handleEndHour}>
                            {addHour.map((item, index) => (
                                <Option
                                    key={`${item}-${index}`}
                                    value={item}
                                    disabled={
                                        timeData.isHour.indexOf(item) > -1 ||
                                        this.handleSecondValues(
                                            addHour,
                                            timeData.startHour
                                        ).indexOf(item) > -1
                                            ? true
                                            : false
                                    }>
                                    {item}
                                </Option>
                            ))}
                        </Select>
                    )}
                    <span className="time-risk">:</span>
                </Form.Item>
                <Form.Item className="last-item">
                    {getFieldDecorator(`timeArr[${index}].endMin`, {
                        initialValue: timeData.endMin,
                        rules: [
                            {
                                required: true,
                                message: '必填'
                            }
                        ]
                    })(
                        <Select
                            showSearch
                            disabled={timeData.endHour == '24' || disabled}
                            onChange={this.handleEndMin}>
                            {min.map((item, index) => (
                                <Option
                                    key={`${item}-${index}`}
                                    value={item}
                                    disabled={
                                        equal &&
                                        (timeData.isMin.indexOf(item) > -1 ||
                                            this.handleSecondValues(
                                                min,
                                                timeData.startMin
                                            ).indexOf(item) > -1)
                                            ? true
                                            : false
                                    }>
                                    {item}
                                </Option>
                            ))}
                        </Select>
                    )}
                </Form.Item>
                {index > 0 ? (
                    <Form.Item>
                        <ToolIcon
                            icon="shanchu"
                            title="删除"
                            placement="right"
                            className="delete"
                            disabled={isCheckbox.indexOf('checkbox') === -1}
                            action={() => this.props.remove(index)}
                        />
                    </Form.Item>
                ) : null}
            </Form>
        );
    }

    handleSecondValues = (data, curVal) => {
        let ranges = [];
        data.map((item, index) => {
            if (item === curVal) {
                ranges = data.slice(0, index);
            }
        });
        return ranges;
    };

    handleStartHour = startHour => {
        const { timeChange, index } = this.props;
        hour.forEach((item, hourIndex) => {
            if (item === startHour) {
                const timeData = {
                    ...this.state.timeData,
                    startHour: startHour,
                    isHour: hour.slice(0, hourIndex)
                };
                this.setState({ timeData });
                timeChange(timeData, index);
            }
        });
    };

    handleStartMin = startMin => {
        const { timeChange, index } = this.props;
        min.forEach((item, minIndex) => {
            if (item === startMin) {
                const timeData = {
                    ...this.state.timeData,
                    startMin: startMin,
                    isMin: min.slice(0, minIndex + 1)
                };
                this.setState({ timeData });
                timeChange(timeData, index);
            }
        });
    };

    handleEndHour = endHour => {
        const { timeChange, index } = this.props;
        let timeData = {};
        if (endHour === '24') {
            timeData = {
                ...this.state.timeData,
                endHour: endHour,
                endMin: '00'
            };
        } else {
            timeData = {
                ...this.state.timeData,
                endHour: endHour
            };
        }
        this.setState({ timeData });
        timeChange(timeData, index);
    };

    handleEndMin = endMin => {
        const { timeChange, index } = this.props;
        min.forEach((item, minIndex) => {
            if (item === endMin) {
                const isEndMin = min.slice(0, minIndex);
                const timeData = {
                    ...this.state.timeData,
                    endMin: endMin,
                    isEndMin: isEndMin
                };
                this.setState({ timeData });
                timeChange(timeData, index);
            }
        });
    };
}

export default TimePicker;
