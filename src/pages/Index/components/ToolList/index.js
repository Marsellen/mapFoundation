import React from 'react';
import Undo from './Undo';
import Redo from './Redo';
import Save from './Save';
import EditLayer from './EditLayer';

export default [
    <Undo key="UNDO" />,
    <Redo key="REDO" />,
    <Save key="SAVE" />,
    <EditLayer key="EDIT_LAYER" />
];
