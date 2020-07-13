import React from 'react';
import ToolIcon from 'src/components/ToolIcon';
import { inject, observer } from 'mobx-react';
import { getFeatureInfo } from 'src/utils/vectorUtils';
import { getAllChooseLayersExByName } from 'src/utils/vectorUtils';

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
            DataLayerStore: { QCAttrModal, chooseErrorLayer, editType, exitEdit, setTargetLayers }
        } = this.props;

        if (editType === 'error_layer') {
            exitEdit();
            //只能选除标记图层、质检标注以外的图层
            const layers = getAllChooseLayersExByName('AD_Map_QC');
            setTargetLayers(layers);
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
