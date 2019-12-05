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
    let endHour = completeTime(endTime.get('hours'));
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
    const pattern = /^(\[\((W)?D\d{1,2}\)\{D\d{1,2}\}\])?(\[\(h\d{1,2}m\d{1,2}\)\{h\d{1,2}(m\d{1,2})?\}\]&)*(\[\(h\d{1,2}m\d{1,2}\)\{h\d{1,2}(m\d{1,2})?\}\])?$/;
    return pattern.test(dataString);
};
