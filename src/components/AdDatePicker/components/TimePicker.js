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

@Form.create()
class TimePicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            timeData: props.value
        };
    }

    render() {
        const { isCheckbox, value, index } = this.props;
        const { getFieldDecorator } = this.props.form;
        const { timeData } = this.state;
        const disabled = isCheckbox.indexOf('checkbox') === -1;

        return (
            <Form layout="inline">
                <Form.Item>
                    {getFieldDecorator(`start-hour-${index}`, {
                        initialValue: value.startHour,
                        rules: [
                            {
                                required: true,
                                message: '必填'
                            }
                        ]
                    })(
                        <Select
                            className={`start-hour-${index}`}
                            disabled={disabled}
                            onChange={this.handleStartHour}
                            // value={value.startHour}
                        >
                            {hour.map((item, index) => (
                                <Option key={`${item}-${index}`} value={item}>
                                    {item}
                                </Option>
                            ))}
                        </Select>
                    )}
                    <span className="time-risk">:</span>
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator(`start-min-${index}`, {
                        initialValue: value.startMin,
                        rules: [
                            {
                                required: true,
                                message: '必填'
                            }
                        ]
                    })(
                        <Select
                            disabled={disabled}
                            onChange={this.handleStartMin}
                            // value={value.startMin}
                        >
                            {min.map((item, index) => (
                                <Option key={`${item}-${index}`} value={item}>
                                    {item}
                                </Option>
                            ))}
                        </Select>
                    )}
                    <span className="gap">~</span>
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator(`end-hour-${index}`, {
                        initialValue: value.endHour,
                        rules: [
                            {
                                required: true,
                                message: '必填'
                            }
                        ]
                    })(
                        <Select
                            className={`end-hour-${index}`}
                            disabled={disabled}
                            onChange={this.handleEndHour}
                            // value={value.endHour}
                        >
                            {addHour.map((item, index) => (
                                <Option
                                    key={`${item}-${index}`}
                                    value={item}
                                    disabled={
                                        timeData.isHour.indexOf(item) > -1
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
                    {getFieldDecorator(`end-min-${index}`, {
                        initialValue: value.endMin,
                        rules: [
                            {
                                required: true,
                                message: '必填'
                            }
                        ]
                    })(
                        <Select
                            disabled={disabled || timeData.endHour === '24'}
                            onChange={this.handleEndMin}
                            // value={value.endMin}
                        >
                            {min.map((item, index) => (
                                <Option
                                    key={`${item}-${index}`}
                                    value={item}
                                    disabled={
                                        timeData.isMin.indexOf(item) > -1
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
                            className="delete"
                            icon="shanchu"
                            title="删除"
                            disabled={isCheckbox.indexOf('checkbox') === -1}
                            action={() => this.props.remove(index)}
                        />
                    </Form.Item>
                ) : null}
            </Form>
        );
    }

    handleStartHour = startHour => {
        const { timeChange, index } = this.props;
        hour.forEach((item, hourIndex) => {
            if (item === startHour) {
                const newTimeData = {
                    ...this.state.timeData,
                    startHour: startHour,
                    isHour: hour.slice(0, hourIndex + 1)
                };
                this.setState({
                    timeData: newTimeData
                });
                timeChange(newTimeData, index);
            }
        });
    };

    handleStartMin = startMin => {
        const { timeChange, index } = this.props;
        min.forEach((item, minIndex) => {
            if (item === startMin) {
                const newTimeData = {
                    ...this.state.timeData,
                    startMin: startMin,
                    isMin: min.slice(0, minIndex + 1)
                };
                this.setState({
                    timeData: newTimeData
                });
                timeChange(newTimeData, index);
            }
        });
    };

    handleEndHour = endHour => {
        const { timeChange, index } = this.props;
        let newTimeData = {};
        if (endHour === '24') {
            newTimeData = {
                ...this.state.timeData,
                endHour: endHour,
                endMin: '00'
            };
        } else {
            newTimeData = {
                ...this.state.timeData,
                endHour: endHour
            };
        }
        this.setState({
            timeData: newTimeData
        });
        timeChange(newTimeData, index);
    };

    handleEndMin = endMin => {
        const { timeChange, index } = this.props;
        const newTimeData = {
            ...this.state.timeData,
            endMin: endMin
        };
        this.setState({
            timeData: newTimeData
        });
        timeChange(newTimeData, index);
    };
}

export default TimePicker;
