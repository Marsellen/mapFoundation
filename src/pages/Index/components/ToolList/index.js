import React from 'react';
import Undo from './Undo';
import Redo from './Redo';
import Save from './Save';
import Intensity from './Intensity';
import EditLayer from './EditLayer';
import AddLine from './AddLine';
import AddPoint from './AddPoint';
import AddPolygon from './AddPolygon';
import ResourceLoader from './ResourceLoader';
import ExportShp from './ExportShp';

export default [
    <Undo key="UNDO" />,
    <Redo key="REDO" />,
    <ResourceLoader key="RESOURCE_LOADER" />,
    <Save key="SAVE" />,
    <ExportShp key="EXPORT_SHP" />,
    <Intensity key="INTENSITY" />,
    <EditLayer key="EDIT_LAYER" />,
    <AddPoint key="POINT" />,
    <AddLine key="LINE" />,
    <AddPolygon key="POLYGON" />
];
