import config from 'src/config';
import { DATA_LAYER_MAP } from 'src/config/DataLayerConfig';
import { BUSINESS_TYPE_MAP, EDIT_STATUS_MAP } from 'src/config/BuriedPointConfig';
import BuriedPointService from 'src/services/BuriedPointService';
import ShortcutKey from 'src/utils/ShortcutKey';
import AppStore from 'src/store/appStore';
import TaskStore from 'src/pages/Index/store/TaskStore';
import DataLayerStore from 'src/pages/Index/store/DataLayerStore';
import RightMenuStore from 'src/pages/Index/store/RightMenuStore';
import QCMarkerStore from 'src/pages/Index/store/QCMarkerStore';

class BuriedPoint {
    constructor() {
        this.windowBuriedPoint();
    }

    sendRequest = obj => {
        try {
            //接口文档：https://confluence.ecarx.com.cn/pages/viewpage.action?pageId=64785919
            const isQcMarker = obj?.type?.includes('qc_marker');
            const layerName = isQcMarker
                ? QCMarkerStore?.currentMarker?.data?.properties?.fileName
                : obj?.layerName ?? DataLayerStore?.getAdEditLayerName?.();
            const layerNameDesc = DATA_LAYER_MAP?.[layerName]?.label; //图层名翻译成中文
            const editStatus = obj?.editStatus ?? DataLayerStore?.editStatus;
            const editStatusDesc = EDIT_STATUS_MAP?.[editStatus];
            const params = {
                system: 2, //所处平台，1：工作流；2：编辑平台
                businessType:
                    BUSINESS_TYPE_MAP[obj?.type]?.code ??
                    BUSINESS_TYPE_MAP[obj?.type]?.[layerName]?.code ??
                    null, //业务类型，参数说明：http://ad-task-dev.ecarx.com.cn/collectMng/metaMng
                systemVersion: config?.version ?? null, //业务系统版本
                businessData: {
                    functionType: obj?.functionType ?? null, //功能类型：单一工具、窗口交互、数据加载
                    layerName: layerNameDesc ?? editStatusDesc ?? null, //当前作业图层
                    taskId: TaskStore?.activeTask?.taskId ?? null, //任务号
                    taskProcess: TaskStore?.activeTask?.nodeDesc ?? null, //任务阶段
                    taskStatus: TaskStore?.activeTask?.manualStatusDesc ?? null, //任务状态
                    buriedPointType: obj?.buriedPointType ?? null, //埋点类型
                    buriedPointDesc: obj?.buriedPointDesc ?? null //埋点描述
                },
                action: obj?.action ?? null, //动作属性，0：基础点；1：开始点；2：结束点；3：loading开始；4：loading结束
                createUserName: AppStore?.loginUser?.name ?? null, //创建者名称
                createUserRole: AppStore?.loginUser?.roleName ?? null, //创建者角色
                url: window?.location?.href ?? null, //页面URL
                eventType: obj?.eventType ?? null //事件类型：click、keydown
            };
            BuriedPointService.buriedPoint(params);
        } catch (e) {
            console.log('埋点接口异常' + e.message || e || '');
        }
    };

    //埋点:单一工具-开始
    toolBuriedPointStart = (type, channel) => {
        if (!type) return;
        let eventType = null;
        let buriedPointDesc = null;
        switch (channel) {
            case 'button':
                const isShortcutKey = ShortcutKey.keyCode;
                const isRightMenu = RightMenuStore?.menus?.includes?.(type);
                eventType = isShortcutKey ? 'keyup' : 'click';
                buriedPointDesc = isShortcutKey ? '快捷键' : isRightMenu ? '右键菜单' : '按钮';
                break;
            case 'delete_button':
                eventType = 'click';
                buriedPointDesc = '删除按钮';
                break;
            case 'modify_button':
                eventType = 'click';
                buriedPointDesc = '修改按扭';
                break;
            case 'fast_modify':
                eventType = 'click';
                buriedPointDesc = '快捷修改';
                break;
            case 'open':
                buriedPointDesc = '开启窗口';
                break;
            case 'auto':
                buriedPointDesc = '前端定时触发';
                break;
            case 'checkServer':
                buriedPointDesc = '质检服务自动调用';
                break;
            case 'toggleTask':
                buriedPointDesc = '切换任务自动调用';
                break;
            case 'submitTask':
                buriedPointDesc = '提交任务自动调用';
                break;
            default:
                return;
        }
        this.sendRequest({
            type,
            functionType: '单一工具',
            buriedPointType: '编辑工具开始',
            buriedPointDesc,
            action: 1,
            eventType
        });
    };

