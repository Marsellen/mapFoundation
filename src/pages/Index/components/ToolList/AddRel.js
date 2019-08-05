import React from 'react';
import ToolIcon from 'src/components/ToolIcon';
import { inject, observer } from 'mobx-react';
import { message } from 'antd';
import { newRel } from 'src/utils/relCtrl/relCtrl';
import AdMessage from 'src/components/AdMessage';

@inject('DataLayerStore')
@observer
class AddRel extends React.Component {
    componentDidMount() {
        const { DataLayerStore } = this.props;
        DataLayerStore.setNewRelCallback(result => {
            console.log(result);
            let layerName = DataLayerStore.getEditLayer().layerName;
            newRel(result, layerName)
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
        let visible = DataLayerStore.editType == 'newRel';
        return (
            <span>
                <ToolIcon
                    icon="xiankuang1"
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

    content = () => {
        return <label>请按顺序选择关联对象</label>;
    };
}

export default AddRel;
