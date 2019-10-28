import React from 'react';
import { InputNumber } from 'antd';
import 'src/assets/less/components/ad-input-number.less';

export default class AdInputNumber extends React.Component {
    handleKeyUp = e => {
        e.stopPropagation();
        this.props.onKeyUp && this.props.onKeyUp();
        return false;
    };
    render() {
        return (
            <InputNumber
                className="ad-input-number ant-col-xs-16 ant-col-sm-14"
                {...this.props}
                onKeyUp={e => this.handleKeyUp(e)}
                onKeyDown={e => this.handleKeyDown(e)}
            />
        );
    }
    handleKeyDown = e => {
        const invalidChars = ['-', '+', 'e', 'E'];
        if (invalidChars.indexOf(e.key) !== -1) {
            e.preventDefault();
        }
    };
}
