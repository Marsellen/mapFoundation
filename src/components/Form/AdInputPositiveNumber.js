/* 只能输入正数*/
import React from 'react';
import { InputNumber } from 'antd';
import 'src/assets/less/components/ad-input-number.less';

export default class AdInputPositiveNumber extends React.Component {
    render() {
        const { width, className } = this.props;
        return (
            <div className={`rels-input-number ${className}`} style={{ width }}>
                <InputNumber
                    {...this.props}
                    className="ad-input-number ant-col-xs-16 ant-col-sm-14"
                    onChange={this.handleChange}
                    onKeyDown={e => this.handleKeyDown(e)}
                />
            </div>
        );
    }

    //只能输入一个点
    handleChange = value => {
        const { onChange } = this.props;
        const matched = String(value).match(/\./g) || [];
        const pointCount = matched.length;
        if (pointCount <= 1) {
            onChange && onChange(Number(value));
        }
    };

    //只能输入这些字符
    handleKeyDown = e => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();

        const reg = [
            '0',
            '1',
            '2',
            '3',
            '4',
            '5',
            '6',
            '7',
            '8',
            '9',
            '.',
            'Backspace',
            'ArrowLeft',
            'ArrowRight'
        ];

        if (!reg.includes(e.key)) {
            e.preventDefault();
        }

        return false;
    };
}
