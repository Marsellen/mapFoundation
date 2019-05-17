import React from 'react';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

class LoadingPage extends React.Component {
    //类似github页面加载的那个加载条
    componentDidMount() {
        NProgress.start();
    }
    componentWillUnmount() {
        NProgress.done();
    }
    render() {
        return <div />;
    }
}

export default LoadingPage;
