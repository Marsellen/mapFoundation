import React from 'react';
import EditItem from './EditItem';

class EditableCell extends React.Component {
    renderCell = () => {
        const { children, dataIndex, record, title, handleSave } = this.props;
        return (
            <EditItem
                value={children}
                dataIndex={dataIndex}
                title={title}
                record={record}
                handleSave={handleSave}
            />
        );
    };

    render() {
        const {
            editable,
            dataIndex,
            title,
            record,
            index,
            handleSave,
            children,
            ...restProps
        } = this.props;
        return (
            <td {...restProps}>{editable ? this.renderCell() : children}</td>
        );
    }
}

export default EditableCell;
