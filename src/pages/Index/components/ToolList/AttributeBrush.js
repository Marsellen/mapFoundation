import React from 'react';
import ToolIcon from 'src/components/ToolIcon';
import { copyAttributeLines } from 'src/utils/relCtrl/operateCtrl';
import { inject, observer } from 'mobx-react';
import { logDecorator } from 'src/utils/decorator';
import AdMessage from 'src/components/AdMessage';
import { message } from 'antd';

@inject('DataLayerStore')
@inject('AttributeStore')
@inject('TaskStore')
@observer
class AttributeBrush extends React.Component {
    constructor() {
        super();
        this.state = {
            messageVisible: false
        };
    }
    componentDidMount() {
        const { DataLayerStore } = this.props;
        DataLayerStore.setAttributeBrushCallback(this.attributeBrushCallback);
    }
    render() {
        const { DataLayerStore } = this.props;
        const { messageVisible } = this.state;
        let visible = DataLayerStore.editType == 'attribute_brush';

        return (
            <span>
                <ToolIcon
                    id="attribute-brush-btn"
                    icon="shuxingshua"
                    title="属性刷"
                    className="ad-tool-icon"
                    focusClassName="ad-tool-icon-active"
                    visible={visible}
                    action={this.action}
                    disabled={DataLayerStore.brushDisadled}
                />
                <AdMessage visible={messageVisible && visible} content={this.content()} />
            </span>
        );
    }

    action = () => {
        const { DataLayerStore, AttributeStore } = this.props;
        if (DataLayerStore.editType == 'attribute_brush') return;
        if (DataLayerStore.changeUnAble())
            return message.error({
                content: '请先结束当前编辑操作！',
                duration: 3,
                key: 'edit_error'
            });

        AttributeStore.hide();
        AttributeStore.hideRelFeatures();
        DataLayerStore.AttributeBrush();

        this.setState({
            messageVisible: true
        });
    };

    attributeBrushCallback = async (result, event) => {
        if (event.button !== 2) return;
        this.attributeBrush(result, event);
    };

    @logDecorator({ operate: '属性刷' })
    async attributeBrush(result, event) {
        try {
            const { DataLayerStore } = this.props;
            const { TaskStore } = this.props;
            const { activeTask } = TaskStore;
            let editLayer = DataLayerStore.getEditLayer();
            let [[feature], [copyFeature]] = result;
            if (!feature || !copyFeature) {
                throw new Error('未执行数据拷贝赋值！');
            }

            let historyLog = await copyAttributeLines(
                feature,
                copyFeature,
                editLayer.layerName,
                activeTask.processName
            );
            this.setState({
                messageVisible: false
            });
            message.success('完成属性拷贝赋值！', 3);
            return historyLog;
        } catch (e) {
            this.setState({
                messageVisible: false
            });
            message.error(e.message);
            throw e;
        }
    }

    content = () => {
        return <label>选择一个要被自动刷属性的要素，右键完成操作</label>;
    };
}

export default AttributeBrush;
