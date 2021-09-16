import OperateHistoryStore from 'src/store/home/operateHistoryStore';
import RenderModeStore from 'src/store/home/renderModeStore';
import DataLayerStore from 'src/store/home/dataLayerStore';
import TaskStore from 'src/store/home/taskStore';
import RightMenuStore from 'src/store/home/rightMenuStore';
import AttributeStore from 'src/store/home/attributeStore';
import BufferStore from 'src/store/home/bufferStore';
import editLog from 'src/tool/editLog';
import AdEmitter from 'src/tool/event';
import { EDIT_MESSAGE } from 'src/config/editMessage';
import { message } from 'antd';
import Lock from 'src/tool/lock';
import BuriedPoint from 'src/tool/buriedPoint';
import { EDIT_TOOL_MAP } from 'src/config/editToolMap';
import QCMarkerStore from 'src/store/home/qcMarkerStore';

function funcDecoratorFactory(factory, option) {
    return (target, name, descriptor) => {
        if (descriptor.value) {
            return {
                ...descriptor,
                value: factory(descriptor.value, option)
            };
        } else if (descriptor.initializer) {
            return {
                ...descriptor,
                initializer: function () {
                    return factory(descriptor.initializer.apply(this), option);
                }
            };
        }

        return descriptor;
    };
}

export const operateLock = new Lock(); // 操作锁

//单一工具loading埋点处理
const logDecoratorBuriedPoint = (toolType, doubleLog) => {
    switch (toolType) {
        case 'new_rel':
            break;
        case 'attr_edit_modal':
        case 'batch_assign':
            BuriedPoint.toolLoadBuriedPointStart(toolType, 'save_button');
            break;
        case 'batch_build':
        case 'posture_adjust':
            BuriedPoint.toolLoadBuriedPointStart(toolType, 'complete_button');
            break;
        case 'new_template_arrow':
        case 'new_facade_rectangle':
        case 'new_circle':
        case 'new_ground_rectangle':
            BuriedPoint.toolLoadBuriedPointStart(toolType, 'draw_end');
            break;
        case 'undo':
        case 'redo':
        case 'delete':
        case 'force_delete':
            BuriedPoint.toolLoadBuriedPointStart(toolType, 'tool_start');
            break;
        default:
            if (doubleLog) return;
            BuriedPoint.toolLoadBuriedPointStart(toolType, 'right_click');
            break;
    }
};

/**
 * 日志修饰器，提供操作结束统一处理模型
 * @method logDecorator
 * @param {Object} option 修饰器参数
 * @property {Object | String} option.operate 操作类型，为字符串或图层映射对象
 * @property {Boolean} option.onlyRun 为true时只运行包装函数并记录可能的错误日志，默认false
 * @property {Boolean} option.skipHistory 为true时跳过历史记录，默认false
 * @property {Boolean} option.skipRenderMode 为true时跳过渲染模式重绘，默认false
 * @property {String} option.toolType 埋点类型
 * @property {Boolean} option.doubleLog 是否为二次调用日志装饰器
 * @returns {Object} 被打断/合并线要素的lines相关信息
 */
export const logDecorator = option => {
    return (target, name, descriptor) => {
        const fn = descriptor.value;
        descriptor.value = async function () {
            let log;
            let isError = false;
            let { operate, onlyRun, skipHistory, skipRenderMode, toolType, doubleLog } =
                option || {};
            const editType = DataLayerStore.editType;
            toolType = toolType ?? editType;
            if (EDIT_MESSAGE[editType] && EDIT_MESSAGE[editType].loadingMsg) {
                message.loading({
                    key: editType,
                    duration: 65,
                    content: EDIT_MESSAGE[editType].loadingMsg
                });
            }
            if (typeof operate === 'object') {
                let layerName = DataLayerStore.getAdEditLayer().layerName;
                operate = operate[layerName];
            }
            if (!operate) operate = EDIT_TOOL_MAP[editType];
            !onlyRun && operateLock.lock(operate);

            logDecoratorBuriedPoint(toolType, doubleLog);

            try {
                let history = await fn.apply(this, arguments);
                if (onlyRun || !history) return;
                if (!skipHistory) {
                    OperateHistoryStore.add(history);
                }
                if (!skipRenderMode) {
                    // 更新关联关系渲染
                    RenderModeStore.updateRels(history);
                }
                // 刷新属性列表
                AdEmitter.emit('fetchViewAttributeData');
                log = {
                    operateHistory: history,
                    action: operate,
                    result: 'success'
                };
                if (EDIT_MESSAGE[editType] && EDIT_MESSAGE[editType].successMsg) {
                    message.success({
                        key: editType,
                        duration: 1,
                        content: EDIT_MESSAGE[editType].successMsg
                    });
                }
                BufferStore.updateBufferRender(history);

            } catch (e) {
                console.log(e);
                log = {
                    action: operate,
                    result: 'fail',
                    message: e.message
                };
                if (EDIT_MESSAGE[editType] && EDIT_MESSAGE[editType].errorMsg) {
                    message.error({
                        key: editType,
                        duration: 3,
                        content: EDIT_MESSAGE[editType].errorMsg + e.message
                    });
                }
                isError = true;
            } finally {
                !onlyRun && operateLock.unlock();
            }
            log.editType = editType;
            editLog.add(log);
            const editLayerName = DataLayerStore.getEditLayerName();
            const isMarkerLayer = editLayerName === 'AD_Marker';
            const channel = isError ? 'error' : 'success';
            BuriedPoint.toolLoadBuriedPointEnd(toolType, channel);
            BuriedPoint.toolBuriedPointEnd(toolType, channel);
            isMarkerLayer ? QCMarkerStore.exitMarker() : DataLayerStore.exitEdit();
        };
        return descriptor;
    };
};

