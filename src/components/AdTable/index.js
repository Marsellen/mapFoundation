import React from 'react';
import { Table } from 'antd';
import { TYPE_SELECT_OPTION_MAP } from 'src/config/ADMapDataConfig';

function AdTableCell(props) {
    const { filterBy, record, dataIndex, children, ...restProps } = props;
    let value = record[dataIndex];
    let text = filterBy ? filterText(filterBy, value) : children;
    return <td {...restProps}>{text}</td>;
}

function filterText(type, value) {
    let config = TYPE_SELECT_OPTION_MAP[type].find(c => c.value == value);
    return config.label;
}

const components = {
    body: {
        cell: AdTableCell
    }
};

export default function AdTable(props) {
    return (
        <Table
            scroll={{ x: 1500, y: 300 }}
            components={components}
           {...props}
        />
    );
}
