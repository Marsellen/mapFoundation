import React from 'react';
import { inject, observer } from 'mobx-react';
import { Checkbox, Icon, Select } from 'antd';
import 'src/assets/less/components/define-mode.less';
import AdColorInput from 'src/components/Form/AdColorInput';
import AdNodeSelect from 'src/components/Form/AdNodeSelect';
import AdColorSelect from 'src/components/Form/AdColorSelect';
import AdInputNumber from 'src/components/Form/AdInputNumber';

const { Option } = Select;
const colorOptionArr = [
    {
        key: 0,
        color: {
            r: 255,
            g: 255,
            b: 255,
            a: 1
        }
    },
    {
        key: 1,
        color: {
            r: 33,
            g: 273,
            b: 255,
            a: 1
        }
    },
    {
        key: 2,
        color: {
            r: 255,
            g: 247,
            b: 31,
            a: 1
        }
    },
    {
        key: 3,
        color: {
            r: 70,
            g: 109,
            b: 255,
            a: 1
        }
    },
    {
        key: 4,
        color: {
            r: 30,
            g: 170,
            b: 106,
            a: 1
        }
    },
    {
        key: 5,
        color: {
            r: 255,
            g: 61,
            b: 161,
            a: 1
        }
    },
    {
        key: 6,
        color: {
            r: 231,
            g: 120,
            b: 0,
            a: 1
        }
    },
    {
        key: 7,
        color: {
            r: 255,
            g: 0,
            b: 0,
            a: 1
        }
    }
];

@inject('DefineModeStore')
@observer
class LayerVectorConfig extends React.Component {
    constructor(props) {
        super(props);

        const { config } = props;
        const { type } = config;
        this.isPolygon = type === 'Polygon';
        this.isLine = type === 'Line';

        this.state = {
            visible: false
        };
    }

    toggle = () => {
        this.setState({
            visible: !this.state.visible
        });
    };

    handleChange = value => {
        console.log(`selected`, value);
    };

    handleColorChange = color => {
        console.log('color', color);
    };

    _configRender = () => {
        const { DefineModeStore, key, config } = this.props;
        // const { vectorConfig } = DefineModeStore;
        let {
            type,
            showFields,
            defaultStyle,
            styleOptionArr,
            arrowOptionArr,
            fieldStyle,
            typeArr
        } = config;
        const {
            colorFieldSize,
            colorFieldIcon,
            styleFieldWidth,
            styleFieldSize
        } = fieldStyle || {};
        const { color, radius } = defaultStyle;
        return (
            <div className="config-content config-content-1">
                <div className="field-box">
                    <label>颜色:</label>
                    <AdColorInput
                        className="field"
                        color={color}
                        size={colorFieldSize}
                        icon={colorFieldIcon}
                        onClick={this.handleColorClick}
                        onChange={this.handleColorChange}
                    />
                </div>
                {!this.isLine && styleOptionArr && (
                    <div className="field-box">
                        <label>样式:</label>
                        <AdNodeSelect
                            className="field"
                            size={styleFieldSize}
                            options={styleOptionArr}
                        />
                    </div>
                )}
                {!this.isLine && arrowOptionArr && (
                    <div className="field-box">
                        <label>箭头:</label>
                        <AdNodeSelect
                            className="field"
                            options={arrowOptionArr}
                        />
                    </div>
                )}
                {radius && (
                    <div className="field-box">
                        <label>尺寸:</label>
                        <AdInputNumber
                            className="field"
                            defaultValue={radius}
                            onChange={() => {}}
                        />
                    </div>
                )}
            </div>
        );
    };

    _detailConfigRender = () => {
        const { DefineModeStore, key, config } = this.props;
        // const { vectorConfig } = DefineModeStore;
        let {
            type,
            showFields,
            defaultStyle,
            styleOptionArr,
            arrowOptionArr,
            fieldStyle,
            typeArr
        } = config;
        const {
            colorFieldSize,
            colorFieldIcon,
            styleFieldWidth,
            styleFieldSize
        } = fieldStyle || {};
        const { color, radius } = defaultStyle;
        if (!typeArr) return null;
        return (
            <div className="config-content config-content-2">
                <div className="flex-between input-wrap">
                    <label>分类字段</label>
                    <Select
                        disabled={typeArr.length === 1}
                        defaultValue={showFields}
                        style={{ width: 190 }}>
                        {typeArr.map(item => {
                            const { key, name } = item || {};
                            return (
                                <Option value={key} key={key}>
                                    {name}
                                </Option>
                            );
                        })}
                    </Select>
                </div>
                <div className="flex-between input-wrap">
                    <label>颜色</label>
                    <AdColorSelect width={190} options={colorOptionArr} />
                </div>
                {typeArr.map(item => {
                    const { key, name } = item || {};
                    return (
                        <div className="flex-between input-wrap" key={key}>
                            <label>{name}</label>
                            <div className="flex-between input-box">
                                <AdColorInput
                                    className="field"
                                    color={color}
                                    size={colorFieldSize}
                                    icon={colorFieldIcon}
                                    onClick={this.handleColorClick}
                                    onChange={this.handleColorChange}
                                />
                                {!this.isLine && styleOptionArr && (
                                    <AdNodeSelect
                                        className={`field ${
                                            this.isPolygon ? 'point-field' : ''
                                        }`}
                                        size={styleFieldSize}
                                        options={styleOptionArr}
                                    />
                                )}
                                {!this.isLine && arrowOptionArr && (
                                    <AdNodeSelect
                                        className="field"
                                        options={arrowOptionArr}
                                    />
                                )}
                                {radius && (
                                    <AdInputNumber
                                        className="field"
                                        defaultValue={radius}
                                        onChange={() => {}}
                                    />
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };
    render() {
        const { config } = this.props;
        const { visible } = this.state;
        const { label, typeArr } = config;
        return (
            <div>
                <div className="config-title">
                    <div>
                        <Icon
                            type={visible ? 'caret-up' : 'caret-right'}
                            className={visible ? 'blue' : ''}
                        />
                        <span>{label}</span>
                    </div>
                    {typeArr && (
                        <Checkbox onChange={this.toggle}>分类设色</Checkbox>
                    )}
                </div>
                {!visible && this._configRender()}
                {visible && this._detailConfigRender()}
            </div>
        );
    }
}

export default LayerVectorConfig;
