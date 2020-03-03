import React from 'react';
import { Popover } from 'antd';
import IconFont from '../IconFont';
import ToolIcon from '../ToolIcon';
import 'less/components/check-button.less';

class CheckButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            option: {},
            defaultOption: props.defaultOption
        };
    }

    static getDerivedStateFromProps(props, state) {
        if (props.defaultOption.id !== state.defaultOption.id) {
            return {
                ...state,
                option: {},
                defaultOption: props.defaultOption,
                shouldUpdate: true
            };
        }
        return null;
    }

    componentDidMount() {
        this.installListener();
        this.props.onRef(this);
    }

    componentWillUnmount() {
        this.unstallListener();
    }

    render() {
        const {
            visible,
            option: { icon, title },
            defaultOption
        } = this.state;
        const { active, disabled } = this.props;
        return (
            <span id="check-button" className="check-button flex-1">
                <ToolIcon
                    className={active ? 'ad-icon-active' : ''}
                    icon={icon || defaultOption.key}
                    disabled={disabled}
                    title={title || defaultOption.title}
                    action={this.action}
                    focusBg={true}
                    visible={this.props.active}
                />
                <Popover
                    overlayClassName={
                        visible ? 'check-button-popover' : 'hide-popover'
                    }
                    content={this.renderContent()}
                    title={this.props.contentTitle}
                    trigger="click"
                    visible={true}
                    getPopupContainer={this.getPopupContainer}>
                    <IconFont
                        type="icon-sanjiao1"
                        className={`jiao-biao ${
                            visible ? 'jiao-biao-active' : ''
                        } ${disabled ? 'ad-disabled-icon' : ''}`}
                        onClick={() => {
                            this.togglePopover(true);
                        }}
                    />
                </Popover>
            </span>
        );
    }

    renderContent = () => {
        let selectedKey =
            this.state.option.icon || this.state.defaultOption.key;
        return this.props.renderContent(selectedKey);
    };

    getPopupContainer = () => {
        return document.getElementById('check-button');
    };

    togglePopover = (flag, option) => {
        if (this.props.disabled) return;
        this.setState({
            visible: flag ? !this.state.visible : false,
            option: option || this.state.option || this.state.defaultOption
        });
    };

    installListener = () => {
        document.addEventListener('click', this.onClick, true);
    };

    unstallListener = () => {
        document.removeEventListener('click', this.onClick, true);
    };

    onClick = e => {
        let isActive = document
            .getElementById('check-button')
            .contains(e.target);

        if (!isActive) {
            this.setState({
                visible: false
            });
        }
    };

    action = () => {
        const {
            option: { actionid },
            defaultOption
        } = this.state;
        let btn = document.getElementById(actionid || defaultOption.actionid);
        btn && btn.click();
    };

    setOption = option => {
        this.setState({
            option: option
        });
    };

    getSelectedKey = () => {
        return this.state.option.icon;
    };
}

export default CheckButton;
