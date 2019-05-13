import React from 'react'
import PrivateRoute from 'src/components/PrivateRoute'
import LoadableComponent from 'src/utils/LoadableComponent'

//const Home = LoadableComponent(() => import('src/pages/Index'))
import Home from 'src/pages/Index'

export default (
    <PrivateRoute key='Home' path='/' component={Home} />
)