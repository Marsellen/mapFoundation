import React from 'react';
import ToolIcon from 'src/component/common/toolIcon';
import { inject, observer } from 'mobx-react';
import { getFeatureInfo } from 'src/util/vectorUtils';
import 'less/information-modal.less';

@inject('DataLayerStore')
@inject('InformationStore')
@observer
class ChangeInformFeature extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { DataLayerStore } = this.props;
        const { setChangeInformFeatureCallback } = DataLayerStore;
        setChangeInformFeatureCallback(this.changeInformFeatureCallback);
    }

    handleToggle = () => {
        const { DataLayerStore } = this.props;
        if (DataLayerStore.editType !== 'change_inform_feature') {
            DataLayerStore.enterChangeInformFeature();
        }
    };

    changeInformFeatureCallback = result => {
        if (!result || !result[0]) return;
        // const option = getFeatureInfo(result[0]);
        // const { layerName, value: featureId } = option;
        // this.props.form.setFieldsValue({
        //     layer: layerName,
        //     featureId: featureId,
        //     errorType: null,
        //     errorLevel: null,
        //     errorDesc: null
        // });
    };

    render() {
        const {
            DataLayerStore: { editType }
        } = this.props;
        const visible = editType === 'change_inform_feature';
        return (
            <span
                className={`fix_inform_feature ${visible && 'active'}`}
                onClick={this.handleToggle}
            >
                修改形状
                <ToolIcon
                    id="pick-element"
                    {...this.props}
                    visible={visible}
                    icon="xiankuang1"
                    title=""
                    // action={this.handleToggle}
                />
            </span>
        );
    }
}

export default ChangeInformFeature;
