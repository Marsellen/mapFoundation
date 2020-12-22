import moment from 'moment';

window.moment = moment;

export const matchTime = timeString => {
    let timePattern = /\[\(h\d{1,2}m\d{1,2}\)\{h\d{1,2}(m\d{1,2})?\}\]/;
    return timeString.match(timePattern)[0].match(/\d+/g);
};

export const timeParse = timeString => {
    let timeArr = matchTime(timeString);
    let startHour = completeTime(timeArr[0]);
    let startMin = completeTime(timeArr[1]);
    let startTime = moment(`${startHour}:${startMin}`, 'HH:mm');
    let hourDiff = Number(timeArr[2] || 0);
    let minDiff = Number(timeArr[3] || 0);
    let endTime = startTime.add({ hours: hourDiff, minutes: minDiff });
    let endHour;
    if (
        Number(startHour) + hourDiff === 24 ||
        (Number(startHour) + hourDiff === 23 && Number(startMin) + minDiff === 60)
    ) {
        //第一个时间和第二个时间相加等于24或者第一个时间和第二个时间相加等于23且第一个分钟与第二个分钟相加等于60分时
        endHour = 24;
    } else {
        endHour = completeTime(endTime.get('hours'));
    }
    // let endHour = completeTime(endTime.get('hours'));
    let endMin = completeTime(endTime.get('minutes'));
    return { startHour, startMin, endHour, endMin };
};

const completeTime = time => {
    let timeString = String(time);
    if (timeString) {
        if (timeString.length === 2) {
            return timeString;
        } else {
            return '0' + timeString;
        }
    } else {
        return '00';
    }
};

export const timeSubtract = (startTime, endTime) => {
    const timeDiff = endTime.diff(startTime, 'minute');
    return moment.duration(timeDiff, 'minutes');
};

export const testDataString = dataString => {
    const pattern = /(((\[\(\Y\d{4}\M\d{1,2}\)\{\M\d{1,2}\}(\&\(\Y\d{4}\)\{\Y\d{1,2}\})?(\&\(\Y\d{4}\M\d{1,2}\)\{\M\d{1,2}\})?(\]))?(\[\((W)?\D\d{1,2}\)\{\D\d{1,2}\})\]))?(\[\(h\d{1,2}m\d{1,2}\)\{h\d{1,2}(m\d{1,2})?\}\]&)*(\[\(h\d{1,2}m\d{1,2}\)\{h\d{1,2}(m\d{1,2})?\}\])?$/;
    // const pattern = /^(\[\((W)?D\d{1,2}\)\{D\d{1,2}\}\])?(\[\(h\d{1,2}m\d{1,2}\)\{h\d{1,2}(m\d{1,2})?\}\]&)*(\[\(h\d{1,2}m\d{1,2}\)\{h\d{1,2}(m\d{1,2})?\}\])?$/;
    return pattern.test(dataString);
};

export const weekOrMonth = value => {
    //日月、日周
    const match = value.match(/\[(.+?)\]/g)[0].indexOf('M') > -1;
    const date = value.match(/\[(.+?)\]/g)[match ? 1 : 0];
    const checked = date.indexOf('WD') > -1;
    let dateDiff = date.match(/\{(.+?)\}/g)[0].match(/\d+/g)[0];
    const strOrNum = checked ? String(getNumber(date)) : getNumber(date);
    const matchDate = date.match(/\((.+?)\)/g)[0].match(/\d+/g)[0];
    const endDate = dateDiff === '1' ? null : strOrNum;
    const newEchoDateParams = {
        startDate: checked ? matchDate : Number(matchDate),
        endDate: endDate,
        switchDate: checked ? 'week' : 'month'
    };
    return newEchoDateParams;
};

const getNumber = item => {
    return (
        Number(item.match(/\{(.+?)\}/g)[0].match(/\d+/g)[0]) +
        Number(item.match(/\((.+?)\)/g)[0].match(/\d+/g)[0]) -
        1
    );
};

export const yearMonthCycleOrSection = (value, checked) => {
    //年月、月日区间回显
    let newEchoParams = {};
    const C = checked == 'YEAR_MONTH_DAY_WEEK_CYCLE';
    let field = value.match(/\[(.+?)\]/g)[0].split('&');
    let fieldArr = field[0].match(/\d+/g);
    if (field.length == 1 && fieldArr[2] == '1') {
        //CD为空，AB不为空
        newEchoParams = {
            [C ? 'yearMonthA' : 'yearMonthJ']: fieldArr[0], //A
            [C ? 'yearMonthB' : 'yearMonthK']: fieldArr[1], //B
            [C ? 'yearMonthC' : 'yearMonthM']: null, //C
            [C ? 'yearMonthD' : 'yearMonthN']: null //D
        };
    } else if (field.length == 1 && fieldArr[2] != '1') {
        //A=C
        newEchoParams = {
            [C ? 'yearMonthA' : 'yearMonthJ']: fieldArr[0], //A
            [C ? 'yearMonthB' : 'yearMonthK']: fieldArr[1], //B
            [C ? 'yearMonthC' : 'yearMonthM']: fieldArr[0], //C
            [C ? 'yearMonthD' : 'yearMonthN']: Number(fieldArr[1]) + Number(fieldArr[2]) - 1 //D
        };
    } else if (field.length > 1) {
        let beforeFieldArr = field[0].match(/\d+/g);
        let afterFieldArr = field[field.length - 1].match(/\d+/g);
        newEchoParams = {
            [C ? 'yearMonthA' : 'yearMonthJ']: beforeFieldArr[0], //A
            [C ? 'yearMonthB' : 'yearMonthK']: beforeFieldArr[1], //B
            [C ? 'yearMonthC' : 'yearMonthM']: afterFieldArr[0], //C
            [C ? 'yearMonthD' : 'yearMonthN']: afterFieldArr[2] //D
        };
    }
    return newEchoParams;
};

export const handleYearAndMonth = (checked, one, two, three, four) => {
    const C = checked == 'YEAR_MONTH_DAY_WEEK_CYCLE';
    const FristC = C ? 'Y' : 'M';
    const LastC = C ? 'M' : 'D';
    let date;
    if (one == three) {
        date = `[(${FristC}${one}${LastC}${two}){${LastC}${four - two + 1}}]`;
    } else {
        let midSymbol = three - one > 1;
        let Front = `(${FristC}${one}${LastC}${two}){${LastC}${C ? 13 - Number(two) : 30}}`; //qufen
        let After = `&(${FristC}${three}${LastC}1){${LastC}${four}}`;
        date = `[${Front}${
            midSymbol
                ? `&(${FristC}${Number(one) + 1}){${FristC}${Number(three) - (Number(one) + 1)}}`
                : ''
        }${After}]`;
    }
    return date;
};

export const getData = (min, max) => {
    let data = [];
    for (let i = min; i <= max; i++) {
        data.push(i);
    }
    return data;
};
