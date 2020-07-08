import React from 'react';
import { MARKER_TABLE_COLUMNS } from 'src/config/QCMarkerConfig';
import { inject, observer } from 'mobx-react';
import MultiFunctionalTable from 'src/components/MultiFunctionalTable';
import 'src/assets/less/components/qc-marker-table.less';

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

    handleDoudleClick = (record, index) => {
        try {
            const {
                QCMarkerStore: { show, setEditStatus, initCurrentMarker }
            } = this.props;
            const { geom, id } = record;
            //双击定位
            const extent = map.getExtent(geom);
            map.setView('U');
            map.setExtent(extent);
            //显示marker属性编辑窗口
            const option = {
                key: 'id',
                value: id
            };
            const marker = window.markerLayer.layer.getFeatureByOption(option);
            marker && initCurrentMarker(marker.properties);
            setEditStatus('visite');
            show();
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
                // onClick={}
                onDoubleClick={this.handleDoudleClick}
            />
        );
    }
}

export default QCMarkerListTable;
