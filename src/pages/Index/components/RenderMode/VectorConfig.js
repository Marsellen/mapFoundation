import React from 'react';
import { Checkbox } from 'antd';
import { inject, observer } from 'mobx-react';
import 'src/assets/less/components/define-mode.less';
import LayerVectorConfig from 'src/pages/Index/components/RenderMode/LayerVectorConfig.js';

@inject('RenderModeStore')
@inject('DefineModeStore')
@observer
class VectorConfig extends React.Component {
    reset = () => {
        const {
            RenderModeStore: { activeMode },
            DefineModeStore: { initVectorConfig }
        } = this.props;
        initVectorConfig(activeMode);
    };

    handleChangePoint = e => {
        const { checked } = e.target;
        const { DefineModeStore: { setGlobalPointEnabledStatus } = {} } = this.props;
        setGlobalPointEnabledStatus(checked);
    };

    handleChangeArrow = e => {
        const { checked } = e.target;
        const { DefineModeStore: { setGlobalArrowEnabledStatus } = {} } = this.props;
        setGlobalArrowEnabledStatus(checked);
    };

    render() {
        const {
            DefineModeStore: { vectorConfigMap, globalPointEnabledStatus, globalArrowEnabledStatus }
        } = this.props;
        return (
            <div className="vector-config-wrap">
                <div className="vector-config-global-title-wrap">
                    <div className="vector-config-global-title-left">
                        <label>全局设置：</label>
                        <Checkbox
                            checked={globalPointEnabledStatus}
                            onChange={this.handleChangePoint}
                        >
                            圆点
                        </Checkbox>
                        <Checkbox
                            checked={globalArrowEnabledStatus}
                            onChange={this.handleChangeArrow}
                        >
                            箭头
                        </Checkbox>
                    </div>
                    <div className="reset" onClick={this.reset}>
                        重置
                    </div>
                </div>
                <div
                    className="config-wrap vector-config-content-wrap"
                    style={{ overflow: 'auto' }}
                >
                    {Object.values(vectorConfigMap).map(item => {
                        const { key } = item;
                        return <LayerVectorConfig key={key} layerName={key} config={item} />;
                    })}
                </div>
            </div>
        );
    }
}

export default VectorConfig;
