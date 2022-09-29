class VisitedHistory {
    constructor(key) {
        this.key = key;
        this.pageName = 'page' + Date.now();
    }

    //获取访问历史
    getVisitedHistory = () => {
        const visiteHistory = window.localStorage.getItem(this.key);
        return visiteHistory ? JSON.parse(visiteHistory) : [];
    };

    //增加访问历史
    addVisitedHistory = () => {
        if (!this.pageName) return;
        const visiteHistory = this.getVisitedHistory();
        visiteHistory.push(this.pageName);
        window.localStorage.setItem(this.key, JSON.stringify(visiteHistory));
    };

    //减少访问历史
    removeVisitedHistory = () => {
        if (!this.pageName) return;
        const visiteHistory = this.getVisitedHistory();
        const newVisiteHistory = visiteHistory.filter(item => item !== this.pageName);
        window.localStorage.setItem(this.key, JSON.stringify(newVisiteHistory));
    };

    //清除访问历史
    clearVisitedHistory = () => {
        window.localStorage.removeItem(this.key);
    };

    //跳转到空白页
    LinkToBlank = () => {
        const visiteHistory = this.getVisitedHistory();
        if (visiteHistory.length > 1) {
            window.location.href = '/blank';
            return true;
        }
    };

    //跳转到宣传首页
    LinkToBoard = () => {
        const visiteHistory = this.getVisitedHistory();
        if (visiteHistory.length > 1) {
            window.location.href = '/board';
            return true;
        }
    };

    //轮询监听访问状态
    pollingVisiteHistory = () => {
        setInterval(
            (() => {
                if (!this.pageName) return;
                const visiteHistory = this.getVisitedHistory();
                if (visiteHistory.length === 0) return;
                const index = visiteHistory.includes(this.pageName);
                if (!index) {
                    window.location.href = '/blank';
                }
            }).bind(this),
            1000
        );
    };
}

export default VisitedHistory;
