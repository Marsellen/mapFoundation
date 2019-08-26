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
import AddFacadeRectangle from './AddFacadeRectangle';
import AddCircle from './AddCircle';
import AddRel from './AddRel';
import DelRel from './DelRel';
import Ranging from './Ranging';
import AddOutsideRectangle from './AddOutsideRectangle';
import AdjustPointSize from './AdjustPointSize';

export default [
    <Undo key="UNDO" />,
    <Redo key="REDO" />,
    <ResourceLoader key="RESOURCE_LOADER" />,
    <ExportShp key="EXPORT_SHP" />,
    <Save key="SAVE" />,
    <Intensity key="INTENSITY" />,
    <AdjustPointSize key="ADJUST_POINT_SIZE" />,
    <Ranging key="RANGING" />,
    <EditLayer key="EDIT_LAYER" />,
    <AddPoint key="POINT" />,
    <AddLine key="LINE" />,
    <AddPolygon key="POLYGON" />,
    <AddFacadeRectangle key="ADD_FACADEREC_TANGLE" />,
    <AddOutsideRectangle key="ADD_OUTSIDE_RECTANGLE" />,
    <AddCircle key="ADD_CIRCLE" />,
    <AddRel key="ADD_REL" />,
    <DelRel key="DEL_REL" />
];
