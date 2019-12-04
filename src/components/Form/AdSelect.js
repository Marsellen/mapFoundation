import React from 'react';
import { Select } from 'antd';

export default class AdSelect extends React.Component {
    handleKeyDown = e => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        this.props.onKeyDown && this.props.onKeyDown();
        return false;
    };
    render() {
        return (
            <Select
                showSearch
                {...this.props}
                onInputKeyDown={e => this.handleKeyDown(e)}
            />
        );
    }
}
