import React from 'react';
import ToolIcon from 'src/components/ToolIcon';
import { inject, observer } from 'mobx-react';
import { getFeatureInfo } from 'src/utils/vectorUtils';

@inject('DataLayerStore')
@observer
class ChooseErrorFeature extends React.Component {
    constructor(props) {
        super(props);
        this.editType = null;
    }

    componentDidMount() {
        const { DataLayerStore } = this.props;
        const { setChooseErrorFeatureCallback } = DataLayerStore;
        setChooseErrorFeatureCallback(this.chooseErrorFeatureCallback);
    }

    handleToggle = () => {
        const { DataLayerStore } = this.props;
        if (DataLayerStore.editType === 'choose_error_feature') {
            DataLayerStore.setEditType(this.editType);
            DataLayerStore.removeCur();
        } else {
            this.editType = DataLayerStore.editType;
            DataLayerStore.setEditType('choose_error_feature');
            DataLayerStore.errorLayer();
        }
    };

    chooseErrorFeatureCallback = result => {
        if (!result || !result[0]) return;
        const option = getFeatureInfo(result[0]);
        const { layerName, value: featureId } = option;
        this.props.form.setFieldsValue({
            fileName: layerName,
            featId: featureId,
            errorDesc: null,
            errContent: null,
            errorType: null,
            fieldName: null,
            errLevel: null,
            editDesc: null
        });
    };

    render() {
        const {
            DataLayerStore: { editType }
        } = this.props;
        const visible = editType === 'choose_error_feature';
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
