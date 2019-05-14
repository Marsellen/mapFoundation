import React from 'react';
import Footer from 'layouts/Footer';

import 'styles/viz.scss'

import { Switch, Link } from 'react-router-dom'
import RouterList from 'routers/';

function App() {
  return (
    <div>
      <div className="app">
        <aside>
          <div className="logo">
            Ecarx
        </div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/file">File</Link>
            </li>
            <li>
              <Link to="/filter">Filter</Link>
            </li>
            <li>
              <Link to="/tools">Tools</Link>
            </li>
          </ul>
        </aside>
        <main>
          <Switch>
            {RouterList}
          </Switch>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default App;
