import React from 'react';
import Tool from './Tool';
import Layer from './Layer';
import History from './History';
import Task from './Task';

export default [
    <Tool key="tool" siderIndex={'resource-layer'} />,
    <Layer key="layer" siderIndex={'data-layer'} />,
    <History key="history" siderIndex={'history'} />,
    <Task key="task" siderIndex={'task'} />
];
