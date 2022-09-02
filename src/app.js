import '@babel/polyfill';
import React from 'react';
import { Provider } from 'mobx-react';
import store from 'src/store';
import Routers from 'src/router';
import 'less/index.less';
import { BrowserRouter } from 'react-router-dom';

const Entry = () => (
    <BrowserRouter>
        <Provider {...store}>
            <Routers />
        </Provider>
    </BrowserRouter>
);

export default Entry;
