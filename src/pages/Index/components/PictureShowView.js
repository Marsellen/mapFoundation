import React from 'react';
import { inject, observer } from 'mobx-react';

@inject('taskStore')
@inject('PictureShowStore')
@observer
class PictureShowView extends React.Component {
    render() {activeTaskId
        const { PictureShowStore, taskStore } = this.props;
        const { picData } = PictureShowStore;
        const { activeTaskId } = taskStore;

        return (
            <div className="img-banner">
                <img src={`${activeTaskId}/tracks/middle/${picData}`} />
            </div>
        );
    }
}
export default PictureShowView;
