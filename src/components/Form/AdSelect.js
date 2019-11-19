import React from 'react';
import { Select } from 'antd';

export default class AdSelect extends React.Component {
    handleKeyUp = e => {
        e.stopPropagation();
        this.props.onKeyUp && this.props.onKeyUp();
        return false;
    };
    render() {
        return (
            <Select
                showSearch
                {...this.props}
                onInputKeyDown={e => this.handleKeyUp(e)}
            />
        );
    }
}
