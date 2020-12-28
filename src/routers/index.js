import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import LoadingPage from 'src/components/LoadingPage';
import PrivateRoute from 'src/components/PrivateRoute';

const Login = lazy(() => import('src/pages/Login'));
const Home = lazy(() => import('src/pages/Index'));
const Manage = lazy(() => import('src/pages/Manage'));
const Search = lazy(() => import('src/pages/Search'));
const Blank = lazy(() => import('src/pages/Blank'));

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
