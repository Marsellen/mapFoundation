import React from 'react';
import ResourceLayer from './ResourceLayer';
import DataLayer from './DataLayer';
import History from './History';
import Task from './Task';

export default [
    <ResourceLayer key="tool" siderIndex={'resource-layer'} />,
    <DataLayer key="layer" siderIndex={'data-layer'} />,
    <History key="history" siderIndex={'history'} />,
    <Task key="task" siderIndex={'task'} />
];
