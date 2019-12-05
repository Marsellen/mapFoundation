import React from 'react';
import { Input } from 'antd';
import { dateFormatParams } from 'src/utils/form/dateFormat';
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
        return dateFormatParams(value);
    }

    handleKeyDown = e => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        this.props.onKeyDown && this.props.onKeyDown();
        return false;
    };

    handleDate = (option, visible) => {
        let data = this.onSubmit(option);
        this.props.onChange(data);
        let dataParams = dateFormatParams(data);

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
