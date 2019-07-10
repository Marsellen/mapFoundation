import React from 'react';
import { inject, observer } from 'mobx-react';

@inject('AttributeStore')
@observer
class PictureShowView extends React.Component {
    render() {
        // const { PictureShowStore } = this.props;
        // const { visible } = PictureShowStore;
        return (
            <div>

            </div>
        );
    }
}
export default PictureShowView;