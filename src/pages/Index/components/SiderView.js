import React from 'react';
import ResourceLayer from './ResourceLayer';
import DataLayer from './DataLayer';
import History from './History';
import Task from './Task';
import QualityCheckResult from './QualityCheck/QualityCheckResult';
import ViewAttribute from 'src/pages/Index/components/ToolList/ViewAttribute';
import RenderMode from 'src/pages/Index/components/RenderMode/RenderMode';
import SiderBreakLine from './SiderBreakLine';
import PictureView from './PictureView';

export default [
    <Task key="task" siderIndex={'task-manage'} />,
    <ResourceLayer key="resource-layer" siderIndex={'resource-layer'} />,
    <DataLayer key="layer" siderIndex={'data-layer'} />,
    <SiderBreakLine key="sider-break-line" />,
    <PictureView key="picture-view" siderIndex="picture-view" />,
    <History key="history" siderIndex={'history'} />,
    <ViewAttribute key="atrribute" siderIndex={'atrribute'} />,
    <QualityCheckResult key="quality-check-result" siderIndex={'quality-check-result'} />,
    <SiderBreakLine key="sider-break-line1" />,
    <RenderMode key="render-mode" siderIndex={'render-mode'} />
];
