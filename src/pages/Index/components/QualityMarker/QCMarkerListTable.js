import React from 'react';
import { MARKER_TABLE_COLUMNS } from 'src/config/QCMarkerConfig';
import { inject, observer } from 'mobx-react';
import MultiFunctionalTable from 'src/components/MultiFunctionalTable';
import 'src/assets/less/components/qc-marker-table.less';

@inject('AttributeStore')
@inject('ToolCtrlStore')
@inject('DataLayerStore')
@inject('QualityCheckStore')
@inject('QCMarkerStore')
@observer
class QCMarkerListTable extends React.Component {
    getColumns = total => {
        const columns = MARKER_TABLE_COLUMNS.map(item => {
            const { describe, style, style: { styleByValue, styleName } = {} } = item;
            const newItem = {
                ...item,
                render: (text, record) => {
                    if (!text && text !== 0) return '--';
                    const className = style && styleByValue === text ? styleName : '';
                    if (describe) {
                        const { data, second, label, value } = describe;
                        const secondStr = record[second];
                        const descArr = second ? data[secondStr] : data;
                        const describeObj = descArr.find(item => item[value] === text);
                        text = describeObj ? describeObj[label] : text;
                    }
                    return <span className={className}>{text}</span>;
                }
            };
            return newItem;
        });
        return columns;
    };

    //清扫工作区域
    clearWorkSpace = () => {
        const {
            ToolCtrlStore: { updateByEditLayer },
            AttributeStore: { hide, hideRelFeatures },
            DataLayerStore: { activeEditor, getEditLayerName, editStatus, exitMarker }
        } = this.props;
        //如果当前编辑图层是标注图层，则退出标注图层
        const editLayerName = getEditLayerName();
        if (editStatus || editLayerName === 'AD_Marker') {
            exitMarker();
        }
        //重置编辑图层，重置编辑工具，退出编辑状态
        activeEditor();
        updateByEditLayer();
        hide();
        hideRelFeatures();
    };

    //单击：选中此质检标注，弹出“质检标注窗口”
    handleClick = record => {
        try {
            const {
                QCMarkerStore: { show, setEditStatus, initCurrentMarker },
                DataLayerStore: { setSelectFeature }
            } = this.props;
            //清扫工作区域
            this.clearWorkSpace();
            //显示marker属性编辑窗口
            const option = {
                key: 'id',
                value: record.id
            };
            const feature = window.markerLayer.layer.getFeatureByOption(option);
            if (!feature) return;
            const marker = feature.properties;
            initCurrentMarker(marker);
            setEditStatus('visite');
            show();
            //选中要素
            const { layerId, uuid } = marker;
            setSelectFeature(layerId, uuid);
        } catch (e) {
            console.log(e);
        }
    };

    //双击定位；
    handleDoudleClick = record => {
        try {
            const geometry = JSON.parse(record.geom);
            const extent = map.getExtent(geometry);
            map.setView('U');
            map.setExtent(extent);
        } catch (e) {
            console.log(e);
        }
    };

    render() {
        const {
            QualityCheckStore: { tableHeight, toResizeDom },
            QCMarkerStore: { updateKey, markerList, filters, visible }
        } = this.props;
        const markerListL = markerList.length;
        const columns = this.getColumns(markerListL);
        return (
            <MultiFunctionalTable
                key={updateKey}
                updateKey={updateKey}
                dataSource={markerList}
                tableHeight={tableHeight}
                toResizeDom={toResizeDom}
                columns={columns}
                filters={filters}
                isFirstLoading={!filters}
                className="quality-marker-list-table"
                onClick={this.handleClick}
                onDoubleClick={this.handleDoudleClick}
            />
        );
    }
}

export default QCMarkerListTable;
