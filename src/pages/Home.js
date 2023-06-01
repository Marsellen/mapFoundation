import React from 'react';
import { Layout, Spin } from 'antd';
import { Link } from 'react-router-dom';
import 'less/home.less';

const { Header } = Layout;

class Home extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {}

    render() {
        return <div className="">Hellow!</div>;
    }
}

export default Home;