    //埋点:单一工具-结束
    toolBuriedPointEnd = (type, channel) => {
        if (!type) return;
        let eventType = null;
        let buriedPointDesc = null;
        switch (channel) {
            case 'toggle':
                if (type === 'normal') return;
                const isShortcutKey = ShortcutKey.keyCode;
                eventType = isShortcutKey ? 'keyup' : 'click';
                buriedPointDesc = '切换工具退出';
                break;
            case 'esc':
                eventType = 'keyup';
                buriedPointDesc = 'Esc退出';
                break;
            case 'success':
                buriedPointDesc = '前端更新结束';
                break;
            case 'error':
                buriedPointDesc = '报错退出';
                break;
            case 'close':
                eventType = 'click';
                buriedPointDesc = '右上角关闭窗口';
                break;
            case 'cancel':
                eventType = 'click';
                buriedPointDesc = '取消按钮';
                break;
            case 'other_close':
                buriedPointDesc = '其它退出';
                break;
            default:
                return;
        }
        this.sendRequest({
            type,
            functionType: '单一工具',
            buriedPointType: '编辑工具结束',
            buriedPointDesc,
            action: 2,
            eventType
        });
    };

    //埋点：单一工具loading开始
    toolLoadBuriedPointStart = (type, channel) => {
        if (!type || type === 'normal') return;
        const layerName = DataLayerStore?.getAdEditLayerName?.();
        const isLoad_1 = BUSINESS_TYPE_MAP[type]?.isLoad;
        const isLoad_2 = BUSINESS_TYPE_MAP[type]?.[layerName]?.isLoad;
        if (!isLoad_1 && !isLoad_2) return;
        let eventType = 'click';
        let buriedPointDesc = null;
        switch (channel) {
            case 'right_click':
                buriedPointDesc = '右键结束';
                break;
            case 'save_button':
                buriedPointDesc = '保存按钮';
                break;
            case 'complete_button':
                buriedPointDesc = '完成按钮';
                break;
            case 'draw_end':
                buriedPointDesc = '绘制结束';
                break;
            case 'conform_delete':
                buriedPointDesc = '确认删除';
                break;
            case 'fast_modify':
                buriedPointDesc = '快捷修改';
                break;
            default:
                return;
        }
        this.sendRequest({
            type,
            functionType: '单一工具',
            buriedPointType: 'Loading开始',
            buriedPointDesc,
            action: 3,
            eventType
        });
    };

    //埋点：单一工具loading结束
    toolLoadBuriedPointEnd = (type, channel) => {
        if (!type || type === 'normal') return;
        const layerName = DataLayerStore?.getAdEditLayerName?.();
        const isLoad_1 = BUSINESS_TYPE_MAP[type]?.isLoad;
        const isLoad_2 = BUSINESS_TYPE_MAP[type]?.[layerName]?.isLoad;
        if (!isLoad_1 && !isLoad_2) return;
        let eventType = null;
        let buriedPointDesc = null;
        switch (channel) {
            case 'success':
                buriedPointDesc = '前端更新结束';
                break;
            case 'error':
                buriedPointDesc = '报错退出';
                break;
            default:
                return;
        }
        this.sendRequest({
            type,
            functionType: '单一工具',
            buriedPointType: 'Loading结束',
            buriedPointDesc,
            action: 4,
            eventType
        });
    };

    //埋点：窗口交互1-开启
    modalBuriedPointStart = (type, channel) => {
        if (channel === 'button') {
            const isShortcutKey = ShortcutKey.keyCode;
            const eventType = isShortcutKey ? 'keyup' : 'click';
            const buriedPointDesc = isShortcutKey ? '快捷键' : '按钮';
            this.sendRequest({
                type,
                functionType: '窗口交互1',
                buriedPointType: '开启窗口',
                buriedPointDesc,
                action: 1,
                eventType
            });
        }
    };

    //埋点：窗口交互1-关闭
    modalBuriedPointEnd = (type, channel) => {
        let eventType = null;
        let buriedPointDesc = null;
        switch (channel) {
            case 'button':
                const isShortcutKey = ShortcutKey.keyCode;
                eventType = isShortcutKey ? 'keyup' : 'click';
                buriedPointDesc = isShortcutKey ? '快捷键' : '按钮';
                break;
            case 'esc':
                eventType = 'keyup';
                buriedPointDesc = 'Esc退出';
                break;
            case 'close':
                eventType = 'click';
                buriedPointDesc = '右上角关闭窗口';
                break;
            case 'toggleTask':
                eventType = 'click';
                buriedPointDesc = '切换任务';
                break;
            case 'submitTask':
                eventType = 'click';
                buriedPointDesc = '提交任务';
                break;
            case 'logout':
                eventType = 'click';
                buriedPointDesc = '退出登录';
                break;
            default:
                return;
        }
        this.sendRequest({
            type,
            functionType: '窗口交互1',
            buriedPointType: '关闭窗口',
            buriedPointDesc,
            action: 2,
            eventType
        });
    };

