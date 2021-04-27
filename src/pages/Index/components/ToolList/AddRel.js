import React from 'react';
import ToolIcon from 'src/components/ToolIcon';
import { inject, observer } from 'mobx-react';
import { message, Icon, Modal, Button } from 'antd';
import {
    newRel,
    basicCheck,
    createRelBySpecConfig,
    querySameTypeRel,
    calcRelChangeLog,
    relUniqCheck
} from 'src/utils/relCtrl/relCtrl';
import { updateFeatures } from 'src/utils/relCtrl/operateCtrl';
import AdMessage from 'src/components/AdMessage';
import AddLRLaneDriverRel from './AddRelModal/AddLRLaneDriverRel';
import { REL_SPEC_CONFIG } from 'src/config/RelsConfig';
import { logDecorator, editInputLimit, editLock } from 'src/utils/decorator';
import AttributeStore from 'src/pages/Index/store/AttributeStore';

import 'less/components/tool-icon.less';
import './AddRel.less';
import BuriedPoint from 'src/utils/BuriedPoint';

const key = 'new_rel';

@inject('DataLayerStore')
@observer
class AddRel extends React.Component {
    constructor() {
        super();
        this.state = {
            textVisible: false
        };
    }
    componentDidMount() {
        const { DataLayerStore } = this.props;
        DataLayerStore.setNewRelCallback(this.newRelCallBack);
    }

    render() {
        const { DataLayerStore } = this.props;
        let visible = DataLayerStore.editType == 'new_rel';
        return (
            <span>
                <ToolIcon
                    id="add-rel-btn"
                    icon="xinzengguanxi"
                    title="新增关联关系"
                    className="ad-tool-icon"
                    focusClassName="ad-tool-icon-active"
                    visible={visible}
                    action={this.action}
                />
                <AdMessage visible={visible} content={this.content()} />
                <AddLRLaneDriverRel
                    onRef={modal => {
                        this.addLRLaneDriverRelModal = modal;
                    }}
                    onOk={this.addLRLaneDriverRel}
                />
                <Modal
                    title={<span className="text-modal-title">新增关联关系指引</span>}
                    width={465}
                    className="text-modal"
                    visible={this.state.textVisible}
                    onCancel={this.handleCancel}
                    footer={
                        <Button type="primary" onClick={this.handleCancel}>
                            确定
                        </Button>
                    }
                >
                    <div>
                        <p className="tips">TIPS : 选择要素的顺序必须严格遵守</p>
                        <p className="text-body-title">1、当前可编辑图层：“车道中心线”</p>
                        <p className="text-body-content">
                            (1). 一个车道中心线 + 一个或多个obj要素（“交通信号灯”、“交通标志牌”）
                            <br />
                            例如：一个“车道中心线”+
                            多个“交通信号灯”——可建立多对【车道中心线&交通信号灯关联关系】
                            <br />
                            (2). 一个车道中心线 + 一个道路参考线
                            <br />
                            (3). 一个车道中心线 + 一个车道线
                            <br />
                            (4). 一个车道中心线 + 左侧车道线 + 右侧车道线
                            <br />
                            (5). 一个驶入车道中心线 + 一个驶出车道中心线
                        </p>
                        <p className="text-body-title">2、当前可编辑图层：“道路参考线” </p>
                        <p className="text-body-content">
                            (1). 一个道路参考线 + 一个或多个车道属性变化点
                            <br />
                            (2). 一个道路参考线 + 一个或多个车道中心线
                            <br />
                            例如：一个“道路参考线”
                            + 多个“车道中心线”——可建立多对【车道中心线&道路参考线属性关系】
                            <br />
                            (3). 一个驶入道路参考线 + 一个驶出道路参考线
                            <br />
                        </p>
                        <p className="text-body-title">
                            3、当前可编辑图层：“停止位置”、“面状标识物”、“交通信号灯”、“交通标志牌”
                            一个当前编辑图层的obj要素 + 一个或多个车道中心线
                        </p>
                        <p className="text-body-content">
                            例如：一个“停止位置”
                            + 多个“车道中心线”——可建立多对【车道中心线&停止位置关联关系】
                        </p>
                        <p className="text-body-title">4、当前可编辑图层：“车道属性变化点”</p>
                        <p className="text-body-content">
                            (1). 一个车道属性变化点 + 一个道路参考线
                        </p>
                    </div>
                </Modal>
            </span>
        );
    }

