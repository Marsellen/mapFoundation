import React from 'react';
import { Input } from 'antd';

const { Search } = Input;

export default class AdSearch extends React.Component {
    handleKeyDown = e => {
        e.stopPropagation();
        this.props.onKeyDown && this.props.onKeyDown();
        return false;
    };
    render() {
        return (
            <Search {...this.props} onKeyDown={e => this.handleKeyDown(e)} />
        );
    }
}
