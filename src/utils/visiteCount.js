//增加访问次数
export const addVisitedCount = () => {
    const visiteCount = window.localStorage.getItem('visiteCount');
    const visiteCountNum = visiteCount ? Number(visiteCount) : 0;
    const nextVisitedCountNum = visiteCountNum + 1;
    window.localStorage.setItem('visiteCount', nextVisitedCountNum);
    return nextVisitedCountNum;
};

//减少访问次数
export const removeVisitedCount = () => {
    const visiteCount = window.localStorage.getItem('visiteCount');
    const visiteCountNum = visiteCount ? Number(visiteCount) : 0;
    if (visiteCountNum === 0) return;
    window.localStorage.setItem('visiteCount', visiteCountNum - 1);
};
