import React from 'react';
import ToolIcon from 'src/components/ToolIcon';
import { inject, observer } from 'mobx-react';
import { getFeatureInfo } from 'src/utils/vectorUtils';

@inject('DataLayerStore')
@observer
class ChooseErrorFeature extends React.Component {
    componentDidMount() {
        const { DataLayerStore } = this.props;
        const { setErrorLayerCallback } = DataLayerStore;
        setErrorLayerCallback(this.errorLayerCallback);
    }

    handleToggle = () => {
        const {
            DataLayerStore: { QCAttrModal, chooseErrorLayer, editType, exitEdit }
        } = this.props;

        if (editType === 'error_layer') {
            exitEdit();
        } else {
            QCAttrModal();
            chooseErrorLayer();
        }
    };

    errorLayerCallback = result => {
        if (!result || !result[0]) return;
        const option = getFeatureInfo(result[0]);
        const { layerName, value: featureId } = option;
        this.props.form.setFieldsValue({
            fileName: layerName,
            featId: featureId,
            errorType: 0,
            fieldName: null,
            errorDesc: null
        });
    };

    render() {
        const {
            DataLayerStore: { editType }
        } = this.props;
        const visible = editType === 'error_layer';
        return (
            <ToolIcon
                {...this.props}
                visible={visible}
                icon="cuowutuceng"
                title="选取错误数据"
                action={this.handleToggle}
            />
        );
    }
}

export default ChooseErrorFeature;
