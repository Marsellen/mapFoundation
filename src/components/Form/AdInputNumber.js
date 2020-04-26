import React from 'react';
import { InputNumber } from 'antd';
import 'src/assets/less/components/ad-input-number.less';

export default class AdInputNumber extends React.Component {
    render() {
        const { width, className } = this.props;
        return (
            <div className={`rels-input-number ${className}`} style={{ width }}>
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
        e.nativeEvent.stopImmediatePropagation();
        const invalidChars = ['+', 'e', 'E'];
        if (invalidChars.indexOf(e.key) !== -1) {
            e.preventDefault();
        }
        return false;
    };
}