const editInputLimitBuriedPoint = (editType, subtype) => {
    if (editType === 'new_rel') {
        if (subtype === 'Left_right_lane_rel') {
            BuriedPoint.toolLoadBuriedPointStart(editType, 'right_click');
        }
        BuriedPoint.toolLoadBuriedPointEnd(editType, 'error');
        BuriedPoint.toolBuriedPointEnd(editType, 'error');
    }
};

/**
 * 编辑操作输入限制修饰器，对编辑操作输入数据进行验证
 * 需要被装饰的函数的第一个参数是要素组成的数组，装修器将校验这些要素
 * @method editInputLimit
 * @param {Object} option 修饰器参数
 * @property {Object | String} option.editType 编辑类型
 * @property {Object | String} option.isRightMenu 是否是右键菜单操作
 * @property {Object | String} option.subtype 子类型
 */
export const editInputLimit = (option = {}) => {
    return (target, name, descriptor) => {
        const fn = descriptor.value;
        descriptor.value = async function () {
            const { editType, subtype, isRightMenu } = option;
            const { activeTask: { inputLimit } = {} } = TaskStore;
            const features = isRightMenu ? RightMenuStore.features : arguments[0];
            const inputLimitStatus = inputLimit(editType, features);
            if (inputLimitStatus) {
                //如果满足条件就正常执行被装饰的函数
                await fn.apply(this, arguments);
            } else {
                //按编辑工具类型执行报错埋点
                editInputLimitBuriedPoint(editType, subtype);
                //如果不满足条件就退出编辑状态，且不执行被装饰的函数
                DataLayerStore.exitEdit();
                RightMenuStore.hide();
                AttributeStore.hide('other_close');
                AttributeStore.hideRelFeatures();
            }
        };
        return descriptor;
    };
};

/**
 * 编辑操作输出限制修饰器，对编辑操作输出数据进行验证
 * 需要被装饰的函数的第一个参数是要素组成的数组，装修器将校验这些要素
 * @method editOutputLimit
 * @param {Object} option 修饰器参数
 * @property {Object | String} option.editType 编辑类型
 */
export const editOutputLimit = (option = {}) => {
    return (target, name, descriptor) => {
        const fn = descriptor.value;
        descriptor.value = async function () {
            const { editType = DataLayerStore.editType } = option;
            const { activeTask: { outputLimit } = {} } = TaskStore;
            const feature = arguments[0];
            const features = Array.isArray(feature) ? feature : [feature];
            const outputLimitStatus = outputLimit(editType, features);
            if (outputLimitStatus) {
                //如果满足条件就正常执行被装饰的函数
                await fn.apply(this, arguments);
            } else {
                //如果不满足条件则不执行被装饰的函数
                //删除要素
                if (feature) {
                    let layer = DataLayerStore.getAdEditLayer();
                    layer.layer.removeFeatureById(feature.uuid);
                }
                //如果是标注图层，报错应退出图层
                const editLayerName = DataLayerStore.getAdEditLayerName();
                const isMarkerLayer = editLayerName === 'AD_Marker';
                isMarkerLayer && QCMarkerStore.exitMarker();
                //退出编辑状态
                DataLayerStore.exitEdit();
                RightMenuStore.hide();
                AttributeStore.hide('other_close');
                AttributeStore.hideRelFeatures();
                //抛出错误
                throw new Error('编辑失败，请在任务范围内编辑要素');
            }
        };
        return descriptor;
    };
};

/**
 * 编辑操作加锁修饰器
 * @method editLock
 * @returns {function} editLock
 */
export const editLock = funcDecoratorFactory(editLockFactory);

function editLockFactory(fn) {
    return function () {
        if (operateLock.isLock) {
            return;
        }

        return fn.apply(this, arguments);
    };
}
