import React from 'react';
import Router from 'src/router';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
// import '@babel/polyfill';
import 'less/index.less';

const App = () => (
    <ConfigProvider locale={zhCN}>
        <BrowserRouter>
            <Router />
        </BrowserRouter>
    </ConfigProvider>
);

export default App;
