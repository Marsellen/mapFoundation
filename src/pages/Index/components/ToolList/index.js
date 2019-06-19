import React from 'react';
import Undo from './Undo';
import Redo from './Redo';
import Save from './Save';
import EditLayer from './EditLayer';
import AddLine from './AddLine';
import AddPoint from './addPoint';
import AddPolygon from './addPolygon';

export default [
    <Undo key="UNDO" />,
    <Redo key="REDO" />,
    <Save key="SAVE" />,
    <EditLayer key="EDIT_LAYER" />,
    <AddPoint key="POINT" />,
    <AddLine key="LINE" />,
    <AddPolygon key="POLYGON" />
];
