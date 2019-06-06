import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import store from './store';
import App from './App';
import 'less/index.less';

//offline
//import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
    <BrowserRouter>
        <Provider {...store}>
            <App />
        </Provider>
    </BrowserRouter>,
    document.getElementById('root')
);

//offline
//serviceWorker.unregister();
