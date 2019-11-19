import React from 'react';
import { InputNumber } from 'antd';
import 'src/assets/less/components/ad-input-number.less';

export default class AdInputNumber extends React.Component {
    render() {
        return (
            <div className="rels-input-number">
                <InputNumber
                    className="ad-input-number ant-col-xs-16 ant-col-sm-14"
                    {...this.props}
                    onKeyDown={e => this.handleKeyDown(e)}
                />
            </div>
        );
    }
    handleKeyDown = e => {
        e.stopPropagation();
        const invalidChars = ['+', 'e', 'E'];
        if (invalidChars.indexOf(e.key) !== -1) {
            e.preventDefault();
        }
        return false;
    };
}
