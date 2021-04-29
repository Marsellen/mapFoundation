import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import LoadingPage from 'src/component/common/loadingPage';
import PrivateRoute from 'src/component/common/privateRoute';

const Login = lazy(() => import('src/page/login'));
const Home = lazy(() => import('src/page/home'));
const Manage = lazy(() => import('src/page/manage'));
const Search = lazy(() => import('src/page/search'));
const Blank = lazy(() => import('src/page/blank'));

class Routers extends React.Component {
    render() {
        return (
            <Suspense fallback={<LoadingPage />}>
                <Switch>
                    <Route key="Login" path="/login" component={Login} />
                    <Route key="Blank" path="/blank" component={Blank} />
                    <PrivateRoute key="Manage" path="/manage" component={Manage} />
                    <PrivateRoute key="Search" path="/search" component={Search} />
                    <PrivateRoute key="Home" path="/" component={Home} />
                </Switch>
            </Suspense>
        );
    }
}

export default Routers;
