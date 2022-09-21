import React from 'react';
import { inject, observer } from 'mobx-react';
import AttributesModal from './attributesModal';
import QCMarkerModal from './qualityMarker/qcMarkerModal';
import InformationModal from './informationMark/informationModal';
import RightMenuModal from 'src/component/home/rightMenuModal';
import MultimediaView from './multimediaView';
import 'less/viz-component.less';
import BatchAssignModal from './batchAssignModal';
import BatchBuildModal from 'src/component/home/toolList/batchBuild/batchBuildModal';
@inject('mapStore')
@observer
class VizComponentXGIS extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount = async () => {
        const { mapStore } = this.props;
        if (!window.map) mapStore.init();
    };

    componentDidUpdate() {}

    render() {
        return (
            <React.Fragment>
                <MultimediaView />
                <AttributesModal />
                <RightMenuModal />
                <BatchAssignModal />
                <QCMarkerModal />
                <InformationModal />
                <BatchBuildModal />
            </React.Fragment>
        );
    }
}

export default VizComponentXGIS;
