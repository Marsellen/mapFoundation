import React from 'react';
import { Layout, Spin } from 'antd';
import { Link } from 'react-router-dom';
import oneMap from 'oneMap/app';
import 'less/home.less';

const { Header } = Layout;

class Home extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {}

    render() {
        return (
            <div className="">
                {/* <oneMap /> */}
            </div>
        );
    }
}

export default Home;
