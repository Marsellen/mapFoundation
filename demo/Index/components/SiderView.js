import React from 'react';
import Tool from './Tool';
import Layer from './Layer';
import History from './History';
import Task from './Task';
import IndexedDB from './IndexedDB'

export default [
    <Tool key="tool" siderIndex={'tool'} />,
    <Layer key="layer" siderIndex={'layer'} />,
    <History key="history" siderIndex={'history'} />,
    <Task key="task" siderIndex={'task'} />,
    <IndexedDB key="indexedDB" siderIndex={'IndexedDB'} />
];
