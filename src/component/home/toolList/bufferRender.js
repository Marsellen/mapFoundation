import React from 'react';
import IconFont from 'src/component/common/iconFont';
import { inject, observer } from 'mobx-react';
import { Modal, Slider, Row, Col, Form } from 'antd';
import AdMessage from 'src/component/common/adMessage';
import AdInputPositiveNumber from 'src/component/common/form/adInputPositiveNumber';
import AdColorInput from 'src/component/common/form/adColorInput';
import { editLock } from 'src/tool/decorator';
import 'less/ad-buffer-render.less';
import { Utils } from 'addis-viz-sdk';

const formLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
};
@Form.create()
@inject('DataLayerStore')
@inject('AttributeStore')
@observer
class BufferRender extends React.Component {
    constructor() {
        super();
        this.result = [];
    }
    componentDidMount() {
        const { DataLayerStore } = this.props;
        DataLayerStore.setBufferRenderCallback((result, event) => {
            if (event.button == 2) {
                this.result = result;
                this.createTube(result);
            }
        });
    }

    render() {
        const { DataLayerStore, form } = this.props;
        let visible = DataLayerStore.editType == 'buffer_render';
        const { opacity, color } = form.getFieldsValue();
        return (
            <span className="buffer">
                <div id="buffer-btn" className="flex-1" onClick={this.action}>
                    <IconFont type="icon-yaosulunkuobuffer" />
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
                    footer={null}
                    width={294}
                >
                    <Form {...formLayout}>
                        <Form.Item label="buffer半径" name="radius_buffer">
                            <Row>
                                <Col span={16}>
                                    {form.getFieldDecorator('radius', { initialValue: 0.2 })(
                                        <AdInputPositiveNumber
                                            className="input-buffer"
                                            step={0.01}
                                            precision={2}
                                            width={127}
                                            size="small"
                                            onChange={val => this.onChange('radius', val)}
                                        />
                                    )}
                                </Col>
                                <Col span={6} push={4}>
                                    <span className="ant-form-text">米</span>
                                </Col>
                            </Row>
                        </Form.Item>
                        <Form.Item label="buffer颜色" name="color">
                            {form.getFieldDecorator(
                                'color',
                                { initialValue: 'rgb(255,800,80)' },
                                {
                                    rules: []
                                }
                            )(
                                <AdColorInput
                                    color={color}
                                    disableAlpha={true}
                                    onChange={val => this.onChange('color', val)}
                                />
                            )}
                        </Form.Item>
                        <Form.Item label="buffer透明度" name="opacity_buffer">
                            <Row>
                                <Col span={16}>
                                    {form.getFieldDecorator(
                                        'opacity',
                                        { initialValue: 0.2 },
                                        {
                                            rules: []
                                        }
                                    )(
                                        <Slider
                                            className="flex-1"
                                            min={0}
                                            max={1}
                                            step={0.1}
                                            tipFormatter={null}
                                            onChange={val => this.onChange('opacity', val)}
                                        />
                                    )}
                                </Col>
                                <Col span={6} push={4}>
                                    <span className="ant-form-text">{opacity * 100 || 20}%</span>
                                </Col>
                            </Row>
                        </Form.Item>
                    </Form>
                </Modal>
            </span>
        );
    }

    @editLock
    action = () => {
        if (this.props.disabled) return;
        const { DataLayerStore, AttributeStore } = this.props;
        this.result = [];
        if (DataLayerStore.editType == 'buffer_render') return;
        AttributeStore.hide();
        AttributeStore.hideRelFeatures();
        DataLayerStore.bufferRender();
    };

    createTube = result => {
        this.props.DataLayerStore.clearBufferRender();
        const values = this.props.form.getFieldsValue();
        result.forEach(res => {
            const feature = res.data;
            const style = { color: values.color, opacity: values.opacity };
            const opts = { radius: values.radius };
            const mesh = Utils.createTube(feature, style, opts);
            window.bufferLayer.layer.addMapTextureNode(mesh);
        });
    };

    onChange = (key, val) => {
        const { form } = this.props;
        form.setFieldsValue({ [key]: val });
        this.createTube(this.result);
    };

    content = () => {
        return (
            <label>
                选择需要展示buffer的线要素，右键/多选按Ctrl+右键即可渲染；按Esc退出buffer渲染
            </label>
        );
    };
}

export default BufferRender;
