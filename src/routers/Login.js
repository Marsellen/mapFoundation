import React, { lazy } from 'react';
import { Route } from 'react-router-dom';

const Login = lazy(() => import('src/pages/Login/index'));

export default <Route key="Login" path="/login" component={Login} />;
