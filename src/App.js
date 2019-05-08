import React from 'react'
import { Switch } from 'react-router-dom'
import Routers from './router'
import './App.css'

class App extends React.Component {
    render() {
        return (
            <Switch>
                {Routers}
            </Switch>
        )
    }
}

export default App;
