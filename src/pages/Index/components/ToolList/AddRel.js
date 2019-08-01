import React from 'react';
import ToolIcon from 'src/components/ToolIcon';
import { inject, observer } from 'mobx-react';
import { message } from 'antd';
import newRel from 'src/utils/relCtrl/newRelCtrl';

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
                    message.destroy();
                    DataLayerStore.clearChoose();
                })
                .catch(e => {
                    message.warning(e.message, 1);
                });
        });
    }

    render() {
        return (
            <ToolIcon
                icon="xiankuang1"
                title="新增关联关系"
                action={this.action}
            />
        );
    }

    action = () => {
        const { DataLayerStore } = this.props;
        if (DataLayerStore.editType == 'newRel') return;
        DataLayerStore.newRel();
        message.open({
            content: this.content(),
            duration: 0
        });
    };

    content = () => {
        return <label>请按顺序选择关联对象</label>;
    };
}

export default AddRel;
