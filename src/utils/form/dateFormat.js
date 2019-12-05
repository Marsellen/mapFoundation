export const dateFormatParams = (value, isCheck) => {
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
                    ? String(getNumber(date))
                    : '';
            newEchoDateParams = {
                startDate: value.match(/\((.+?)\)/g)[0].match(/\d+/g)[0],
                endDate: endDate,
                switchDate: value.indexOf('WD') > -1 ? 'week' : 'month'
            };
        } else if (value.indexOf('D') > -1) {
            const date = value.match(/\[(.+?)\]/g)[0];
            newChecked.push('radio');
            const endDate =
                date.indexOf('{') !== -1 &&
                date.match(/\{(.+?)\}/g)[0].match(/\d+/g) !== null
                    ? getNumber(date)
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
                startHour: matchTime(item)[0],
                endHour: matchTime(item)[2],
                startMin: matchTime(item)[1],
                endMin: matchTime(item)[3],
                isHour: [],
                isMin: [],
                isEndMin: []
            });
        });
    } else {
        if (isCheck) throw '时间域格式错误';
    }
    return {
        echoDateParams: newEchoDateParams,
        checked: newChecked,
        echoTimeArr: newEchoTimeArr
    };
};

const getNumber = item => {
    return (
        Number(item.match(/\{(.+?)\}/g)[0].match(/\d+/g)[0]) +
        Number(item.match(/\((.+?)\)/g)[0].match(/\d+/g)[0])
    );
};

const matchTime = item => {
    return item
        .match(/\[\(h\d{1,2}m\d{1,2}\)\{h\d{1,2}m\d{1,2}\}\]/)[0]
        .match(/\d+/g);
};
