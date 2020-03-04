import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import LoadingPage from 'src/components/LoadingPage';
import PrivateRoute from 'src/components/PrivateRoute';

const Home = lazy(() => import('src/pages/Index'));
const Login = lazy(() => import('src/pages/Login'));
const Blank = lazy(() => import('src/pages/Blank'));

class Routers extends React.Component {
    render() {
        return (
            <Suspense fallback={<LoadingPage />}>
                <Switch>
                    <Route key="Login" path="/login" component={Login} />
                    <Route key="Blank" path="/blank" component={Blank} />
                    <PrivateRoute key="Home" path="/" component={Home} />
                </Switch>
            </Suspense>
        );
    }
}

export default Routers;
