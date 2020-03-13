import React from 'react';
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
                defaultOption: props.defaultOption
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
        const { active, disabled, contentTitle, hideDropdown } = this.props;
        return (
            <span id="check-button" className="check-button">
                <ToolIcon
                    icon={icon || defaultOption.key}
                    title={title || defaultOption.title}
                    className="ad-tool-icon ad-tool-common-icon"
                    focusClassName="ad-tool-icon-active"
                    disabled={disabled}
                    visible={active}
                    action={this.action}
                />

                <ToolIcon
                    icon="sanjiao1"
                    title={contentTitle}
                    className={`jiao-biao ${hideDropdown && 'hide-popover'}`}
                    focusClassName="jiao-biao-active"
                    disabled={disabled}
                    visible={visible}
                    action={() => this.togglePopover(true)}
                    popover={{
                        overlayClassName: visible
                            ? 'check-button-popover'
                            : 'hide-popover',
                        content: this.renderContent(),
                        title: contentTitle,
                        trigger: 'click',
                        visible: true,
                        getPopupContainer: this.getPopupContainer
                    }}
                />
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
        const { option } = this.state;
        const { defaultOption } = this.props;
        const id = option.actionid || defaultOption.actionid;
        const btn = document.getElementById(id);
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
