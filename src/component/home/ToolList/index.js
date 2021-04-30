import React from 'react';
import Undo from './undo';
import Redo from './redo';
import Save from './save';
import EditLayer from './editLayer';
import ResourceLoader from './resourceLoader';
import ExportShp from './exportShp';
import AddRel from './addRel';
import DelRel from './delRel';
import SearchInfo from './searchInfo';
import QualityCheck from './qualityCheck';
import PointCloud from './pointCloud';
import TopBreakLine from './topBreakLine';
import ToolBox from './toolBox';
import DrawToolBox from './drawToolBox';
import BatchToolBox from './batchToolBox';
import AttributeBrush from './attributeBrush';
import QCMarkerTool from './qcMarkerTool';
import PostureAdjust from './postureAdjust';
import SetStepSize from './setStepSize';
import UnionBreak from './unionBreak';
import BatchBreak from './batchBreak';

export default [
    <Undo key="UNDO" />,
    <Redo key="REDO" />,
    <ResourceLoader key="RESOURCE_LOADER" />,
    <ExportShp key="EXPORT_SHP" />,
    <Save key="SAVE" />,
    <PointCloud key="POINT_CLOUD" />,
    <SetStepSize key="SETSTEP_SIZE" />,
    <ToolBox key="TOOL_BOX" />,
    <SearchInfo key="SEARCH_INFO" />,
    <QualityCheck key="QUALITY_TEST" />,
    <QCMarkerTool key="QC_MARKER" />,
    <TopBreakLine key="TOP_BREAK_LINE_1" />,
    <EditLayer key="EDIT_LAYER" />,
    <DrawToolBox key="DRAW_TOOL_BOX" />,
    <AddRel key="ADD_REL" />,
    <DelRel key="DEL_REL" />,
    <BatchToolBox key="BATCH_TOOL_BOX" />,
    <AttributeBrush key="ATTRIBUTE_BRUSH" />,
    <PostureAdjust key="POSTURE_ADJUST" />,
    <UnionBreak key="UNION_BREAK" />,
    <TopBreakLine key="TOP_BREAK_LINE_2" />,
    <BatchBreak key="BATCH_BREAK" />
];
