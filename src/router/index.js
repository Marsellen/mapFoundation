import React, { lazy, Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import PageLoading from 'src/components/PageLoading';
import ErrorCatch from 'src/components/ErrorCatch';
import Layout from 'src/pages/Layout';

const Home = lazy(() => import('src/pages/Home'));
const Ultron = lazy(() => import('ultron/App'));
const OneMap = lazy(() => import('oneMap/App'));
const lazyLoad = children => {
    return (
        <Suspense fallback={<PageLoading />}>
            <ErrorCatch>{children}</ErrorCatch>
        </Suspense>
    );
};

const routes = [
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '/oneMap/*',
                name: 'oneMap',
                element: lazyLoad(<OneMap />)
            },
            {
                path: '/ultron/*',
                name: 'Ultron',
                element: lazyLoad(<Ultron />)
            },
            {
                path: '*',
                element: lazyLoad(<Home />)
            }
        ]
    }
];

const Routers = () => {
    return useRoutes(routes);
};

export default Routers;
