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
import AttributeStore from 'src/pages/Index/store/AttributeStore';

class BuriedPoint {
    constructor() {
        this.windowBuriedPoint();
    }

    sendRequest = async obj => {
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
                eventType: obj?.eventType ?? null, //事件类型：click、keydown
                clientTime: Date.now() //客户端埋点时间
            };
            console.log(
                params.businessType,
                params.action,
                params.businessData.buriedPointType,
                params.businessData.buriedPointDesc,
                params.businessData.functionType,
                params.businessData.layerName,
                params.businessData.taskId,
                params.businessData.taskStatus
            );
            await BuriedPointService.buriedPoint(params);
        } catch (e) {
            console.log('埋点接口异常' + e.message || e || '');
        }
    };

    //埋点:单一工具-开始
    toolBuriedPointStart = async (type, channel) => {
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
            case 'check_server':
                buriedPointDesc = '质检服务自动调用';
                break;
            case 'toggle_task':
                buriedPointDesc = '切换任务自动调用';
                break;
            case 'submit_task':
                buriedPointDesc = '提交任务自动调用';
                break;
            default:
                return;
        }
        await this.sendRequest({
            type,
            functionType: '单一工具',
            buriedPointType: '编辑工具开始',
            buriedPointDesc,
            action: 1,
            eventType
        });
    };

    //埋点:单一工具-结束
    toolBuriedPointEnd = async (type, channel) => {
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
        await this.sendRequest({
            type,
            functionType: '单一工具',
            buriedPointType: '编辑工具结束',
            buriedPointDesc,
            action: 2,
            eventType
        });
    };

    //埋点：单一工具loading开始
    toolLoadBuriedPointStart = async (type, channel) => {
        if (!type || type === 'normal') return;
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
            case 'auto':
                buriedPointDesc = '执行开始';
                break;
            default:
                return;
        }
        await this.sendRequest({
            type,
            functionType: '单一工具',
            buriedPointType: 'Loading开始',
            buriedPointDesc,
            action: 3,
            eventType
        });
    };

    //埋点：单一工具loading结束
    toolLoadBuriedPointEnd = async (type, channel) => {
        if (!type || type === 'normal') return;
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
        await this.sendRequest({
            type,
            functionType: '单一工具',
            buriedPointType: 'Loading结束',
            buriedPointDesc,
            action: 4,
            eventType
        });
    };

    //埋点：窗口交互1-开启
    modalBuriedPointStart = async (type, channel) => {
        if (channel === 'button') {
            const isShortcutKey = ShortcutKey.keyCode;
            const eventType = isShortcutKey ? 'keyup' : 'click';
            const buriedPointDesc = isShortcutKey ? '快捷键' : '按钮';
            await this.sendRequest({
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
    modalBuriedPointEnd = async (type, channel) => {
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
            case 'toggle_task':
                eventType = 'click';
                buriedPointDesc = '切换任务';
                break;
            case 'submit_task':
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
        await this.sendRequest({
            type,
            functionType: '窗口交互1',
            buriedPointType: '关闭窗口',
            buriedPointDesc,
            action: 2,
            eventType
        });
    };

    //埋点：数据加载-开始加载
    dataLoadBuriedPointStart = async (type, channel) => {
        if (channel === 'task_start') {
            const eventType = null;
            const buriedPointDesc = '开始任务';
            await this.sendRequest({
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
    dataLoadBuriedPointEnd = async (type, channel) => {
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
        await this.sendRequest({
            type,
            functionType: '数据加载',
            buriedPointType: '结束加载',
            buriedPointDesc,
            action: 2,
            eventType
        });
    };

    //埋点：状态切换-开始
    statusBuriedPointStart = async (type, channel) => {
        const editLayerName = DataLayerStore?.getAdEditLayerName?.();
        if (type === 'normal' && !editLayerName) return;
        let eventType = 'click';
        let buriedPointDesc = null;
        switch (channel) {
            case 'button':
                buriedPointDesc = '按钮';
                break;
            case 'select_data':
                buriedPointDesc = '点击数据';
                break;
            default:
                return;
        }
        await this.sendRequest({
            type,
            functionType: '状态切换',
            buriedPointType: '进入状态',
            buriedPointDesc,
            action: 1,
            eventType
        });
    };

    //埋点：状态切换-结束
    statusBuriedPointEnd = async (type, channel) => {
        const editLayerName = DataLayerStore?.getAdEditLayerName?.();
        if (type === 'normal' && !editLayerName) return;
        let eventType = 'click';
        let buriedPointDesc = null;
        switch (channel) {
            case 'button':
                buriedPointDesc = '按钮';
                break;
            case 'effect':
                buriedPointDesc = '被动触发';
                break;
            case 'select_data':
                buriedPointDesc = '点击数据';
                break;
            case 'toggle_task':
                buriedPointDesc = '切换任务';
                break;
            case 'submit_task':
                buriedPointDesc = '提交任务';
                break;
            case 'logout':
                buriedPointDesc = '退出登录';
                break;
            default:
                return;
        }
        await this.sendRequest({
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

    //退出登录、提交任务、切换任务统一调用功能结束埋点
    buriedPointEnd = async channel => {
        const { attrListVisible } = AttributeStore;
        const { adEditLayer, editStatus } = DataLayerStore;
        const isUnionBreak = editStatus === 'union_break';
        await Promise.allSettled([
            attrListVisible && this.modalBuriedPointEnd('attr_list', channel),
            adEditLayer && this.statusBuriedPointEnd('normal', channel),
            isUnionBreak && this.statusBuriedPointEnd('union_break', channel)
        ]);
    };
}

export default new BuriedPoint();
