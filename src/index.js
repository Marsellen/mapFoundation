import '@babel/polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'mobx-react'
import { LocaleProvider } from 'antd'
import zh_CN from 'antd/lib/locale-provider/zh_CN'
import store from './store'
import registerServiceWorker from './registerServiceWorker';

//打包时，用的HashRouter并加上了basename，因为放在服务器的二级目录下
ReactDOM.render(
    <BrowserRouter>
        <LocaleProvider locale={zh_CN}>
            <Provider {...store}>
                <App />
            </Provider>
        </LocaleProvider>
    </BrowserRouter>,
    document.getElementById('root'));
registerServiceWorker();
