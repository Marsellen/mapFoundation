import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import LoadingPage from 'src/components/LoadingPage';
import PrivateRoute from 'src/components/PrivateRoute';

const Login = lazy(() => import('src/pages/Login/index'));
const Home = lazy(() => import('src/pages/Index'));

class Routers extends React.Component {
    render() {
        return (
            <Suspense fallback={<LoadingPage />}>
                <Switch>
                    <PrivateRoute exact key="Home" path="/" component={Home} />
                    <PrivateRoute
                        exact
                        key="HomeSource"
                        path="/source"
                        component={Home}
                    />
                    <Route key="Login" path="/login" component={Login} />
                </Switch>
            </Suspense>
        );
    }
}

export default Routers;