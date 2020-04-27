import React from 'react';
import ToolIcon from 'src/components/ToolIcon';
import { inject, observer } from 'mobx-react';
import { message, Icon, Modal, Button } from 'antd';
import {
    newRel,
    basicCheck,
    createRelBySpecConfig,
    batchAddRels,
    attrRelUniqCheck,
    calcRelChangeLog
} from 'src/utils/relCtrl/relCtrl';
import AdMessage from 'src/components/AdMessage';
import AddLRLaneDriverRel from './AddRelModal/AddLRLaneDriverRel';
import { REL_SPEC_CONFIG } from 'src/config/RelsConfig';
import { logDecorator } from 'src/utils/decorator';

import 'less/components/tool-icon.less';
import './AddRel.less';

@inject('DataLayerStore')
@inject('AttributeStore')
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
        let visible = DataLayerStore.editType == 'newRel';
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
                    title={
                        <span className="text-modal-title">
                            新增关联关系指引
                        </span>
                    }
                    width={465}
                    className="text-modal"
                    visible={this.state.textVisible}
                    onCancel={this.handleCancel}
                    footer={
                        <Button type="primary" onClick={this.handleCancel}>
                            确定
                        </Button>
                    }>
                    <div>
                        <p className="tips">
                            TIPS : 选择要素的顺序必须严格遵守
                        </p>
                        <p className="text-body-title">
                            1、当前可编辑图层：“车道中心线”
                        </p>
                        <p className="text-body-content">
                            (1).
                            一个车道中心线 + 一个或多个某一类obj要素（交通标志牌、交通信号灯、地面导向箭头、地面文字符号）
                            例如：一个“车道中心线”+ 多个“交通标志牌”——可建立多对【车道中心线&交通标志牌关联关系】
                            <br />
                            (2). 一个车道中心线 + 一个道路参考线
                            <br />
                            (3). 一个车道中心线 + 一个车道线
                            <br />
                            (4). 一个车道中心线 + 左侧车道线+右侧车道线
                            <br />
                            (5). 一个驶入车道中心线 + 一个驶出车道中心线
                        </p>
                        <p className="text-body-title">
                            2、当前可编辑图层：“道路参考线”{' '}
                        </p>
                        <p className="text-body-content">
                            (1). 一个道路参考线 + 一个或多个车道属性变化点
                            <br />
                            (2). 一个道路参考线 + 一个或多个车道中心线
                            例如：一个“道路参考线”+ 多个“车道中心线”——可建立多对【车道中心线&道路参考线属性关系】
                            <br />
                            (3). 一个驶入道路参考线 + 一个驶出道路参考线
                            <br />
                        </p>
                        <p className="text-body-title">
                            3、当前可编辑图层：“停止位置”、“面状标识物”、“交通标志牌”、“交通信号灯”
                            一个当前编辑图层的obj要素 + 一个或多个车道中心线
                        </p>
                        <p className="text-body-content">
                            (1).例如：一个“停止位置”+ 多个“车道中心线”——可建立多对【车道中心线&停止位置关联关系】
                        </p>
                        <p className="text-body-title">
                            4、当前可编辑图层：“地面导向箭头”、“地面文字符号”、“车道属性变化点”
                        </p>
                        <p className="text-body-content">
                            (1).
                            一个当前编辑图层的obj要素（地面导向箭头、地面文字符号） + 一个车道中心线
                            <br />
                            (2).
                            一个当前编辑图层的obj要素（车道属性变化点） + 一个道路参考线
                        </p>
                    </div>
                </Modal>
            </span>
        );
    }

    action = () => {
        const { DataLayerStore, AttributeStore } = this.props;
        if (DataLayerStore.editType == 'newRel') return;
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
                <Icon type="info-circle" onClick={this.renderTips} />{' '}
                请按顺序选择关联对象
            </label>
        );
    };

    newRelCallBack = async (result, event) => {
        if (event.button !== 2) return false;
        this.newRel(result);
    };

    @logDecorator({ operate: '新建关联关系', onlyRun: true })
    async newRel(result) {
        try {
            const { DataLayerStore } = this.props;
            let [mainFeature, ...relFeatures] = result;
            let layerName = DataLayerStore.getEditLayer().layerName;
            let warningMessage = await basicCheck(
                mainFeature,
                relFeatures,
                layerName
            );
            if (this.isAddLRLaneDriverRel(mainFeature, relFeatures)) {
                this.addLRLaneDriverRelModal.show([
                    mainFeature,
                    relFeatures[0]
                ]);
            } else {
                this.comfirmNewRel(mainFeature, relFeatures, warningMessage);
            }
        } catch (e) {
            message.warning('新建关联关系失败：' + e.message);
            throw e;
        }
    }

    comfirmNewRel = (mainFeature, relFeatures, warningMessage) => {
        const { DataLayerStore } = this.props;
        Modal.confirm({
            title: '是否新建关联关系?',
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            onOk: this.newRelHandler.bind(
                this,
                mainFeature,
                relFeatures,
                warningMessage
            ),
            onCancel() {
                DataLayerStore.exitEdit();
            }
        });
    };

    @logDecorator({ operate: '新建关联关系' })
    async newRelHandler(mainFeature, relFeatures, warningMessage) {
        try {
            let rels = await newRel(mainFeature, relFeatures);
            let log = calcRelChangeLog(
                [mainFeature, ...relFeatures],
                [[], rels]
            );
            if (warningMessage) {
                message.warning(warningMessage);
            } else {
                message.success('新建成功');
            }
            return log;
        } catch (e) {
            message.warning('新建关联关系失败：' + e.message, 3);
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
    async addLRLaneDriverRel(type, options) {
        try {
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
            let log = calcRelChangeLog([mainFeature, relFeature], [[], [rel]]);
            message.success('新建成功');
            return log;
        } catch (e) {
            message.warning('与左右车道线新建关联关系失败：' + e.message);
            throw e;
        }
    }
}

export default AddRel;
