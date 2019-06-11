import React from 'react';
import { Table } from 'antd';
import EditableCell from './EditableCell';
import 'less/components/editable-table.less';

class EditableTable extends React.Component {
    components = {
        body: {
            cell: EditableCell
        }
    };

    render() {
        return (
            <Table
                components={this.components}
                rowClassName={() => 'editable-row'}
                bordered
                {...this.props}
            />
        );
    }
}

export default EditableTable;
