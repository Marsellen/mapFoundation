import { observable, flow, configure, action } from 'mobx';
import TaskService from '../service/TaskService';

configure({ enforceActions: 'always' });
class TaskStore {
    @observable tasks = [];
    @observable activeTaskId;

    init = flow(function*() {
        try {
            const tasks = yield TaskService.get();
            this.tasks = tasks;
            this.setActiveTaskId();
        } catch (e) {
            console.log(e);
        }
    });

    load = flow(function*(option, callback, errorCallback) {
        try {
            if (this.tasks.map(task => task._id).includes(option.url)) {
                errorCallback();
                return;
            }
            this.tasks.push({
                _id: option.url,
                name: option.name
            });

            this.setActiveTaskId(option.url);
            callback();
        } catch (e) {
            console.log(e);
        }
    });

    setActiveTaskId = flow(function*(id) {
        this.activeTaskId = id;
        // TODO 缓存activeTaskId，取id优先级： id > 缓存id > this.tasks[0].id
    });

    @action getActiveTask = () => {
        return this.tasks.find(task => task._id == this.activeTaskId);
    };

    getTaskFile = flow(function*(callback) {
        try {
            if (!this.activeTaskId) {
                return;
            }
            //const task = yield TaskService.get({ id: this.activeTaskId });
            let task = {
                point_clouds: this.activeTaskId + '/point_clouds/cloud.js',
                vectors: this.activeTaskId + '/vectors/ads_all.geojson',
                tracks: this.activeTaskId + '/tracks/tracks.json'
            };
            callback(task);
        } catch (e) {
            console.log(e);
        }
    });

    submit = flow(function*(data, callback) {
        try {
            let patt1 = /(\w+):\/\/([^/:]+)(:\d*)?([^# ]*)/;
            let arr = this.activeTaskId.match(patt1);
            let path = arr[arr.length - 1].replace(/\//, '');
            let payload = {
                filePath: path + '/vectors/',
                fileName: 'ads_all',
                fileFormat: 'geojson',
                fileData: data
            };
            yield TaskService.saveFile(payload);
            callback();
        } catch (e) {
            console.log(e);
        }
    });

    exportShp = flow(function*(callback) {
        try {
            let patt1 = /(\w+):\/\/([^/:]+)(:\d*)?([^# ]*)/;
            let arr = this.activeTaskId.match(patt1);
            let path = arr[arr.length - 1].replace(/\//, '');
            let url = path + '/vectors/ads_all.geojson';
            yield TaskService.exportShp({
                jsonPath: url
            });
            callback();
        } catch (e) {
            console.log(e);
        }
    });
}

export default new TaskStore();
