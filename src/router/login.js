import React from 'react'
import { Route } from 'react-router-dom'
import LoadableComponent from 'src/utils/LoadableComponent'

const Login = LoadableComponent(() => import('src/pages/Login/index'))

export default (
    <Route key='Login' path='/login' component={Login} />
)