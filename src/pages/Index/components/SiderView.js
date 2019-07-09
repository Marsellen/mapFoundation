import React from 'react';
import ResourceLayer from './ResourceLayer';
import DataLayer from './DataLayer';
import History from './History';
import Task from './Task';

export default [
    <Task key="task" siderIndex={'task-manage'} />,
    <ResourceLayer key="resource-layer" siderIndex={'resource-layer'} />,
    <DataLayer key="layer" siderIndex={'data-layer'} />,
    <History key="history" siderIndex={'history'} />
];
