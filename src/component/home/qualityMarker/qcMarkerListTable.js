import React from 'react';
import { MARKER_TABLE_COLUMNS } from 'src/config/qcMarkerConfig';
import { inject, observer } from 'mobx-react';
import MultiFunctionalTable from 'src/component/common/multFunctionTable';
import 'src/asset/less/qc-marker-table.less';

@inject('DataLayerStore')
@inject('QualityCheckStore')
@inject('QCMarkerStore')
@observer
class QCMarkerListTable extends React.Component {
    getColumns = total => {
        const columns = MARKER_TABLE_COLUMNS().map(item => {
            const { describe, styleByValue: { fieldValue, className } = {} } = item;
            const newItem = {
                ...item,
                render: (text, record) => {
                    if (!text && text !== 0) return '--';
                    const cellClassName = fieldValue === text ? className : '';
                    if (describe) {
                        const { data, secondKey, label, value } = describe;
                        const secondKeyStr = record[secondKey];
                        const descArr = secondKey ? data[secondKeyStr] : data;
                        const describeObj = descArr.find(item => item[value] === text);
                        text = describeObj ? describeObj[label] : text;
                    }
                    return <span className={cellClassName}>{text}</span>;
                }
            };
            return newItem;
        });
        return columns;
    };

    //单击：选中此质检标注条目，弹出“质检标注窗口”
    handleClick = record => {
        try {
            const { QCMarkerStore, DataLayerStore } = this.props;
            if (QCMarkerStore.isCreateMarker()) return;
            //清扫工作区域
            QCMarkerStore.exitMarker('toggle_select');
            //显示marker属性编辑窗口
            const option = {
                key: 'id',
                value: record.id
            };
            const feature = window.markerLayer.layer.getFeatureByOption(option);
            if (!feature) return;
            const marker = feature.properties;
            QCMarkerStore.initCurrentMarker(marker);
            QCMarkerStore.setEditStatus('visite');
            QCMarkerStore.show();
            //选中要素
            const { layerId, uuid } = marker;
            DataLayerStore.setSelectFeature(layerId, uuid);
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
            QualityCheckStore: { tableHeight },
            QCMarkerStore: { markerList, filters }
        } = this.props;
        const markerListL = markerList.length;
        const columns = this.getColumns(markerListL);
        return (
            <MultiFunctionalTable
                dataSource={markerList}
                tableHeight={tableHeight}
                columns={columns}
                filters={filters}
                addJumpToFirstPage={true}
                className="quality-marker-list-table"
                onClick={this.handleClick}
                onDoubleClick={this.handleDoudleClick}
                rowKey={record => `marker_list_${record.id}`}
            />
        );
    }
}

export default QCMarkerListTable;
