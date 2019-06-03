import React from 'react';
import { Tooltip, Icon } from 'antd';

class Tool extends React.Component {
    render() {
        return (
            <div>
                <Tooltip placement="right" title="新建线">
                    <Icon
                        type="line"
                        style={Styles.lineIcon}
                        onClick={this.distanceAction}
                    />
                </Tooltip>
            </div>
        );
    }

    distanceAction = () => {
        // this.measuringTool.startInsertion({
        //     showDistances: true,
        //     showArea: false,
        //     closed: false,
        //     name: 'Distance'})

        let point1 = new THREE.Vector3(479191, 3337401, 380);
        let point2 = new THREE.Vector3(479291, 3337501, 380);
        let geometry = new THREE.Object3D();
        geometry.add(point1);
        geometry.add(point2);
        this.viewer.scene.scene.add(geometry);
    };
}

const Styles = {
    lineIcon: {
        color: '#fff',
        fontSize: 18,
        margin: 10
    }
};

export default Tool;
