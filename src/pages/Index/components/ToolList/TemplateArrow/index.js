import React from 'react';
import { inject, observer } from 'mobx-react';
import ToolIcon from 'src/components/ToolIcon';
import { editLock } from 'src/utils/decorator';
import AttributeStore from 'src/pages/Index/store/AttributeStore';
import TemplateModal from './TemplateModal';
import AdMessage from 'src/components/AdMessage';
import { clacTempArrow } from 'src/utils/map/utils';

@inject('DataLayerStore')
@observer
class TemplateArrow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        const { DataLayerStore } = this.props;
        DataLayerStore.setNewTemplateArrowCallback(this.created);
    }

    render() {
        const { DataLayerStore } = this.props;
        let visible = DataLayerStore.editType == 'new_template_arrow';
        return (
            <div id="add-template-arrow-btn" className="flex-1" onClick={this.action}>
                <ToolIcon icon="huizhimubanjiantou" />
                <div>绘制模板箭头</div>
                <AdMessage visible={visible && DataLayerStore.isMessage} content={this.content()} />
                <TemplateModal visible={visible} onChange={this.onChange} />
            </div>
        );
    }

    @editLock
    action = () => {
        const { DataLayerStore } = this.props;
        if (DataLayerStore.editType == 'new_template_arrow') return;
        AttributeStore.hide();
        AttributeStore.hideRelFeatures();
        DataLayerStore.newTemplateArrow();
    };

    content = () => {
        return (
            <label>
                沿箭头轮廓按“下边线-&gt;右下角-&gt;右边线”的顺序依次选取3个点，点击右键完成绘制
            </label>
        );
    };

    created = result => {
        const { template } = this.state;
        if (!template) {
            throw new Error('未选中模板');
        }
        let coordinates = clacTempArrow(
            result.data.geometry.coordinates[0],
            template.geometry.coordinates[0]
        );
        result.data.geometry.coordinates[0] = coordinates;
        if (template.templateProperties) {
            result.data.properties.ARR_DIRECT = template.templateProperties;
        }
        return result;
    };

    onChange = template => {
        this.setState({ template });
    };
}

export default TemplateArrow;
