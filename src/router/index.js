import React, { lazy, Suspense } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import LoadingPage from 'src/component/common/loadingPage';
import PrivateRoute from 'src/component/common/privateRoute';
import HomeVisiteHistory from 'src/util/visiteHistory/homeVisiteHistory';
import LoginVisitedHistory from 'src/util/visiteHistory/loginVisiteHistory';

const Login = lazy(() => import('src/page/login'));
const Home = lazy(() => import('src/page/home'));
const Board = lazy(() => import('src/page/board'));
const Setting = lazy(() => import('src/page/setting'));
const Search = lazy(() => import('src/page/search'));
const Blank = lazy(() => import('src/page/blank'));

//监听离开页面
window.onpagehide = () => {
    if (document.location.pathname === '/login') {
        console.log('pagehide', '/login');
        LoginVisitedHistory.leavePage();
    }
    if (document.location.pathname === '/') {
        console.log('pagehide', '/');
        HomeVisiteHistory.leavePage();
    }
};

@withRouter
class Routers extends React.Component {
    render() {
        return (
            <Suspense fallback={<LoadingPage />}>
                <Switch>
                    <Route key="Login" path="/login" component={Login} exact />
                    <Route key="Blank" path="/blank" component={Blank} exact />
                    <Route key="Board" path="/board" component={Board} exact />
                    <PrivateRoute key="Setting" path="/setting" component={Setting} exact />
                    <PrivateRoute key="Search" path="/search" component={Search} exact />
                    <PrivateRoute key="Home" path="/" component={Home} exact />
                </Switch>
            </Suspense>
        );
    }
}

export default Routers;
