import React, { lazy } from 'react';
import PrivateRoute from 'src/components/PrivateRoute';

const Demo = lazy(() => import('demo/Index/index'));

export default <PrivateRoute key="Demo" path="/demo-page" component={Demo} />;
