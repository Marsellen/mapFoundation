import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import store from './store';
import Routers from './routers';
import 'less/index.less';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
    <BrowserRouter>
        <Provider {...store}>
            <Routers />
        </Provider>
    </BrowserRouter>,
    document.getElementById('root')
);
