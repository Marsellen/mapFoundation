import React from 'react';
import { Input } from 'antd';
import { timeSubtract, timeParse } from 'src/utils/timeUtils';
import AdDatePicker from '../AdDatePicker';
import '../AdDatePicker/index.less';
import moment from 'moment';

const params = {
    echoDateParams: {},
    echoTimeArr: [],
    checked: []
};

export default class AdInput extends React.Component {
    constructor(props) {
        super(props);
        let dataParams = this.getDataFromProps(props) || params;
        this.state = {
            visible: false,
            dataParams
        };
    }

    getDataFromProps(props) {
        const { value } = props;
        return this.checkParams(value);
    }
    checkParams = value => {
        let newChecked = [];
        let newEchoTimeArr = [];
        let newEchoDateParams = {};
        if (value && value.indexOf('WD') > -1) {
            const date = value.match(/\[(.+?)\]/g)[0];
            newChecked.push('radio');
            const endDate = String(this.getNumber(date));
            newEchoDateParams = {
                startDate: value.match(/\((.+?)\)/g)[0].match(/\d+/g)[0],
                endDate: endDate,
                switchDate: value.indexOf('WD') > -1 ? 'week' : 'month'
            };
        } else if (value && value.indexOf('D') > -1) {
            const date = value.match(/\[(.+?)\]/g)[0];
            newChecked.push('radio');
            const endDate = this.getNumber(date);
            newEchoDateParams = {
                startDate: date.match(/\((.+?)\)/g)[0].match(/\d+/g)[0],
                endDate: endDate,
                switchDate: date.indexOf('WD') > -1 ? 'week' : 'month'
            };
        }
        if (value && (value.indexOf('h') > -1 || value.indexOf('m') > -1)) {
            newChecked.push('checkbox');
            let newEchoTime = value.split('&');
            newEchoTime.map(item => {
                newEchoTimeArr.push({
                    ...timeParse(item),
                    isHour: [],
                    isMin: [],
                    isEndMin: []
                });
            });
        }
        return {
            echoDateParams: newEchoDateParams,
            checked: newChecked,
            echoTimeArr: newEchoTimeArr
        };
    };

    getNumber = item => {
        return (
            Number(item.match(/\{(.+?)\}/g)[0].match(/\d+/g)[0]) +
            Number(item.match(/\((.+?)\)/g)[0].match(/\d+/g)[0]) -
            1
        );
    };

    handleKeyDown = e => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        this.props.onKeyDown && this.props.onKeyDown();
        return false;
    };

    handleDate = (option, visible) => {
        let data = this.onSubmit(option);
        this.props.onChange(data);
        let dataParams = this.checkParams(data);

        this.setState({
            visible,
            dataParams
        });
    };

    onSubmit = option => {
        const { timeArr, dateFormat, isCheckbox } = option;
        let date = '',
            monthAndWeek = '',
            timeAndMin = '';
        if (isCheckbox.includes('radio')) {
            //TODO 日期勾选
            const format = dateFormat.startDate
                ? `(${
                      dateFormat.switchDate === 'week'
                          ? `WD${dateFormat.startDate}`
                          : `D${dateFormat.startDate}`
                  })`
                : '';
            let dataDiff = dateFormat.endDate
                ? Number(dateFormat.endDate) - Number(dateFormat.startDate) + 1
                : 1;
            const endDate = `{D${dataDiff}}`;
            monthAndWeek = format ? `[${format}${endDate}]` : '';
        }

        if (isCheckbox.includes('checkbox')) {
            //TODO 时间勾选
            let timeDiffs = timeArr.map(t => {
                let startTime = moment(`${t.startHour}:${t.startMin}`, 'HH:mm');
                let endTime = moment(`${t.endHour}:${t.endMin}`, 'HH:mm');
                let duration = timeSubtract(startTime, endTime);
                let hDiff = `h${duration.get('hours')}`;
                let mDiff = duration.get('minutes')
                    ? `m${duration.get('minutes')}`
                    : '';
                let timeDiff = hDiff + mDiff;
                let startHour = startTime.get('hours');
                let startMin = startTime.get('minutes');
                return `[(h${startHour}m${startMin}){${timeDiff}}]`;
            });
            timeAndMin = timeDiffs.join('&');
        }
        date = monthAndWeek + timeAndMin;

        this.setState({
            echoTimeArr: timeArr,
            echoDateParams: dateFormat,
            checked: isCheckbox
        });
        return date;
    };

    handleAfter = () => {
        this.setState({
            visible: true,
            key: Math.random()
        });
    };
    handleCancel = visible => {
        this.setState({
            visible
        });
    };
    render() {
        return (
            <div>
                <Input
                    {...this.props}
                    onKeyDown={e => this.handleKeyDown(e)}
                    addonAfter={
                        <span
                            className="addon-after"
                            onClick={this.handleAfter}>
                            ...
                        </span>
                    }
                />
                <AdDatePicker
                    key={this.state.key}
                    visible={this.state.visible}
                    dataParams={this.state.dataParams}
                    handleDate={this.handleDate}
                    handleCancel={this.handleCancel}
                />
            </div>
        );
    }
}
