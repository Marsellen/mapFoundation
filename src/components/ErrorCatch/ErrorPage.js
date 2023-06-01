import React from 'react';
import serviceError from 'src/asset/img/500.png';
import './index.less';

const ErrorPage = () => {
    return (
        <div className="error-page">
            <img src={serviceError}></img>
        </div>
    );
};
export default ErrorPage;
