import React from 'react';
import Undo from 'src/component/home/toolList/undo';
import Redo from 'src/component/home/toolList/redo';
import Save from 'src/component/home/toolList/save';
import EditLayer from 'src/component/home/toolList/editLayer';
import ResourceLoader from 'src/component/home/toolList/resourceLoader';
import ExportShp from 'src/component/home/toolList/exportShp';
import AddRel from 'src/component/home/toolList/addRel';
import DelRel from 'src/component/home/toolList/delRel';
import SearchInfo from 'src/component/home/toolList/searchInfo';
import QualityCheck from 'src/component/home/toolList/qualityCheck';
import PointCloud from 'src/component/home/toolList/pointCloud';
import TopBreakLine from 'src/component/home/toolList/topBreakLine';
import ToolBox from 'src/component/home/toolList/toolBox';
import DrawToolBox from 'src/component/home/toolList/drawToolBox';
import BatchToolBox from 'src/component/home/toolList/batchToolBox';
import AttributeBrush from 'src/component/home/toolList/attributeBrush';
import QCMarkerTool from 'src/component/home/toolList/qcMarkerTool';
import InformationTool from 'src/component/home/toolList/informationTool';
import PostureAdjust from 'src/component/home/toolList/postureAdjust';
import SetStepSize from 'src/component/home/toolList/setStepSize';
import UnionBreak from 'src/component/home/toolList/unionBreak';
import BuildStep from 'src/component/home/toolList/buildStep';
import BatchBreak from 'src/component/home/toolList/batchBreak';
import MunicipalBarrierDown from 'src/component/home/toolList/municipalBarrierDown';
import ViewNeighbor from './viewNeighbor';

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
    <BuildStep key="BUILD_STEP" />,
    <QCMarkerTool key="QC_MARKER" />,
    <InformationTool key="INFORMATION_TOOL" />,
    <ViewNeighbor key="VIEW_NEIGHBOR" />,
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
    <BatchBreak key="BATCH_BREAK" />,
    <MunicipalBarrierDown key="MUNICIPAL_BARRIER_DOWN" />
];
