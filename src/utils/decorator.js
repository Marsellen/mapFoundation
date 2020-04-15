import OperateHistoryStore from 'src/pages/Index/store/OperateHistoryStore';
import RenderModeStore from 'src/pages/Index/store/RenderModeStore';
import DataLayerStore from 'src/pages/Index/store/DataLayerStore';
import editLog from 'src/models/editLog';
import AdEmitter from 'src/models/event';

/**
 * 日志修饰器，提供操作结束统一处理模型
 * @method logDecorator
 * @param {Object} option 修饰器参数
 * @property {Object | String} option.operate 操作类型，为字符串或图层映射对象
 * @property {Boolean} option.onlyRun 为true时只运行包装函数并记录可能的错误日志，默认false
 * @property {Boolean} option.skipHistory 为true时跳过历史记录，默认false
 * @returns {Object} 被打断/合并线要素的lines相关信息
 */
export const logDecorator = option => {
    return (target, name, descriptor) => {
        const fn = descriptor.value;
        descriptor.value = async function () {
            var log;
            let { operate, onlyRun, skipHistory } = option;
            if (typeof operate === 'object') {
                let layerName = DataLayerStore.getEditLayer().layerName;
                operate = operate[layerName];
            }
            try {
                let history = await fn.apply(this, arguments);
                if (onlyRun) return;
                if (!skipHistory) {
                    OperateHistoryStore.add(history);
                }
                // 更新关联关系渲染
                RenderModeStore.updateRels(history);
                // 刷新属性列表
                AdEmitter.emit('fetchViewAttributeData');
                log = {
                    operateHistory: history,
                    action: operate,
                    result: 'success'
                };
            } catch (e) {
                console.log(e);
                log = {
                    action: operate,
                    result: 'fail',
                    message: e
                };
            }
            log.editType = DataLayerStore.editType;
            editLog.add(log);
            DataLayerStore.exitEdit();
        };
        return descriptor;
    };
};
