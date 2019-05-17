import React from 'react';
import { ADVIS } from 'addis-viz-sdk';

class VizCompnent extends React.Component {
    componentDidMount() {
        const div = document.getElementById('viz');
        const adVIS = new ADVIS(div);
        window.adVIS = adVIS;
        adVIS.loadPointCloud('http://10.43.16.17:8888/cloud.js');
        
    }

    render() {
        return <div id="viz" style={Styles.viz} />;
    }
}

const Styles = {
    viz: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0
    }
};

export default VizCompnent;
