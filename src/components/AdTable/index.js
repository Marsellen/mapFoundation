import React from 'react';
import { Table } from 'antd';
import { Resizable } from 'react-resizable';
import { TYPE_SELECT_OPTION_MAP } from 'src/config/ADMapDataConfig';

function AdTableCell(props) {
    const { filterBy, record, dataIndex, ...restProps } = props;
    let value = record[dataIndex];
    let text =
        value !== null && value !== undefined
            ? filterBy
                ? filterText(filterBy, value)
                : value
            : '--';
    return (
        <td
            {...restProps}
            style={{ wordWrap: 'break-word', wordBreak: 'break-all' }}>
            {text}
        </td>
    );
}

function filterText(type, value) {
    let config = TYPE_SELECT_OPTION_MAP[type].find(c => c.value == value);
    return config ? config.label : value;
}

function ResizeableTitle(props) {
    const { onResize, width, ...restProps } = props;

    if (!width) {
        return <th {...restProps} />;
    }

    return (
        <Resizable
            width={width}
            height={0}
            onResize={onResize}
            draggableOpts={{ enableUserSelectHack: false }}>
            <th {...restProps} />
        </Resizable>
    );
}

const components = {
    header: {
        cell: ResizeableTitle
    },
    body: {
        cell: AdTableCell
    }
};

export default function AdTable(props) {
    return <Table components={components} {...props} />;
}