    @editLock
    action = () => {
        const { DataLayerStore } = this.props;
        if (DataLayerStore.editType == 'new_rel') return;
        AttributeStore.hide('other_close');
        AttributeStore.hideRelFeatures();
        DataLayerStore.newRel();
    };

    renderTips = () => {
        this.setState({
            textVisible: true
        });
    };

    handleCancel = () => {
        this.setState({
            textVisible: false
        });
    };

    content = () => {
        return (
            <label>
                <Icon type="info-circle" onClick={this.renderTips} /> 请按顺序选择关联对象
            </label>
        );
    };

    newRelCallBack = async (result, event) => {
        if (event.button !== 2) return false;
        let [mainFeature, ...relFeatures] = result;
        if (this.isAddLRLaneDriverRel(mainFeature, relFeatures)) {
            this.newLRLaneDriverRel(result);
        } else {
            BuriedPoint.toolLoadBuriedPointStart('new_rel', 'right_click');
            this.newRel(result);
        }
    };

    @editInputLimit({ editType: 'new_rel', subtype: 'common_rel' })
    @logDecorator({ operate: '新建关联关系', onlyRun: true, doubleLog: true })
    async newRel(result) {
        try {
            const { DataLayerStore } = this.props;
            let [mainFeature, ...relFeatures] = result;
            let layerName = DataLayerStore.getAdEditLayer().layerName;
            let warningMessage = await basicCheck(mainFeature, relFeatures, layerName);
            this.newRelHandler(mainFeature, relFeatures, warningMessage);
        } catch (e) {
            message.warning({ content: '新建关联关系失败：' + e.message, duration: 3, key });
            throw e;
        }
    }

    @editInputLimit({ editType: 'new_rel', subtype: 'Left_right_lane_rel' })
    @logDecorator({ operate: '新建关联关系', onlyRun: true, doubleLog: true })
    async newLRLaneDriverRel(result) {
        try {
            let [mainFeature, ...relFeatures] = result;
            this.addLRLaneDriverRelModal.show([mainFeature, relFeatures[0]]);
        } catch (e) {
            message.warning({ content: '新建关联关系失败：' + e.message, duration: 3, key });
            throw e;
        }
    }

    @logDecorator({ operate: '新建关联关系' })
    async newRelHandler(mainFeature, relFeatures, warningMessage) {
        try {
            message.loading({
                key,
                duration: 65,
                content: '正在新建关联关系...'
            });
            let { log, warningMessage: wm } = await newRel(mainFeature, relFeatures);
            if (warningMessage || wm) {
                warningMessage = warningMessage && wm ? warningMessage + wm : warningMessage || wm;
                message.warning({ content: warningMessage, duration: 3, key });
            } else {
                message.success({ content: '新建成功', duration: 3, key });
            }
            return log;
        } catch (e) {
            message.warning({ content: '新建关联关系失败：' + e.message, duration: 3, key });
            throw e;
        }
    }

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

    @logDecorator({ operate: '新建关联关系' })
    async addLRLaneDriverRel(type, allFeatures) {
        try {
            message.loading({
                key,
                duration: 65,
                content: '正在新建关联关系...'
            });
            let [mainFeature, relFeature] = allFeatures;
            let specConfig = REL_SPEC_CONFIG.find(config => config.relObjType === type);
            // 查询是否有重复关联关系数据
            await relUniqCheck(mainFeature, relFeature);
            // 根据规格新建关联关系
            let rel = createRelBySpecConfig(specConfig, mainFeature, relFeature);
            // 查询是否有同类型关联关系数据
            let result = await querySameTypeRel(rel);
            let oldRels = [];
            if (result) {
                // 有同类型关系数据时，删除之
                let { rel: oldRel, feature: oldFeature } = result;
                oldRel && oldRels.push(oldRel);
                // 被关联要素加入变更要素集合
                oldFeature && allFeatures.push(oldFeature);
            }
            // 计算需要更新数据
            let log = calcRelChangeLog(allFeatures, [oldRels, [rel]]);
            // 执行数据更新操作
            await updateFeatures(log);

            message.success({ content: '新建成功', duration: 3, key });
            return log;
        } catch (e) {
            message.warning({ content: e.message, duration: 3, key });
            throw e;
        }
    }
}

export default AddRel;