    //埋点：数据加载-开始加载
    dataLoadBuriedPointStart = (type, channel) => {
        if (channel === 'task_start') {
            const eventType = null;
            const buriedPointDesc = '开始任务';
            this.sendRequest({
                type,
                functionType: '数据加载',
                buriedPointType: '开始加载',
                buriedPointDesc,
                action: 1,
                eventType
            });
        }
    };

    //埋点：数据加载-结束加载
    dataLoadBuriedPointEnd = (type, channel) => {
        let eventType = null;
        let buriedPointDesc = null;
        switch (channel) {
            case 'success':
                buriedPointDesc = '前端更新结束';
                break;
            case 'error':
                buriedPointDesc = '报错退出';
                break;
            case 'toggleTask':
                eventType = 'click';
                buriedPointDesc = '切换任务';
                break;
            case 'submitTask':
                eventType = 'click';
                buriedPointDesc = '提交任务';
                break;
            case 'logout':
                eventType = 'click';
                buriedPointDesc = '退出登录';
                break;
            default:
                return;
        }
        this.sendRequest({
            type,
            functionType: '数据加载',
            buriedPointType: '结束加载',
            buriedPointDesc,
            action: 2,
            eventType
        });
    };

    //埋点：状态切换-开始
    statusBuriedPointStart = (type, channel) => {
        const editLayerName = DataLayerStore?.getAdEditLayerName?.();
        if (type === 'normal' && !editLayerName) return;
        const isShortcutKey = ShortcutKey.keyCode;
        let eventType = isShortcutKey ? 'keyup' : 'click';
        let buriedPointDesc = null;
        switch (channel) {
            case 'button':
                buriedPointDesc = isShortcutKey ? '快捷键' : '按钮';
                break;
            case 'right_menu':
                buriedPointDesc = isShortcutKey ? '快捷键' : '右键菜单';
                break;
            default:
                return;
        }
        this.sendRequest({
            type,
            functionType: '状态切换',
            buriedPointType: '进入状态',
            buriedPointDesc,
            action: 1,
            eventType
        });
    };

    //埋点：状态切换-结束
    statusBuriedPointEnd = (type, channel) => {
        const editLayerName = DataLayerStore?.getAdEditLayerName?.();
        if (type === 'normal' && !editLayerName) return;
        const isShortcutKey = ShortcutKey.keyCode;
        let eventType = isShortcutKey ? 'keyup' : 'click';
        let buriedPointDesc = null;
        switch (channel) {
            case 'button':
                buriedPointDesc = isShortcutKey ? '快捷键' : '按钮';
                break;
            case 'right_menu':
                buriedPointDesc = isShortcutKey ? '快捷键' : '右键菜单';
                break;
            case 'effect':
                buriedPointDesc = '被动触发';
                break;
            case 'toggleTask':
                eventType = 'click';
                buriedPointDesc = '切换任务';
                break;
            case 'submitTask':
                eventType = 'click';
                buriedPointDesc = '提交任务';
                break;
            case 'logout':
                eventType = 'click';
                buriedPointDesc = '退出登录';
                break;
            default:
                return;
        }
        this.sendRequest({
            type,
            functionType: '状态切换',
            buriedPointType: '退出状态',
            buriedPointDesc,
            action: 2,
            eventType
        });
    };

    //埋点：网页状态
    windowBuriedPoint = () => {
        //页面加载
        window.addEventListener('load', () => {
            if (window.location.pathname !== '/') return;
            this.sendRequest({
                type: 'window_status',
                functionType: '网页状态',
                buriedPointType: '页面进入激活',
                buriedPointDesc: '页面加载',
                action: 1
            });
        });
        //页面退出
        window.addEventListener('beforeunload', () => {
            if (window.location.pathname !== '/') return;
            this.sendRequest({
                type: 'window_status',
                functionType: '网页状态',
                buriedPointType: '页面退出激活',
                buriedPointDesc: '页面退出',
                action: 2
            });
        });
        //浏览器切换tab页
        document.addEventListener('visibilitychange', () => {
            if (window.location.pathname !== '/') return;
            if (document.visibilityState === 'visible') {
                this.sendRequest({
                    type: 'window_status',
                    functionType: '网页状态',
                    buriedPointType: '页面进入激活',
                    buriedPointDesc: '浏览器切换tab页',
                    action: 1
                });
            }
            if (document.visibilityState === 'hidden') {
                this.sendRequest({
                    type: 'window_status',
                    functionType: '网页状态',
                    buriedPointType: '页面退出激活',
                    buriedPointDesc: '浏览器切换tab页',
                    action: 2
                });
            }
        });
    };
}

export default new BuriedPoint();
