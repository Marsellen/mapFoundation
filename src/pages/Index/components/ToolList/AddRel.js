import React from 'react';
import ToolIcon from 'src/components/ToolIcon';
import { inject, observer } from 'mobx-react';
import { message, Icon, Modal } from 'antd';
import { newRel } from 'src/utils/relCtrl/relCtrl';
import AdMessage from 'src/components/AdMessage';
import './AddRel.less';

@inject('DataLayerStore')
@inject('OperateHistoryStore')
@observer
class AddRel extends React.Component {
    componentDidMount() {
        const { DataLayerStore, OperateHistoryStore } = this.props;
        DataLayerStore.setNewRelCallback(result => {
            // console.log(result);
            Modal.confirm({
                title: '是否新建关联关系?',
                okText: '确定',
                okType: 'danger',
                cancelText: '取消',
                onOk() {
                    let layerName = DataLayerStore.getEditLayer().layerName;
                    newRel(result, layerName)
                        .then(rels => {
                            OperateHistoryStore.add({
                                type: 'updateFeatureRels',
                                data: {
                                    rels: {
                                        oldRels: [],
                                        newRels: rels
                                    }
                                }
                            });
                            DataLayerStore.clearChoose();
                        })
                        .catch(e => {
                            console.log(e);
                            message.warning(e.message, 3);
                        });
                },
                onCancel() {
                    DataLayerStore.clearChoose();
                }
            });
        });
    }

    render() {
        const { DataLayerStore } = this.props;
        let visible = DataLayerStore.editType == 'newRel';
        return (
            <span>
                <ToolIcon
                    icon="xinzengguanxi"
                    title="新增关联关系"
                    action={this.action}
                />
                <AdMessage visible={visible} content={this.content()} />
            </span>
        );
    }

    action = () => {
        const { DataLayerStore } = this.props;
        if (DataLayerStore.editType == 'newRel') return;
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
                            &emsp;6). 最多只允许建立两类要素之间的关联关系
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
                            &emsp;1). 一个车道中心线+一个地面导向箭头
                            <br />
                            &emsp;2). 一个车道中心线+一个地面文字符号
                            <br />
                            &emsp;3). 一个道路参考线+一个车道标记点
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
}

export default AddRel;
