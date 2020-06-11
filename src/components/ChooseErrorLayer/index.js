import React from 'react';
import { Button, Select } from 'antd';
import { inject, observer } from 'mobx-react';
import ToolIcon from 'src/components/ToolIcon';
import AdMessage from 'src/components/AdMessage';
import { DATA_LAYER_MAP } from 'src/config/DataLayerConfig';
import 'src/assets/less/components/ad-error-layer.less';

const { Option } = Select;

@inject('DataLayerStore')
@observer
class ChooseErrorLayer extends React.Component {
    constructor() {
        super();
        this.state = {
            layerName: '',
            layerId: null
        };
    }
    componentDidMount() {
        const { DataLayerStore } = this.props;
        DataLayerStore.setErrorLayerCallback((result, event) => {
            if (result.length > 0) {
                const layerId =
                    result[0].data.properties[
                        DATA_LAYER_MAP[result[0].layerName].id
                    ];
                const layerName = result[0].layerName;
                this.setState({
                    layerName: layerName,
                    layerId: layerId
                });
                this.props.handleErrorLayerId(layerName, layerId);
            }
        });
    }
    handleErrorLayer = () => {
        const { DataLayerStore } = this.props;
        DataLayerStore.chooseErrorLayer();
        DataLayerStore.QCAttrModal();
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
        const { DataLayerStore, options, firstValue } = this.props;
        let visible = DataLayerStore.editType == 'error_layer';
        return (
            <span className="error-layer">
                <ToolIcon icon="cuowutuceng" action={this.handleErrorLayer} />
                <Select
                    onChange={this.onChange}
                    value={!layerName ? firstValue : layerName}>
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
