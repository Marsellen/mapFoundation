import React from 'react';
import ToolIcon from 'src/components/ToolIcon';
import { inject, observer } from 'mobx-react';
import { message, Modal } from 'antd';
import { delRel } from 'src/utils/relCtrl/relCtrl';
import AdMessage from 'src/components/AdMessage';

@inject('DataLayerStore')
@inject('AttributeStore')
@inject('OperateHistoryStore')
@observer
class DelRel extends React.Component {
    componentDidMount() {
        const {
            DataLayerStore,
            AttributeStore,
            OperateHistoryStore
        } = this.props;
        DataLayerStore.setDelRelCallback(result => {
            // console.log(result);
            Modal.confirm({
                title: '是否删除关联关系?',
                okText: '确定',
                okType: 'danger',
                cancelText: '取消',
                onOk() {
                    let mainFeature = AttributeStore.getModel();
                    delRel(mainFeature, result)
                        .then(rels => {
                            if (rels.length == 0) {
                                message.warning('没有选中待删除的关联对象', 3);
                                return;
                            }
                            OperateHistoryStore.add({
                                type: 'updateFeatureRels',
                                data: {
                                    rels: {
                                        oldRels: rels,
                                        newRels: []
                                    }
                                }
                            });
                            AttributeStore.fetchRelFeatures();
                            DataLayerStore.clearChoose();
                        })
                        .catch(e => {
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
        let visible = DataLayerStore.editType == 'delRel';
        return (
            <span>
                <ToolIcon
                    icon="shanchuguanxi"
                    title="删除关联关系"
                    action={this.action}
                    disabled={!DataLayerStore.beenPick}
                />
                <AdMessage visible={visible} content={this.content()} />
            </span>
        );
    }

    action = () => {
        const { DataLayerStore } = this.props;
        if (DataLayerStore.editType == 'delRel') return;
        DataLayerStore.delRel();
    };

    content = () => {
        return <label>请从高亮要素中选择要被取消的关联要素</label>;
    };
}

export default DelRel;
