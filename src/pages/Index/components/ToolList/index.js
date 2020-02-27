import React from 'react';
import Undo from './Undo';
import Redo from './Redo';
import Save from './Save';
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
import ReadCoordinate from './ReadCoordinate';
import AddGroundRectangle from './AddGroundRectangle';
import SearchInfo from './SearchInfo';
import DividerToAutoCreate from './DividerToAutoCreate';
import HalfAutoCreate from './HalfAutoCreate';
import QualityCheck from './QualityCheck';
import RoadSet from './RoadSet';
import PointCloud from './PointCloud';
import TopBreakLine from './TopBreakLine'

export default [
    <Undo key="UNDO" />,
    <Redo key="REDO" />,
    <ResourceLoader key="RESOURCE_LOADER" />,
    <ExportShp key="EXPORT_SHP" />,
    <Save key="SAVE" />,
    <PointCloud key="POINT_CLOUD" />,
    <Ranging key="RANGING" />,
    <ReadCoordinate key="READ_COORDINATE" />,
    <RoadSet key="ROAD_SET" />,
    <TopBreakLine key='TOP_BREAK_LINE' />,
    <EditLayer key="EDIT_LAYER" />,
    <AddPoint key="POINT" />,
    <AddLine key="LINE" />,
    <DividerToAutoCreate key="DIVIDER_TO_AUTO_CREATE" />,
    <HalfAutoCreate key="HALF_AUTO_CREATE" />,
    <AddPolygon key="POLYGON" />,
    <AddGroundRectangle key="ADD_GROUND_RECTANGLE" />,
    <AddFacadeRectangle key="ADD_FACADEREC_TANGLE" />,
    <AddOutsideRectangle key="ADD_OUTSIDE_RECTANGLE" />,
    <AddCircle key="ADD_CIRCLE" />,
    <AddRel key="ADD_REL" />,
    <DelRel key="DEL_REL" />,
    <SearchInfo key="SEARCH_INFO" />,
    <QualityCheck key="QUALITY_TEST" />
];
