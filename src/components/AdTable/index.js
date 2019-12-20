import React from 'react';
import { Table } from 'antd';
import { Resizable } from 'react-resizable';
import Filter from 'src/utils/table/filter';

function AdTableCell(props) {
    const { filterBy, record, dataIndex, ...restProps } = props;
    let value = record[dataIndex];
    let text = filterBy ? Filter.get(filterBy)(value) : value;

    return (
        <td
            {...restProps}
            title={text}
            style={{ wordWrap: 'break-word', wordBreak: 'break-all' }}>
            {text}
        </td>
    );
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
    }
};

const handleBodyComponents = {
    ...components,
    body: {
        cell: AdTableCell
    }
};

export default function AdTable(props) {
    return (
        <Table
            components={props.isHandleBody ? components : handleBodyComponents}
            {...props}
        />
    );
}
