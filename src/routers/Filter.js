import React, { lazy, Suspense } from 'react';

//import PrivateRoute from 'src/components/PrivateRoute'
import { Route } from 'react-router-dom'

const Filter = lazy(() => import('pages/Filter'))

function LazyFilter() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Filter />
        </Suspense>
    );
}

export default (
    //<PrivateRoute key='Home' path='/' component={Home} />
    <Route key="filter" path="/filter" component={LazyFilter} />
)