import React, { lazy, Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import PageLoading from 'src/components/PageLoading';
import Home from 'src/pages/Home';
import Layout from 'src/pages/Layout';

// 路由懒加载
const lazyLoad = path => {
    const Comp = lazy(() => import(`src/pages/${path}`));
    return (
        <Suspense fallback={<PageLoading />}>
            <Layout>
                <Comp />
            </Layout>
        </Suspense>
    );
};
const routes = [
    {
        path: '/',
        name: '首页',
        element: <Layout />
    },
    {
        path: '/home',
        name: '首页',
        element: lazyLoad('Home')
    },
    {
        path: '/board',
        name: 'Board',
        element: lazyLoad('Board')
    },
    // {
    //     path: '*',
    //     element: lazyLoad('Home')
    // }
];

const Routers = () => {
    return useRoutes(routes);
};

export default Routers;
