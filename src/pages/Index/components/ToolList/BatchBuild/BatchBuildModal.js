import React from 'react';
import { observer, inject } from 'mobx-react';
import BatchBuildFeature from 'src/pages/Index/components/ToolList/BatchBuild/BatchBuildFeature';

const ENABLE_EDIT_TYPE = ['batch_build', 'meature_distance_2'];

@inject('DataLayerStore')
@observer
class BatchBuildModal extends React.Component {
    render() {
        const { editType } = this.props.DataLayerStore;
        const visible = ENABLE_EDIT_TYPE.includes(editType);
        return visible && <BatchBuildFeature />;
    }
}

export default BatchBuildModal;
