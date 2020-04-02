import React from 'react';
import { InputNumber } from 'antd';
import 'src/assets/less/components/ad-input-number.less';

export default class AdInputNumber extends React.Component {
    timeout = false;
    render() {
        const { width } = this.props;
        return (
            <div className="rels-input-number" style={{ width }}>
                <InputNumber
                    className="ad-input-number ant-col-xs-16 ant-col-sm-14"
                    {...this.props}
                    onKeyDown={e => this.handleKeyDown(e)}
                    onChange={this.handleChange}
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
    handleChange = value => {
        const { slowCallback, onChange } = this.props;
        if (!onChange) return;
        //防抖，减少重置画布次数
        if (slowCallback) {
            this.timeout && clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                onChange(value);
            }, 1000);
        } else {
            onChange(value);
        }
    };
}
