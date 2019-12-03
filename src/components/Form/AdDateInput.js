import React from 'react';
import { Input } from 'antd';
import AdDatePicker from '../AdDatePicker';
import '../AdDatePicker/index.less';

export default class AdInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            echoStartDate: '',
            echoEndDate: '',
            echoDateParams: {},
            echoTimeArr: [],
            key: '1'
        };
    }
    handleKeyDown = e => {
        e.stopPropagation();
        this.props.onKeyDown && this.props.onKeyDown();
        return false;
    };

    handleDate = (timeArr, dateFormat, visible) => {
        this.props.onSubmit(timeArr, dateFormat);
        this.setState({
            visible,
            timeArr: timeArr,
            dateFormat: dateFormat
        });
    };

    handleAfter = () => {
        const { option } = this.props;
        let newChecked = [];
        let newEchoTimeArr = [];

        if (option && option.indexOf('WD') > -1) {
            newChecked.push('radio');
            const echoEndDate = String(
                Number(option.match(/\{(.+?)\}/g)[0].match(/\d+/g)[0]) +
                    Number(option.match(/\((.+?)\)/g)[0].match(/\d+/g)[0])
            );
            const newEchoDateParams = {
                ...this.state.echoDateParams,
                echoStartDate: option.match(/\((.+?)\)/g)[0].match(/\d+/g)[0],
                echoEndDate: echoEndDate,
                switchDate: option.indexOf('WD') > -1 ? 'week' : 'month'
            };
            this.setState({
                echoDateParams: newEchoDateParams,
                checked: newChecked
            });
        } else if (option && option.indexOf('D') > -1) {
            newChecked.push('radio');
            const echoEndDate = String(
                Number(option.match(/\{(.+?)\}/g)[0].match(/\d+/g)[0]) +
                    Number(option.match(/\((.+?)\)/g)[0].match(/\d+/g)[0])
            );
            const newEchoDateParams = {
                ...this.state.echoDateParams,
                echoStartDate: option.match(/\((.+?)\)/g)[0].match(/\d+/g)[0],
                echoEndDate: echoEndDate,
                switchDate: option.indexOf('WD') > -1 ? 'week' : 'month'
            };
            this.setState({
                echoDateParams: newEchoDateParams,
                checked: newChecked
            });
        }
        if (option && (option.indexOf('h') > -1 || option.indexOf('m') > -1)) {
            newChecked.push('checkbox');
            let newEchoTime = option.split('&');
            newEchoTime.map((item, index) => {
                newEchoTimeArr.push({
                    startHour: item
                        .match(
                            /\[\(h\d{1,2}m\d{1,2}\)\{h\d{1,2}m\d{1,2}\}\]/
                        )[0]
                        .match(/\d+/g)[0],
                    endHour: item
                        .match(
                            /\[\(h\d{1,2}m\d{1,2}\)\{h\d{1,2}m\d{1,2}\}\]/
                        )[0]
                        .match(/\d+/g)[2],
                    startMin: item
                        .match(
                            /\[\(h\d{1,2}m\d{1,2}\)\{h\d{1,2}m\d{1,2}\}\]/
                        )[0]
                        .match(/\d+/g)[1],
                    endMin: item
                        .match(
                            /\[\(h\d{1,2}m\d{1,2}\)\{h\d{1,2}m\d{1,2}\}\]/
                        )[0]
                        .match(/\d+/g)[3],
                    isHour: [],
                    isMin: []
                });
            });
            this.setState({
                echoTimeArr: newEchoTimeArr,
                checked: newChecked
            });
        }

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
                    echoDateParams={this.state.echoDateParams}
                    echoTimeArr={this.state.echoTimeArr}
                    checked={this.state.checked}
                    handleDate={this.handleDate}
                    handleCancel={this.handleCancel}
                />
            </div>
        );
    }
}
