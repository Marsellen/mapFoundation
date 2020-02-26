import React from 'react';
import ToolIcon from 'src/components/ToolIcon';
import { inject, observer } from 'mobx-react';
import { message, Icon, Modal } from 'antd';
import {
    newRel,
    basicCheck,
    createRelBySpecConfig,
    batchAddRels,
    attrRelUniqCheck
} from 'src/utils/relCtrl/relCtrl';
import AdMessage from 'src/components/AdMessage';
import editLog from 'src/models/editLog';
import AddLRLaneDriverRel from './AddRelModal/AddLRLaneDriverRel';
import { REL_SPEC_CONFIG } from 'src/config/RelsConfig';
import { isManbuildTask } from 'src/utils/taskUtils';
import AdEmitter from 'src/models/event';
import 'less/components/tool-icon.less';
import './AddRel.less';

@inject('RenderModeStore')
@inject('DataLayerStore')
@inject('OperateHistoryStore')
@inject('AttributeStore')
@inject('TaskStore')
@observer
class AddRel extends React.Component {
    componentDidMount() {
        const { DataLayerStore } = this.props;
        DataLayerStore.setNewRelCallback(this.newRelCallBack);
    }

    render() {
        const { DataLayerStore } = this.props;
        let visible = DataLayerStore.editType == 'newRel';
        return (
            <span className={visible ? 'ad-icon-active' : ''}>
                {!this.disEditable() && (
                    <ToolIcon
                        id="add-rel-btn"
                        icon="xinzengguanxi"
                        title="新增关联关系"
                        action={this.action}
                    />
                )}
                <AdMessage visible={visible} content={this.content()} />
                <AddLRLaneDriverRel
                    onRef={modal => {
                        this.addLRLaneDriverRelModal = modal;
                    }}
                    onOk={this.addLRLaneDriverRel}
                />
            </span>
        );
    }

    disEditable = () => {
        const { TaskStore } = this.props;

        return !isManbuildTask(TaskStore.activeTask);
    };

    action = () => {
        if (this.disEditable()) return;
        const { DataLayerStore, AttributeStore } = this.props;
        if (DataLayerStore.editType == 'newRel') return;
        AttributeStore.hideRelFeatures();
        DataLayerStore.newRel();
    };

    renderTips() {
        Modal.info({
            title: '新增关联关系指引',
            content: (
                <div className="layerScroll">
                    <div>
                        <h3>TIPS : 选择要素的顺序必须严格遵守</h3>
                        <p>
                            1. 当前可编辑图层为 “车道中心线”时 ：<br />
                            &emsp;1). 一个车道中心线+多个某一类obj要素
                            <br />
                            &emsp;2). 一个车道中心线+一个地面导向箭头
                            <br />
                            &emsp;3). 一个车道中心线+一个地面文字符号
                            <br />
                            &emsp;4). 一个车道中心线+一个道路参考线
                            <br />
                            &emsp;5). 一个车道中心线+左侧车道线+右侧车道线
                            <br />
                            &emsp;6). 一个车道中心线+一个车道线+选择左侧/右侧
                        </p>

                        <p>
                            2. 当前可编辑图层为 “道路参考线”时 ：<br />
                            &emsp;1). 一个道路参考线+一个车道标记点
                        </p>
                        <p>
                            3. 当前可编辑图层为
                            “停止位置”、“面状标识物”、“交通标志牌”、“交通信号灯”时{' '}
                            <br />
                            &emsp;例如：当前编辑图层为 “停止位置”时 :<br />
                            &emsp;&emsp;一个“停止位置”+
                            多个车道中心线——可建立多对关联关系
                            <br />
                        </p>
                        <p>
                            4. 当前可编辑图层为
                            “地面导向箭头”、“地面文字符号”、“车道标记点”时 ：
                            <br />
                            &emsp;1). 一个地面导向箭头+一个车道中心线
                            <br />
                            &emsp;2). 一个地面文字符号+一个车道中心线
                            <br />
                            &emsp;3). 一个车道标记点+一个道路参考线
                        </p>
                    </div>
                </div>
            ),
            onOk() {}
        });
    }

    content = () => {
        return (
            <label>
                <Icon type="info-circle" onClick={this.renderTips} />{' '}
                请按顺序选择关联对象
            </label>
        );
    };

    newRelCallBack = async (result, event) => {
        // console.log(result);
        if (event.button !== 2) return false;
        const { DataLayerStore } = this.props;
        try {
            let [mainFeature, ...relFeatures] = result;
            let layerName = DataLayerStore.getEditLayer().layerName;
            await basicCheck(mainFeature, relFeatures, layerName);
            this.newRel(mainFeature, relFeatures);
        } catch (e) {
            console.log(e);
            message.warning('新建关联关系失败：' + e.message, 3);
            DataLayerStore.exitEdit();
        }
    };

    newRel = (mainFeature, relFeatures) => {
        if (this.isAddLRLaneDriverRel(mainFeature, relFeatures)) {
            this.addLRLaneDriverRelModal.show([mainFeature, relFeatures[0]]);
        } else {
            this.comfirmNewRel(mainFeature, relFeatures);
        }
    };

    comfirmNewRel = (mainFeature, relFeatures) => {
        const { DataLayerStore, RenderModeStore } = this.props;
        Modal.confirm({
            title: '是否新建关联关系?',
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            onOk: async () => {
                try {
                    let rels = await newRel(mainFeature, relFeatures);
                    this.saveLog(rels);
                    RenderModeStore.updateFeatureColor();
                    AdEmitter.emit('fetchViewAttributeData');
                } catch (e) {
                    console.log(e);
                    message.warning('新建关联关系失败：' + e.message, 3);
                    DataLayerStore.exitEdit();
                }
            },
            onCancel() {
                DataLayerStore.exitEdit();
            }
        });
    };

    isAddLRLaneDriverRel = (mainFeature, relFeatures) => {
        if (relFeatures.length != 1) {
            return false;
        }
        let mainLayer = mainFeature.layerName;
        let relLayer = relFeatures[0].layerName;
        let isAddLRLaneDriver =
            (mainLayer === 'AD_Lane' && relLayer === 'AD_LaneDivider') ||
            (mainLayer === 'AD_LaneDivider' && relLayer === 'AD_Lane');
        if (isAddLRLaneDriver) {
            return true;
        }
    };

    addLRLaneDriverRel = async (type, options) => {
        try {
            const { RenderModeStore } = this.props;
            let [mainFeature, relFeature] = options;
            let specConfig = REL_SPEC_CONFIG.find(
                config => config.relObjType === type
            );
            let rel = createRelBySpecConfig(
                specConfig,
                mainFeature,
                relFeature
            );
            await attrRelUniqCheck(rel);
            await batchAddRels([rel]);
            this.saveLog([rel]);
            RenderModeStore.updateFeatureColor();
            AdEmitter.emit('fetchViewAttributeData');
        } catch (e) {
            const { DataLayerStore } = this.props;
            console.log(e);
            message.warning('与左右车道线新建关联关系失败：' + e.message, 3);
            DataLayerStore.exitEdit();
        }
    };

    saveLog = rels => {
        const { DataLayerStore, OperateHistoryStore } = this.props;
        let history = {
            type: 'updateFeatureRels',
            data: {
                rels: [[], rels]
            }
        };
        let log = {
            operateHistory: history,
            action: 'addRel',
            result: 'success'
        };
        OperateHistoryStore.add(history);
        editLog.store.add(log);
        message.success('新建成功', 3);
        DataLayerStore.exitEdit();
    };
}

export default AddRel;
