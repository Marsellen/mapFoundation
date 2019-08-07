import React from 'react';
import ToolIcon from 'src/components/ToolIcon';
import { inject, observer } from 'mobx-react';
import { message } from 'antd';
import { delRel } from 'src/utils/relCtrl/relCtrl';
import AdMessage from 'src/components/AdMessage';

@inject('DataLayerStore')
@inject('AttributeStore')
@inject('OperateHistoryStore')
@observer
class DelRel extends React.Component {
    componentDidMount() {
        const { DataLayerStore, AttributeStore } = this.props;
        DataLayerStore.setDelRelCallback(result => {
            console.log(result);
            let mainFeature = AttributeStore.getModel();
            delRel(mainFeature, result)
                .then(() => {
                    DataLayerStore.clearChoose();
                })
                .catch(e => {
                    message.warning(e.message, 3);
                });
        });
    }

    render() {
        const { DataLayerStore } = this.props;
        let visible = DataLayerStore.editType == 'delRel';
        return (
            <span>
                <ToolIcon
                    icon="xiankuang1"
                    title="删除关联关系"
                    action={this.action}
                    disabled={!DataLayerStore.beenPick}
                />
                <AdMessage visible={visible} content={this.content()} />
            </span>
        );
    }

    action = () => {
        const {
            DataLayerStore,
            AttributeStore,
            OperateHistoryStore
        } = this.props;
        if (DataLayerStore.editType == 'delRel') return;
        let rels = AttributeStore.rels;
        DataLayerStore.delRel(rels).then(() => {
            OperateHistoryStore.add({
                type: 'updateFeatureRels',
                data: {
                    rels: {
                        oldRels: rels,
                        newRels: []
                    }
                }
            });
        });
    };

    content = () => {
        return <label>请从高亮要素中选择要被取消的关联要素</label>;
    };
}

export default DelRel;
