import React from 'react';
import ToolIcon from 'src/components/ToolIcon';
import { inject, observer } from 'mobx-react';
import { message, Button } from 'antd';

@inject('DataLayerStore')
@observer
class AddRel extends React.Component {
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
        DataLayerStore.newRel(result => {
            console.log(result);
        });
        message.open({
            content: this.content(),
            duration: 0
        });
    };

    content = () => {
        const { DataLayerStore } = this.props;
        let visible = DataLayerStore.worker.ready;
        return (
            <div>
                <label>请选择一条车道中心线</label>
                {visible && (
                    <Button
                        key={DataLayerStore.updateKey}
                        style={{ marginLeft: 16 }}
                        size="small">
                        下一步
                    </Button>
                )}
            </div>
        );
    };
}

export default AddRel;
