import React from 'react';
import { Breadcrumb } from 'antd';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function Router(props) {
    return <Routes>{props.routes.map(config => createRoute(config))}</Routes>;
}

/**
 * 生成单个路由
 * @param {*} app
 * @param {*} routeConfig
 */
const createRoute = routeConfig => {
    const { path, redirect } = routeConfig;

    const routeProps = {
        key: path,
        path,
        element: RouterGuard(routeConfig)
    };

    if (redirect) {
        return [
            <Navigate key={`${path}_redirect`} exact from={path} to={redirect} />,
            <Route {...routeProps} />
        ];
    }
    return <Route {...routeProps} />;
};

function RouterGuard(routeConfig) {
    // const { routeConfig, ...rest } = props;
    const { element: Comp, childRoutes, title, breadcrumb } = routeConfig;

    function renderContent() {
        if (breadcrumb?.length) {
            return (
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <Breadcrumb
                        style={{ color: 'rgba(0, 0, 0, 0.5)', fontSize: 12, lineHeight: '36px' }}
                    >
                        {breadcrumb.map(text => (
                            <Breadcrumb.Item>{text}</Breadcrumb.Item>
                        ))}
                    </Breadcrumb>
                    <div style={{ flex: 1, height: 0 }}>
                        <Comp routeConfig={routeConfig}>
                            {childRoutes && <Router routes={childRoutes} />}
                        </Comp>
                    </div>
                </div>
            );
        }
        debugger;
        return (
            <Comp routeConfig={routeConfig}>{childRoutes && <Router routes={childRoutes} />}</Comp>
        );
    }

    return (
        <>
            {title && (
                <Helmet>
                    <title>{title}</title>
                    <meta name="description" content="" />
                </Helmet>
            )}
            {renderContent()}
        </>
    );
}
