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
            RenderModeStore: { activeMode, commonRenderMode, whiteRenderMode },
            DefineModeStore: { initVectorConfig, setPointEnabledStatus, setArrowEnabledStatus }
        } = this.props;
        initVectorConfig(activeMode);
        activeMode === 'common' && commonRenderMode();
        activeMode === 'define' && whiteRenderMode();
        setPointEnabledStatus(true);
        setArrowEnabledStatus(true);
    };

    handleChangePoint = e => {
        const { checked } = e.target;
        const { DefineModeStore: { setPointEnabledStatus } = {} } = this.props;
        setPointEnabledStatus(checked);
    };

    handleChangeArrow = e => {
        const { checked } = e.target;
        const { DefineModeStore: { setArrowEnabledStatus } = {} } = this.props;
        setArrowEnabledStatus(checked);
    };

    render() {
        const {
            DefineModeStore: { vectorConfigMap, pointEnabledStatus, arrowEnabledStatus }
        } = this.props;
        return (
            <div className="vector-config-wrap">
                <div className="vector-config-global-title-wrap">
                    <div className="vector-config-global-title-left">
                        <label>全局设置：</label>
                        <Checkbox checked={pointEnabledStatus} onChange={this.handleChangePoint}>
                            圆点
                        </Checkbox>
                        <Checkbox checked={arrowEnabledStatus} onChange={this.handleChangeArrow}>
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
