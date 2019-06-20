import React from 'react';
import Undo from './Undo';
import Redo from './Redo';
import Save from './Save';
import Intensity from './Intensity';
import EditLayer from './EditLayer';
import AddLine from './AddLine';
import AddPoint from './AddPoint';
import AddPolygon from './AddPolygon';

export default [
    <Undo key="UNDO" />,
    <Redo key="REDO" />,
    <Save key="SAVE" />,
    <Intensity key="INTENSITY" />,
    <EditLayer key="EDIT_LAYER" />,
    <AddPoint key="POINT" />,
    <AddLine key="LINE" />,
    <AddPolygon key="POLYGON" />
];
