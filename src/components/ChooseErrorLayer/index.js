import React from 'react';
import { Select } from 'antd';
import { inject, observer } from 'mobx-react';
import ToolIcon from 'src/components/ToolIcon';
import AdMessage from 'src/components/AdMessage';
import 'src/assets/less/components/ad-error-layer.less';

const { Option } = Select;

@inject('DataLayerStore')
@observer
class ChooseErrorLayer extends React.Component {
    constructor() {
        super();
        this.state = {
            layerName: ''
        };
    }
    static getDerivedStateFromProps(props, state) {
        if (props.value !== state.layerName) {
            return {
                ...state,
                layerName: props.value
            };
        }
        return null;
    }
    handleErrorLayer = () => {
        const { DataLayerStore } = this.props;
        DataLayerStore.QCAttrModal();
        DataLayerStore.chooseErrorLayer('error_layer');
    };

    onChange = val => {
        const { onChange } = this.props;
        this.setState({
            layerName: val
        });
        if (typeof onChange === 'function') {
            onChange(val);
        }
    };
    render() {
        const { layerName } = this.state;
        const { DataLayerStore, options, disabled } = this.props;
        let visible = DataLayerStore.editType == 'error_layer';
        return (
            <span className="error-layer">
                <ToolIcon
                    visible={visible}
                    disabled={disabled}
                    icon="cuowutuceng"
                    title="选取错误数据"
                    action={this.handleErrorLayer}
                />
                <Select disabled={disabled} value={layerName} onChange={this.onChange}>
                    {options.map((opt, index) => (
                        <Option key={index} value={opt.value}>
                            {opt.label}
                        </Option>
                    ))}
                </Select>
                <AdMessage visible={visible} content={this.content()} />
            </span>
        );
    }

    content = () => {
        return <label>正在选取错误数据，按Esc退出</label>;
    };
}

export default ChooseErrorLayer;
