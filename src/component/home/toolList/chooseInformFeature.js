import React from 'react';
import ToolIcon from 'src/component/common/toolIcon';
import { inject, observer } from 'mobx-react';
import { getFeatureInfo } from 'src/util/vectorUtils';

@inject('DataLayerStore')
@inject('InformationStore')
@observer
class ChooseInformFeature extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { DataLayerStore } = this.props;
        const { setChooseInformFeatureCallback } = DataLayerStore;
        setChooseInformFeatureCallback(this.chooseInformFeatureCallback);
    }

    handleToggle = () => {
        const { DataLayerStore } = this.props;
        if (DataLayerStore.editType === 'choose_inform_feature') {
            DataLayerStore.exitChooseInformFeature();
        } else {
            DataLayerStore.enterChooseInformFeature();
        }
    };

    chooseInformFeatureCallback = result => {
        if (!result || !result[0]) return;
        const option = getFeatureInfo(result[0]);
        const { layerName, value: featureId } = option;
        this.props.form.setFieldsValue({
            layer: layerName,
            featureId: featureId,
            errorType: null,
            errorLevel: null,
            errorDesc: null
        });
    };

    render() {
        const {
            DataLayerStore: { editType }
        } = this.props;
        const visible = editType === 'choose_inform_feature';
        return (
            <ToolIcon
                id="pick-element"
                {...this.props}
                visible={visible}
                icon="cuowutuceng"
                title="选取数据"
                action={this.handleToggle}
            />
        );
    }
}

export default ChooseInformFeature;
