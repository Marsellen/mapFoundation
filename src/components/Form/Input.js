import React from 'react';
import { Input } from 'antd';

export default class AdInput extends React.Component {
    handleKeyDown = e => {
        e.stopPropagation();
        this.props.onKeyDown && this.props.onKeyDown();
        return false;
    };
    render() {
        return <Input {...this.props} onKeyDown={e => this.handleKeyDown(e)} />;
    }
}
