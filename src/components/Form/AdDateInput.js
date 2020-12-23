import React from 'react';
import { Input } from 'antd';
import {
    timeSubtract,
    timeParse,
    weekOrMonth,
    yearMonthCycleOrSection,
    handleYearAndMonth
} from 'src/utils/timeUtils';
import AttributeStore from 'src/pages/Index/store/AttributeStore';
import AdDatePicker from '../AdDatePicker';
import '../AdDatePicker/index.less';
import moment from 'moment';

const params = {
    echoDateParams: { switchDate: 'month' },
    echoTimeArr: [],
    checked: [],
    echoYearMonthParams: {},
    echoMonthDaySectionParams: {},
    yearMonthCheckbox: false,
    yearMonthDayWeekChecked: 'YEAR_MONTH_DAY_WEEK_CYCLE'
};

export default class AdDateInput extends React.Component {
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
    /**
     * 回显时若勾选了年月日周，
     * 则第一个中括号有以下几种情况：
     * 1、勾选了年月中的年和月，
     * 2、只勾选了年月中的月，
     * 3、没有勾选年月勾选了日月或日周中的一种，
     * 4、勾选了月日区间
     * 若未勾选年月日周，则第一个中括号只有时分
     */
    checkParams = value => {
        let newEchoTimeArr = [],
            newEchoDateParams = {},
            newEchoYearMonthParams = {},
            newEchoMonthDaySectionParams = {},
            isCheckbox = [],
            yearMonthCheckbox = false,
            yearMonthDayWeekChecked = 'YEAR_MONTH_DAY_WEEK_CYCLE';
        const match = value && value.match(/\[(.+?)\]/g);
        if (typeof match != 'object') return;
        if (match[0].indexOf('Y') > -1 && match[0].indexOf('M') > -1) {
            //勾选了年月中的年和月
            yearMonthCheckbox = true;
            newEchoYearMonthParams = yearMonthCycleOrSection(value, 'YEAR_MONTH_DAY_WEEK_CYCLE');
        } else if (match[0].indexOf('M') > -1 && match[0].indexOf('D') == -1) {
            //只勾选了年月中的月
            //只有月份的情况
            yearMonthCheckbox = true;
            let field = value.match(/\[(.+?)\]/g)[0].match(/\d+/g);
            newEchoYearMonthParams = {
                yearMonthB: field[0], //B
                yearMonthD: field[1] - 1 //D
            };
        }
        if (value.indexOf('D') > -1 || value.indexOf('WD') > -1) {
            //日月、日周
            isCheckbox.push('radio');
            yearMonthDayWeekChecked = 'YEAR_MONTH_DAY_WEEK_CYCLE';
            newEchoDateParams = weekOrMonth(value);
        }
        if (match[0].indexOf('M') > -1 && match[0].indexOf('D') > -1) {
            isCheckbox.push('radio');
            yearMonthDayWeekChecked = 'YEAR_MONTH_DAY_SECTION';
            newEchoMonthDaySectionParams = yearMonthCycleOrSection(value, 'YEAR_MONTH_DAY_SECTION');
        }
        // 时分
        if (value && (value.indexOf('h') > -1 || value.indexOf('m') > -1)) {
            isCheckbox.push('checkbox');
            const HM = value.match(/\[(.+?)\]/g);
            let newEchoTime = HM.filter(h => {
                return h.indexOf('h') > -1;
            });
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
            echoDateParams: newEchoDateParams || { switchDate: 'month' },
            checked: isCheckbox,
            echoTimeArr: newEchoTimeArr,
            echoYearMonthParams: newEchoYearMonthParams,
            echoMonthDaySectionParams: newEchoMonthDaySectionParams,
            yearMonthCheckbox,
            yearMonthDayWeekChecked
        };
    };

