import React from 'react';
import ToolIcon from 'src/components/ToolIcon';
import { inject, observer } from 'mobx-react';
import { ATTR_REL_DATA_SET } from 'src/config/RelsConfig';

@inject('taskStore')
@inject('OperateHistoryStore')
@inject('RelStore')
@inject('AttrStore')
@observer
class Save extends React.Component {
    render() {
        const { OperateHistoryStore } = this.props;
        let { currentNode, savedNode } = OperateHistoryStore;
        let shouldSave = currentNode > savedNode;
        return (
            <ToolIcon
                icon="baocun"
                title="保存"
                disabled={!shouldSave}
                action={this.action}
            />
        );
    }

    action = () => {
        const {
            taskStore,
            OperateHistoryStore,
            RelStore,
            AttrStore
        } = this.props;
        let vectorData = map.getLayerManager().getAllVectorData();
        let attrRels = vectorData.features.filter(features =>
            ATTR_REL_DATA_SET.includes(features.name)
        );
        Promise.all([RelStore.exportRel(), AttrStore.export()]).then(result => {
            let [rels, attrs] = result;
            let relData = {
                features: attrRels.concat(rels),
                type: 'FeatureCollection',
                properties: map.getLayerManager().layerGroup.properties
            };
            let attrData = {
                features: attrs,
                type: 'FeatureCollection',
                properties: map.getLayerManager().layerGroup.properties
            };
            taskStore
                .submit({
                    vectorData,
                    relData,
                    attrData
                })
                .then(() => {
                    OperateHistoryStore.save();
                });
        });
    };
}

export default Save;
