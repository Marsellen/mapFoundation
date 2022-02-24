import React from 'react';
import 'src/asset/less/ad-tree.less';
import { Checkbox, Icon } from 'antd';
import ToolIcon from 'src/component/common/toolIcon';

class AdTree extends React.Component {
    //带图标的checkbox文本
    _checkboxIconNode = label => {
        return (
            <div className="tree-label">
                <span>{label}</span>
                <ToolIcon className="lock-icon" icon="guanlian" />
            </div>
        );
    };

    //递归遍历出多工程树结构
    _renderList = obj => {
        return Object.values(obj).map(item => {
            const { stretch, onChange, handleStretch } = this.props;
            const {
                key,
                label,
                checked,
                disabled,
                active,
                children,
                stretched,
                indeterminate
            } = item;
            const keyArr = key.split('|');
            const keyArrL = keyArr.length;
            return (
                <div key={key}>
                    <div className="tree-item" style={{ marginLeft: (keyArrL - 1) * 20 }}>
                        {stretch && children && (
                            <Icon
                                className="tree-stretch-icon"
                                onClick={() => handleStretch(key)}
                                type={stretched ? 'caret-up' : 'caret-down'}
                            />
                        )}
                        <Checkbox
                            value={key}
                            checked={checked}
                            disabled={disabled}
                            indeterminate={indeterminate}
                            onChange={e => onChange(e, key)}
                        >
                            {active ? this._checkboxIconNode(label) : label}
                        </Checkbox>
                    </div>
                    {children && !stretched && this._renderList(children)}
                </div>
            );
        });
    };

    render() {
        const { dataSource } = this.props;
        return <div className="tree-wrap">{this._renderList(dataSource)}</div>;
    }
}

export default AdTree;