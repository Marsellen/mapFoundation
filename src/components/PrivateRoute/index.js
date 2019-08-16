import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

@inject('appStore')
@observer
class PrivateRoute extends React.Component {
    render() {
        const { component, ...rest } = this.props;
        return <Route {...rest} render={this.renderComponent} />;
    }

    renderComponent = props => {
        const { component: Component, appStore } = this.props;
        const { isLogin } = appStore;
        return isLogin ? (
            <Component {...props} />
        ) : (
            <Redirect
                to={{
                    pathname: '/login',
                    state: { from: props.location }
                }}
            />
        );
    };
}

export default PrivateRoute;
