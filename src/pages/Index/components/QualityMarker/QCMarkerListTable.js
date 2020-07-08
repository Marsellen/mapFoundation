import React from 'react';
import { MARKER_TABLE_COLUMNS } from 'src/config/QCMarkerConfig';
import { inject, observer } from 'mobx-react';
import MultiFunctionalTable from 'src/components/MultiFunctionalTable';

@inject('QualityCheckStore')
@inject('QCMarkerStore')
@observer
class QCMarkerListTable extends React.Component {
    getColumns = total => {
        const columns = MARKER_TABLE_COLUMNS.map(item => {
            const { dataIndex, describe } = item;
            const newItem = {
                ...item,
                render: (text, record, index) => {
                    const { fileName } = record;
                    switch (dataIndex) {
                        case 'index':
                            return total - index;
                        case 'fieldName':
                            if (!text) return '--';
                            const specialDescribe = describe[fileName];
                            const describeObj = specialDescribe.find(item => item.key === text);
                            return describeObj.name;
                        default:
                            if (describe) {
                                const describeObj = describe.find(item => item.value === text);
                                return describeObj.label;
                            } else {
                                return text || '--';
                            }
                    }
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
