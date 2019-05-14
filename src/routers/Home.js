import React, { lazy, Suspense } from 'react';
//import PrivateRoute from 'src/components/PrivateRoute'
import { Route } from 'react-router-dom'

const Home = lazy(() => import('pages/Home'))

function LazyHome() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Home />
        </Suspense>
    );
}

export default (
    //<PrivateRoute key='Home' path='/' component={Home} />
    <Route key="Home" exact path="/" component={LazyHome} />
)