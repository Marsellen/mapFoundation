import { observable, configure, action, flow, toJS } from 'mobx';
import QCMarkerService from 'src/services/QCMarkerService';
import { message } from 'antd';
import { MARKER_TABLE_COLUMNS } from 'src/config/QCMarkerConfig';

const filterKeys = MARKER_TABLE_COLUMNS.flatMap(item => {
    return item.isFilter ? [item] : [];
});

configure({ enforceActions: 'always' });
class QCMarkerStore {
    @observable filterMap = {};
    @observable filters = {};
    @observable updateKey;
    @observable editStatus = null; // create, visite, modify
    @observable visible = false;
    @observable visibleList = false;
    @observable currentMarker = {};
    @observable markerList = [];

    @action show = () => {
        this.visible = true;
    };

    @action hide = () => {
        this.visible = false;
    };

    @action showList = () => {
        this.visibleList = true;
    };

    @action hideList = () => {
        this.visibleList = false;
    };

    setFormStatus = status => {
        this.modalStatus = status;
    };

    @action setEditStatus = status => {
        this.editStatus = status;
    };

    @action updateFilters = marker => {
        try {
            filterKeys.forEach(item => {
                const { key, describe } = item;
                const { data, second, label, value } = describe;
                const currentVal = marker[key];
                const secondStr = marker[second];
                const descArr = second ? data[secondStr] : data;
                const describeObj = descArr.find(desc => desc[value] === currentVal);
                this.filterMap[key] = this.filterMap[key] || {};
                this.filterMap[key][currentVal] = {
                    value: currentVal,
                    text: describeObj[label]
                };
            });
        } catch (e) {
            console.log(e);
        }
    };

    @action getFilters = () => {
        const filters = {};
        Object.keys(this.filterMap).forEach(key => {
            filters[key] = filters[key] || [];
            filters[key] = Object.values(this.filterMap[key]);
        });
        this.filters = filters;
    };

    @action initMarkerList = list => {
        this.markerList = list;
        this.getFilters();
        this.updateKey = Math.random();
    };

    @action updateMarkerList = ({ type, id, marker }) => {
        switch (type) {
            case 'insert':
                this.markerList.unshift(marker);
                break;
            case 'update':
                const index = this.markerList.findIndex(item => item.id === id);
                this.markerList[index] = marker;
                break;
            case 'delete':
                const currentMarkerIndex = this.markerList.findIndex(item => item.id === id);
                this.markerList.splice(currentMarkerIndex, 1);
                break;
            default:
                break;
        }
        this.updateFilters(marker);
        this.getFilters();
        this.updateKey = Math.random();
    };

    @action initCurrentMarker = marker => {
        this.currentMarker = marker;
    };

    @action updateCurrentMarker = newProperties => {
        if (!this.currentMarker || !this.currentMarker.data) return;
        let properties = this.currentMarker.data.properties;
        properties = Object.assign(properties, newProperties);
        return toJS(this.currentMarker);
    };

    @action clearCurrentMarker = () => {
        this.currentMarker = {};
    };

    removeMarkerVector = () => {
        window.markerLayer.layer.removeFeatureById(this.currentMarker.uuid);
        this.clearCurrentMarker();
    };

    exitMarker = (isDelete = true) => {
        isDelete && this.editStatus === 'create' && this.removeMarkerVector();
        this.hide();
        this.setEditStatus();
        this.clearCurrentMarker();
    };

    insertMarker = flow(function* (data) {
        try {
            const res = yield QCMarkerService.insertMarker(data);
            return res;
        } catch (e) {
            const msg = e.message || e || '';
            message.warning('质检标注新增失败 ' + msg);
        }
    });

    updateMarker = flow(function* (data) {
        try {
            const res = yield QCMarkerService.updateMarker(data);
            return res;
        } catch (e) {
            const msg = e.message || e || '';
            message.warning('质检标注更新失败 ' + msg);
        }
    });

    deleteMarker = flow(function* (params) {
        try {
            const res = yield QCMarkerService.deleteMarker(params);
            return res;
        } catch (e) {
            const msg = e.message || e || '';
            message.warning('质检标注删除失败 ' + msg);
        }
    });

    getMarkerList = flow(function* (data) {
        try {
            const res = yield QCMarkerService.getMarkerList(data);
            return res;
        } catch (e) {
            const msg = e.message || e || '';
            message.warning('获取质检标注列表 ' + msg);
        }
    });

    updateMarkerStatus = flow(function* (params) {
        try {
            const res = yield QCMarkerService.updateMarkerStatus(params);
            return res;
        } catch (e) {
            const msg = e.message || e || '';
            message.warning('更新标注状态失败 ' + msg);
        }
    });

    @action release = () => {
        this.filterMap = {};
        this.filters = {};
        this.editStatus = null; // create, visite, modify
        this.visible = false;
        this.visibleList = false;
        this.currentMarker = {};
        this.markerList = [];
    };
}
export default new QCMarkerStore();
