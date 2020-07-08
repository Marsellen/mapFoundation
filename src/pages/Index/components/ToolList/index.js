import React from 'react';
import Undo from './Undo';
import Redo from './Redo';
import Save from './Save';
import EditLayer from './EditLayer';
import ResourceLoader from './ResourceLoader';
import ExportShp from './ExportShp';
import AddRel from './AddRel';
import DelRel from './DelRel';
import SearchInfo from './SearchInfo';
import QualityCheck from './QualityCheck';
import PointCloud from './PointCloud';
import TopBreakLine from './TopBreakLine';
import ToolBox from './ToolBox';
import DrawToolBox from './DrawToolBox';
import BatchToolBox from './BatchToolBox';
import AttributeBrush from './AttributeBrush';
import QualityCheckMarker from './QualityCheckMarker';

export default [
    <Undo key="UNDO" />,
    <Redo key="REDO" />,
    <ResourceLoader key="RESOURCE_LOADER" />,
    <ExportShp key="EXPORT_SHP" />,
    <Save key="SAVE" />,
    <PointCloud key="POINT_CLOUD" />,
    <ToolBox key="TOOL_BOX" />,
    <SearchInfo key="SEARCH_INFO" />,
    <QualityCheck key="QUALITY_TEST" />,
    <QualityCheckMarker key="QC_MARKER" />,
    <TopBreakLine key="TOP_BREAK_LINE" />,
    <EditLayer key="EDIT_LAYER" />,
    <DrawToolBox key="DRAW_TOOL_BOX" />,
    <AddRel key="ADD_REL" />,
    <DelRel key="DEL_REL" />,
    <BatchToolBox key="BATCH_TOOL_BOX" />,
    <AttributeBrush key="ATTRIBUTE_BRUSH" />
];
