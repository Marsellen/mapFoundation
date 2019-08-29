import React from 'react';
import { Table } from 'antd';
import { TYPE_SELECT_OPTION_MAP } from 'src/config/ADMapDataConfig';

function AdTableCell(props) {
    const { filterBy, children, ...restProps } = props;
    let text = filterBy ? filterText(filterBy, children) : children;
    return <td {...restProps}>{text}</td>;
}

function filterText(type, children) {
    let config = TYPE_SELECT_OPTION_MAP[type].find(c => c.value == children);
    return config.label;
}

const components = {
    body: {
        cell: AdTableCell
    }
};

export function AdTable(props) {
    return <Table components={components} {...props} />;
}
