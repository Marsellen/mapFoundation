import React, { lazy } from 'react';
import PrivateRoute from 'src/components/PrivateRoute';

const Home = lazy(() => import('src/pages/Index'));

export default <PrivateRoute exact key="Home" path="/" component={Home} />;
