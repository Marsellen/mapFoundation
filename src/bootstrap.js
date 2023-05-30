import React from 'react';
import ReactDOM from 'react-dom';
import Routers from 'src/router';
import { BrowserRouter } from 'react-router-dom';
// import '@babel/polyfill';
import 'less/index.less';

const App = () => (
    <BrowserRouter>
        <Routers />
    </BrowserRouter>
);
ReactDOM.render(<App />, document.querySelector('#root'));
