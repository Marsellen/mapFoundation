import React from 'react';
import { MARKER_TABLE_COLUMNS } from 'src/config/QCMarkerConfig';
import { inject, observer } from 'mobx-react';
import MultiFunctionalTable from 'src/components/MultiFunctionalTable';
import 'src/assets/less/components/qc-marker-table.less';

@inject('DataLayerStore')
@inject('QualityCheckStore')
@inject('QCMarkerStore')
@observer
class QCMarkerListTable extends React.Component {
    getColumns = total => {
        const columns = MARKER_TABLE_COLUMNS.map(item => {
            const { dataIndex, describe, className } = item;
            const newItem = {
                ...item,
                render: (text, record, index) => {
                    if (dataIndex === 'index') {
                        text = total - index;
                    }
                    if (!text) return '--';
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

    //单击：选中此质检标注，弹出“质检标注窗口”
    handleClick = record => {
        const {
            DataLayerStore: { setSelectFeature },
            QCMarkerStore: { show, setEditStatus, initCurrentMarker }
        } = this.props;
        //显示marker属性编辑窗口
        const option = {
            key: 'id',
            value: record.id
        };
        const feature = window.markerLayer.layer.getFeatureByOption(option);
        const marker = feature.properties;
        initCurrentMarker(marker);
        setEditStatus('visite');
        show();
        //选中要素
        const { layerId, uuid } = marker;
        setSelectFeature(layerId, uuid);
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
                isFirstLoading={visible}
                className="quality-marker-list-table"
                onClick={this.handleClick}
                onDoubleClick={this.handleDoudleClick}
            />
        );
    }
}

export default QCMarkerListTable;
