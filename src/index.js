import React from 'react';
import ReactDOM from 'react-dom';
import Layout from './layouts/VizLayout';
import './assets/styles/reset.scss';

//offline
//import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render((
    <BrowserRouter>
        <Layout />
    </BrowserRouter>
), document.getElementById('root'));

//offline
//serviceWorker.unregister();