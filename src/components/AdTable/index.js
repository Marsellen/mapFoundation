import React from 'react';
import { Table } from 'antd';
import { TYPE_SELECT_OPTION_MAP } from 'src/config/ADMapDataConfig';

const components = {
    body: {
        cell: AdTableCell
    }
};

function AdTableCell(props) {
    const { filterBy, children, ...restProps } = props;
    let text = filterBy ? filterText(filterBy, children) : children;
    return <td {...restProps}>{text}</td>;
}

function filterText(type, children) {
    let config = TYPE_SELECT_OPTION_MAP[type].find(c => c.value == children);
    return config.label;
}

export function AdTable(props) {
    return <Table components={components} {...props} />;
}
