import { getAuthentication } from 'src/utils/Session';

class AdLocalStorage {
    constructor() {
        const { username } = getAuthentication();
        this.username = username;
        this.currentTaskScale = null;
        this.currentTaskBoundaryIsUpdate = false;
    }

    setLocalStorage = (key, value) => {
        if (typeof value === 'object') {
            value = JSON.stringify(value);
        }
        localStorage.setItem(key, value);
    };

    getLocalStorage = (key, isToJsonObj) => {
        const value = localStorage.getItem(key);
        if (isToJsonObj) {
            return JSON.parse(value);
        } else {
            return value;
        }
    };

    removeLocalStorage = key => {
        localStorage.removeItem(key);
    };

    // 参数说明 currentTaskInfo {taskId:123,taskScale:{},taskBoundaryIsUpdate:true,checkReport:{}}
    setTaskInfosStorage = currentTaskInfo => {
        if (!this.username) return;
        const { taskId } = currentTaskInfo;
        const taskInfos = this.getLocalStorage('taskInfos', true) || {};
        taskInfos[this.username] = taskInfos[this.username] || {};
        taskInfos[this.username][taskId] = Object.assign(
            {},
            taskInfos[this.username][taskId],
            currentTaskInfo
        );
        this.setLocalStorage('taskInfos', taskInfos);
    };

    getTaskInfosStorage = taskId => {
        if (!this.username) return;
        const taskInfos = this.getLocalStorage('taskInfos', true) || null;
        if (
            taskInfos &&
            taskInfos[this.username] &&
            taskInfos[this.username][taskId]
        ) {
            return taskInfos[this.username][taskId];
        } else {
            return false;
        }
    };

    filterTaskInfosStorage = taskIdArr => {
        if (!this.username) return;
        const taskInfos = this.getLocalStorage('taskInfos', true) || null;
        if (taskInfos) {
            if (!taskIdArr || taskIdArr.length === 0) {
                delete taskInfos[this.username];
            } else {
                Object.keys(taskInfos[this.username] || {}).forEach(item => {
                    if (!taskIdArr.includes(Number(item))) {
                        delete taskInfos[this.username][item];
                    }
                });
            }
            if (Object.keys(taskInfos).length === 0) {
                this.removeLocalStorage('taskInfos');
            } else {
                this.setLocalStorage('taskInfos', taskInfos);
            }
        }
    };
}

export default new AdLocalStorage();
