import React from 'react';
import { Input, message } from 'antd';
import { getValidator } from 'src/utils/form/validator';
import AdDatePicker from '../AdDatePicker';
import '../AdDatePicker/index.less';

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
        if (value && (value.indexOf('h') > -1 || value.indexOf('m') > -1)) {
            if (value.indexOf('WD') > -1) {
                const date = value.match(/\[(.+?)\]/g)[0];
                newChecked.push('radio');
                const endDate =
                    date.indexOf('{') !== -1 &&
                    date.match(/\{(.+?)\}/g)[0].match(/\d+/g) !== null
                        ? String(this.getNumber(date))
                        : '';
                newEchoDateParams = {
                    startDate: value.match(/\((.+?)\)/g)[0].match(/\d+/g)[0],
                    endDate: endDate,
                    switchDate: value.indexOf('WD') > -1 ? 'week' : 'month'
                };
            } else if (value && value.indexOf('D') > -1) {
                const date = value.match(/\[(.+?)\]/g)[0];
                newChecked.push('radio');
                const endDate =
                    date.indexOf('{') !== -1 &&
                    date.match(/\{(.+?)\}/g)[0].match(/\d+/g) !== null
                        ? this.getNumber(date)
                        : '';
                newEchoDateParams = {
                    startDate: date.match(/\((.+?)\)/g)[0].match(/\d+/g)[0],
                    endDate: endDate,
                    switchDate: date.indexOf('WD') > -1 ? 'week' : 'month'
                };
            }
            newChecked.push('checkbox');
            let newEchoTime = value.split('&');
            newEchoTime.map(item => {
                newEchoTimeArr.push({
                    startHour: this.matchTime(item)[0],
                    endHour: this.matchTime(item)[2],
                    startMin: this.matchTime(item)[1],
                    endMin: this.matchTime(item)[3],
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
            Number(item.match(/\((.+?)\)/g)[0].match(/\d+/g)[0])
        );
    };

    matchTime = item => {
        return item
            .match(/\[\(h\d{1,2}m\d{1,2}\)\{h\d{1,2}m\d{1,2}\}\]/)[0]
            .match(/\d+/g);
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
        const { timeArr, dateFormat } = option;
        let date = '',
            monthAndWeek;
        const format = dateFormat.startDate
            ? `(${
                  dateFormat.switchDate === 'week'
                      ? `WD${dateFormat.startDate}`
                      : `D${dateFormat.startDate}`
              })`
            : '';
        const endDate = dateFormat.endDate
            ? `{D${Number(dateFormat.endDate) - Number(dateFormat.startDate)}}`
            : '';
        monthAndWeek = format ? `[${format}${endDate}]` : '';
        let timeAndMin = '';
        timeArr.map((item, index) => {
            if (index !== timeArr.length - 1) {
                timeAndMin += `[(h${item.startHour || '00'}m${
                    item.startMin
                }){h${item.endHour || '00'}m${item.endMin}}]&`;
            } else {
                timeAndMin += `[(h${item.startHour || '00'}m${
                    item.startMin
                }){h${item.endHour || '00'}m${item.endMin}}]`;
            }
        });
        date = monthAndWeek + timeAndMin;
        this.setState({
            echoTimeArr: option.timeArr,
            echoDateParams: option.dateFormat,
            checked: option.isCheckbox
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
            <div onSubmit={this.props.onSubmit}>
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