    handleKeyDown = e => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        this.props.onKeyDown && this.props.onKeyDown();
        return false;
    };

    handleDate = (option, visible) => {
        let date = this.onSubmit(option);
        this.props.onChange(date);
        let dataParams = this.checkParams(date);

        this.setState({
            visible,
            dataParams
        });
    };

    onSubmit = option => {
        const {
            timeArr,
            dateFormat,
            isCheckbox,
            yearMonthCheckbox,
            yearMonthDayWeekChecked,
            radioChecked
        } = option;
        let date = '',
            yearAndMonth = '', //年月
            monthAndWeek = '',
            timeAndMin = '',
            monthAndDay = ''; //月日区间
        if (yearMonthDayWeekChecked == 'YEAR_MONTH_DAY_WEEK_CYCLE') {
            //年月日周循环
            if (yearMonthCheckbox) {
                //年月
                let yearMonthA = dateFormat.yearMonthCycle.yearMonthA || null;
                let yearMonthB = dateFormat.yearMonthCycle.yearMonthB || null;
                let yearMonthC = dateFormat.yearMonthCycle.yearMonthC || null;
                let yearMonthD = dateFormat.yearMonthCycle.yearMonthD || null;
                // 第一种情况ABCD都不为空
                if (yearMonthA && yearMonthB && yearMonthC && yearMonthD) {
                    yearAndMonth = handleYearAndMonth(
                        'YEAR_MONTH_DAY_WEEK_CYCLE',
                        yearMonthA,
                        yearMonthB,
                        yearMonthC,
                        yearMonthD
                    );
                } else if (!yearMonthC && !yearMonthD) {
                    // 第二种情况CD为空，AB不为空
                    yearAndMonth = `[(Y${yearMonthA}M${yearMonthB}){M1}]`;
                } else if (!yearMonthA && !yearMonthC) {
                    // 第三种情况AC为空，BD不为空
                    yearAndMonth = `[(M${yearMonthB}){M${yearMonthD + 1}}]`;
                }
            }
            if (radioChecked == 'month' || radioChecked == 'week') {
                //TODO 日期勾选
                const format = dateFormat.startDate
                    ? `(${
                          dateFormat.switchDate === 'month'
                              ? `D${dateFormat.startDate}`
                              : `WD${dateFormat.startDate}`
                      })`
                    : '';
                let dataDiff = dateFormat.endDate
                    ? Number(dateFormat.endDate) - Number(dateFormat.startDate) + 1
                    : 1;
                const endDate = `{D${dataDiff}}`;
                monthAndWeek = format ? `[${format}${endDate}]` : '';
            }
        } else if (yearMonthDayWeekChecked == 'YEAR_MONTH_DAY_SECTION') {
            //月日区间
            let yearMonthJ = dateFormat.yearMonthDaySection.yearMonthJ || null;
            let yearMonthK = dateFormat.yearMonthDaySection.yearMonthK || null;
            let yearMonthM = dateFormat.yearMonthDaySection.yearMonthM || null;
            let yearMonthN = dateFormat.yearMonthDaySection.yearMonthN || null;
            // 第一种情况JKMN皆不为空
            if (yearMonthJ && yearMonthK && yearMonthM && yearMonthN) {
                monthAndDay = handleYearAndMonth(
                    'YEAR_MONTH_DAY_SECTION',
                    yearMonthJ,
                    yearMonthK,
                    yearMonthM,
                    yearMonthN
                );
            } else {
                //第二种情况MN为空，JK不为空
                monthAndDay = `[(M${yearMonthJ}D${yearMonthK}){D1}]`;
            }
        }
        // 时分
        if (isCheckbox.includes('checkbox')) {
            //TODO 时间勾选
            let timeDiffs = timeArr.map(t => {
                if (t.startHour == '00' && t.startMin == '00' && t.endHour == '24') {
                    return '[(h0m0){h24}]';
                }
                let startTime = moment(`${t.startHour}:${t.startMin}`, 'HH:mm');
                let endTime = moment(`${t.endHour}:${t.endMin}`, 'HH:mm');
                let duration = timeSubtract(startTime, endTime);
                let hDiff = `h${duration.get('hours')}`;
                let mDiff = duration.get('minutes') ? `m${duration.get('minutes')}` : '';
                let timeDiff = hDiff + mDiff;
                let startHour = startTime.get('hours');
                let startMin = startTime.get('minutes');
                return `[(h${startHour}m${startMin}){${timeDiff}}]`;
            });
            timeAndMin = timeDiffs.join('&');
        }

        date =
            yearMonthDayWeekChecked == 'YEAR_MONTH_DAY_SECTION'
                ? monthAndDay + timeAndMin
                : yearAndMonth + monthAndWeek + timeAndMin;

        this.setState({
            echoTimeArr: timeArr,
            echoDateParams: dateFormat || { switchDate: 'month' },
            checked: isCheckbox,
            yearMonthCheckbox,
            yearMonthDayWeekChecked
        });
        return date;
    };

    handleAfter = () => {
        const { disabled, value } = this.props;
        if (disabled || !AttributeStore.timeVisible) return;
        let dataParams = this.checkParams(value) || params;
        this.setState({
            visible: true,
            key: Math.random(),
            dataParams
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
                        <span className="addon-after" onClick={this.handleAfter}>
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
