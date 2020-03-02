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
            option: {}
        };
        this.installListener();
    }

    componentDidMount() {
        this.props.onRef(this);
    }

    render() {
        const {
            visible,
            option: { icon, title }
        } = this.state;
        const { active, disabled, defaultOption } = this.props;
        return (
            <span id="check-button" className="check-button flex-1">
                <span className={active ? 'ad-icon-active' : ''}>
                    <ToolIcon
                        icon={icon || defaultOption.key}
                        disabled={disabled}
                        title={title || defaultOption.title}
                        action={this.action}
                    />
                </span>
                <Popover
                    overlayClassName={
                        visible ? 'check-button-popover' : 'hide-popover'
                    }
                    content={this.props.content}
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

    getPopupContainer = () => {
        return document.getElementById('check-button');
    };

    togglePopover = (flag, option) => {
        if (this.props.disabled) return;
        this.setState({
            visible: flag ? !this.state.visible : false,
            option: option || this.state.option || this.props.defaultOption
        });
    };

    installListener = () => {
        document.addEventListener('click', this.onClick, true);
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
            option: { actionid }
        } = this.state;
        const { defaultOption } = this.props;
        let btn = document.getElementById(actionid || defaultOption.actionid);
        btn && btn.click();
    };
}

export default CheckButton;
