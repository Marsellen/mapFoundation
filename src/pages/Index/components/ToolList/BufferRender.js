import React from 'react';
import IconFont from 'src/components/IconFont';
import { inject, observer } from 'mobx-react';
import { Modal, Slider, Row, Col } from 'antd';
import AdMessage from 'src/components/AdMessage';
import AdInputPositiveNumber from 'src/components/Form/AdInputPositiveNumber';
import AdColorInput from 'src/components/Form/AdColorInput';
import { editLock } from 'src/utils/decorator';
import 'less/components/ad-buffer-render.less';

@inject('DataLayerStore')
@inject('AttributeStore')
@observer
class BufferRender extends React.Component {
    constructor() {
        super();
        this.state = {
            radius: 0.2,
            color: 'rgb(90,35,255)',
            slider: 50
        };
    }
    render() {
        const { radius, color, slider } = this.state;
        const { DataLayerStore } = this.props;
        let visible = DataLayerStore.editType == 'buffer_render';
        return (
            <span className="buffer">
                <div id="buffer-btn" className="flex-1" onClick={this.action}>
                    <IconFont type="icon-lumianshezhi" />
                    <div>要素轮廓buffer渲染</div>
                    <AdMessage visible={visible} content={this.content()} />
                </div>
                <Modal
                    wrapClassName="buffer-render-modal-wrap"
                    className="buffer-render-modal"
                    title="要素轮廓buffer渲染"
                    visible={visible}
                    mask={false}
                    closable={false}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    okText="应用"
                    cancelText="退出"
                    width={435}
                >
                    <div className="flex-1">
                        <span>buffer半径：</span>
                        <AdInputPositiveNumber
                            value={radius}
                            step={0.01}
                            precision={2}
                            width={100}
                            onChange={val => this.handleChange('radius', val)}
                        />
                        <span>米</span>
                    </div>
                    <div className="flex-1">
                        <span>buffer颜色：</span>
                        <AdColorInput
                            color={color}
                            onChange={val => this.handleChange('color', val)}
                        />
                    </div>
                    <div>
                        <Row>
                            <Col span={6}>
                                <span>buffer透明度：</span>
                            </Col>
                            <Col span={15}>
                                <Slider
                                    className="flex-1"
                                    defaultValue={50}
                                    onChange={val => this.handleChange('slider', val)}
                                />
                            </Col>
                            <Col span={3}>
                                <span>{slider}%</span>
                            </Col>
                        </Row>
                    </div>
                </Modal>
            </span>
        );
    }

    @editLock
    action = () => {
        if (this.props.disabled) return;
        const { DataLayerStore, AttributeStore } = this.props;
        if (DataLayerStore.editType == 'buffer_render') return;
        AttributeStore.hideRelFeatures();
        DataLayerStore.bufferRender();
    };

    handleChange = (key, val) => {
        this.setState({ [key]: val });
    };

    handleOk = () => {
        console.log('应用');
    };

    handleCancel = () => {
        const { DataLayerStore } = this.props;
        DataLayerStore.exitEdit();
    };

    content = () => {
        return <label>选择需要展示buffer的线要素，点击“应用”即可渲染；按Esc退出buffer渲染</label>;
    };
}

export default BufferRender;
