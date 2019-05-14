import React from 'react'
import PrivateRoute from 'src/components/PrivateRoute'
import LoadableComponent from 'src/utils/LoadableComponent'

const Demo = LoadableComponent(() => import('demo/Index/index'))
//import Home from 'src/pages/Index'

export default (
    <PrivateRoute key='Demo' path='/demo-page' component={Demo} />
)