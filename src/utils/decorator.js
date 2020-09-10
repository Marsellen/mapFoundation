import OperateHistoryStore from 'src/pages/Index/store/OperateHistoryStore';
import RenderModeStore from 'src/pages/Index/store/RenderModeStore';
import DataLayerStore from 'src/pages/Index/store/DataLayerStore';
import TaskStore from 'src/pages/Index/store/TaskStore';
import RightMenuStore from 'src/pages/Index/store/RightMenuStore';
import AttributeStore from 'src/pages/Index/store/AttributeStore';
import editLog from 'src/models/editLog';
import AdEmitter from 'src/models/event';
import { EDIT_MESSAGE } from 'src/config/EditMessage';
import { message } from 'antd';

/**
 * 日志修饰器，提供操作结束统一处理模型
 * @method logDecorator
 * @param {Object} option 修饰器参数
 * @property {Object | String} option.operate 操作类型，为字符串或图层映射对象
 * @property {Boolean} option.onlyRun 为true时只运行包装函数并记录可能的错误日志，默认false
 * @property {Boolean} option.skipHistory 为true时跳过历史记录，默认false
 * @property {Boolean} option.skipRenderMode 为true时跳过渲染模式重绘，默认false
 * @returns {Object} 被打断/合并线要素的lines相关信息
 */
export const logDecorator = option => {
    return (target, name, descriptor) => {
        const fn = descriptor.value;
        descriptor.value = async function () {
            var log;
            const editType = DataLayerStore.editType;
            let { operate, onlyRun, skipHistory, skipRenderMode } = option;
            if (EDIT_MESSAGE[editType] && EDIT_MESSAGE[editType].loadingMsg) {
                message.loading({
                    key: editType,
                    duration: 65,
                    content: EDIT_MESSAGE[editType].loadingMsg
                });
            }
            if (typeof operate === 'object') {
                let layerName = DataLayerStore.getEditLayer().layerName;
                operate = operate[layerName];
            }
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
            } catch (e) {
                console.log(e);
                log = {
                    action: operate,
                    result: 'fail',
                    message: e
                };
                if (EDIT_MESSAGE[editType] && EDIT_MESSAGE[editType].errorMsg) {
                    message.error({
                        key: editType,
                        duration: 3,
                        content: EDIT_MESSAGE[editType].errorMsg + e
                    });
                }
            }
            log.editType = editType;
            editLog.add(log);
            DataLayerStore.exitEdit();
        };
        return descriptor;
    };
};

/**
 * 编辑操作输入限制修饰器，对编辑操作输入数据进行验证
 * 需要被装饰的函数的第一个参数是要素组成的数组，装修器将校验这些要素
 * @method editInputLimit
 * @param {Object} option 修饰器参数
 * @property {Object | String} option.editType 编辑类型
 * @property {Object | String} option.isRightMenu 是否是右键菜单操作
 */
export const editInputLimit = (option = {}) => {
    return (target, name, descriptor) => {
        const fn = descriptor.value;
        descriptor.value = async function () {
            const { editType, isRightMenu } = option;
            const { activeTask: { inputLimit } = {} } = TaskStore;
            const features = isRightMenu ? RightMenuStore.features : arguments[0];
            const inputLimitStatus = inputLimit(editType, features);
            if (inputLimitStatus) {
                //如果满足条件就正常执行被装饰的函数
                await fn.apply(this, arguments);
            } else {
                //如果不满足条件就退出编辑状态，且不执行被装饰的函数
                DataLayerStore.exitEdit();
                RightMenuStore.hide();
                AttributeStore.hide();
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
                    let layer = DataLayerStore.getEditLayer();
                    layer.layer.removeFeatureById(feature.uuid);
                }
                //如果是标注图层，报错应退出图层
                const editLayerName = DataLayerStore.getEditLayerName();
                const isMarkerLayer = editLayerName === 'AD_Marker';
                isMarkerLayer && DataLayerStore.exitMarker();
                //退出编辑状态
                DataLayerStore.exitEdit();
                RightMenuStore.hide();
                AttributeStore.hide();
                AttributeStore.hideRelFeatures();
                //抛出错误
                throw new Error('编辑失败，请在任务范围内编辑要素');
            }
        };
        return descriptor;
    };
};
