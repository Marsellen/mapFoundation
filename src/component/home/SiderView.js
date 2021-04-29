import React from 'react';
import ResourceLayer from './resourceLayer';
import DataLayer from './dataLayer';
import History from './history';
import Task from './task';
import QualityCheckResult from './qualityCheck/qualityCheckResult';
import ViewAttribute from 'src/component/home/toolList/viewAttribute';
import RenderMode from 'src/component/home/renderMode/renderMode';
import SiderBreakLine from './siderBreakLine';
import PictureView from './pictureView';

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
