import React, { lazy, Suspense } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import LoadingPage from 'src/component/common/loadingPage';
import PrivateRoute from 'src/component/common/privateRoute';
import HomeVisiteHistory from 'src/util/visiteHistory/homeVisiteHistory';
import LoginVisitedHistory from 'src/util/visiteHistory/loginVisiteHistory';

const Login = lazy(() => import('src/page/login'));
const Home = lazy(() => import('src/page/home'));
const Setting = lazy(() => import('src/page/setting'));
const Search = lazy(() => import('src/page/search'));
const Blank = lazy(() => import('src/page/blank'));

//监听访问页面
window.onpageshow = () => {
    if (document.location.pathname === '/login') {
        console.log('pageshow', 'login');
        LoginVisitedHistory.enterPage();
    }
    if (document.location.pathname === '/') {
        console.log('pageshow', '/');
        HomeVisiteHistory.enterPage();
    }
};

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
    constructor(props) {
        super(props);
        //监听react路由的变化，
        //因为react router不能记住上一个路由，所以这里只处理进入页面的逻辑，在跳转处分别处理退出页面的逻辑
        this.props.history.listen(route => {
            console.log('route?.state?.from?.pathName', route);
            if (route?.pathname === '/login') {
                console.log('enterPage', '/login');
                LoginVisitedHistory.enterPage();
            }
            if (route?.pathname === '/') {
                console.log('enterPage', '/');
                HomeVisiteHistory.enterPage();
            }
        });
    }

    render() {
        return (
            <Suspense fallback={<LoadingPage />}>
                <Switch>
                    <Route key="Login" path="/login" component={Login} />
                    <Route key="Blank" path="/blank" component={Blank} />
                    <PrivateRoute key="Setting" path="/setting" component={Setting} />
                    <PrivateRoute key="Search" path="/search" component={Search} />
                    <PrivateRoute key="Home" path="/" component={Home} />
                </Switch>
            </Suspense>
        );
    }
}

export default Routers;
