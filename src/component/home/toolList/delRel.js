import React from 'react';
import ToolIcon from 'src/component/common/toolIcon';
import { inject, observer } from 'mobx-react';
import { message } from 'antd';
import { delRel, calcRelChangeLog } from 'src/util/relCtrl/relCtrl';
import AdMessage from 'src/component/common/adMessage';
import { logDecorator, editLock } from 'src/util/decorator';
import AttributeStore from 'src/store/home/attributeStore';

import 'less/tool-icon.less';

@inject('DataLayerStore')
@observer
class DelRel extends React.Component {
    componentDidMount() {
        const { DataLayerStore } = this.props;
        DataLayerStore.setDelRelCallback((result, event) => {
            if (event.button !== 2) return false;
            this.delRel(result);
        });
    }

    render() {
        const { DataLayerStore } = this.props;
        let visible = DataLayerStore.editType == 'del_rel';
        return (
            <span>
                <ToolIcon
                    id="del-rel-btn"
                    icon="shanchuguanxi"
                    title="删除关联关系"
                    className="ad-tool-icon"
                    focusClassName="ad-tool-icon-active"
                    visible={visible}
                    action={this.action}
                    disabled={!DataLayerStore.beenPick}
                />
                <AdMessage visible={visible} content={this.content()} />
            </span>
        );
    }

    @editLock
    action = () => {
        const { DataLayerStore } = this.props;
        if (DataLayerStore.editType == 'del_rel') return;
        if (DataLayerStore.changeUnAble())
            return message.error({
                content: '请先结束当前编辑操作！',
                duration: 3,
                key: 'edit_error'
            });
        let mainFeature = AttributeStore.getModel();
        if (!mainFeature) return message.error('未选中要素');
        let layerId = mainFeature.layerId;
        let editLayer = DataLayerStore.getAdEditLayer();
        let editLayerId = editLayer && editLayer.layerId;
        if (layerId !== editLayerId) return;
        let { relFeatures } = AttributeStore;
        if (!relFeatures || relFeatures.length === 0) return message.error('暂无关联要素显示');
        DataLayerStore.selectFormFeatrues(relFeatures);
        DataLayerStore.delRel();
        AttributeStore.hide('other_close');
    };

    content = () => {
        return <label>请从高亮要素中选择要被取消的关联要素</label>;
    };

    @logDecorator({ operate: '删除关联关系' })
    async delRel(result) {
        try {
            if (result.length < 2) {
                throw new Error('没有选中待删除的关联对象');
            }
            let [mainFeature, ...relFeatures] = result;
            let rels = await delRel(mainFeature, relFeatures);
            let log = calcRelChangeLog(result, [rels, []]);
            AttributeStore.hideRelFeatures();
            return log;
        } catch (e) {
            AttributeStore.hideRelFeatures();
            throw e;
        }
    }
}

export default DelRel;