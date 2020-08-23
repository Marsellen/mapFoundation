import React from 'react';
import ToolIcon from 'src/components/ToolIcon';
import { inject, observer } from 'mobx-react';
import { message } from 'antd';
import { delRel, calcRelChangeLog } from 'src/utils/relCtrl/relCtrl';
import AdMessage from 'src/components/AdMessage';
import { logDecorator } from 'src/utils/decorator';
import AttributeStore from 'src/pages/Index/store/AttributeStore';

import 'less/components/tool-icon.less';

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
        let visible = DataLayerStore.editType == 'delRel';
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

    action = () => {
        const { DataLayerStore } = this.props;
        if (DataLayerStore.editType == 'delRel') return;
        if (DataLayerStore.changeUnAble())
            return message.error({
                content: '请先结束当前编辑操作！',
                duration: 3,
                key: 'edit_error'
            });
        let mainFeature = AttributeStore.getModel();
        if (!mainFeature) return message.error('未选中要素');
        let layerId = mainFeature.layerId;
        let editLayer = DataLayerStore.getEditLayer();
        let editLayerId = editLayer && editLayer.layerId;
        if (layerId !== editLayerId) return;
        let { relFeatures } = AttributeStore;
        if (!relFeatures || relFeatures.length === 0) return message.error('暂无关联要素显示');
        DataLayerStore.selectFormFeatrues(relFeatures);
        DataLayerStore.delRel();
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
            message.success('删除关联关系成功', 3);
            AttributeStore.hideRelFeatures();
            return log;
        } catch (e) {
            message.warning(e.message, 3);
            AttributeStore.hideRelFeatures();
            throw e;
        }
    }
}

export default DelRel;
