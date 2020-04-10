/* 只能输入正数*/
import React from 'react';
import { InputNumber } from 'antd';
import 'src/assets/less/components/ad-input-number.less';

export default class AdInputPositiveNumber extends React.Component {
    render() {
        const { width } = this.props;
        return (
            <div className="rels-input-number" style={{ width }}>
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
            'Backspace'
        ];

        if (!reg.includes(e.key)) {
            e.preventDefault();
        }

        return false;
    };
}
