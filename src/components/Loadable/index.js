import React from 'react';
import loadable from '@loadable/component';
import PageLoading from '../PageLoading';

export default loader => {
    const Component = loadable(loader, {
        fallback: <PageLoading />
    });
    return props => <Component {...props} />;
};
