import React from 'react';
import { Input } from 'antd';

export default class AdInput extends React.Component {
    handleKeyUp = e => {
        e.stopPropagation();
        this.props.onKeyUp && this.props.onKeyUp();
        return false;
    };
    render() {
        return <Input {...this.props} onKeyUp={e => this.handleKeyUp(e)} />;
    }
}
