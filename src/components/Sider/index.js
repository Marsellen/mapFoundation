import React from "react";
import SiderBar from "./SiderBar";
import SiderContent from "./SiderContent";
import SiderItem from "./SiderItem";
import SiderSwitch from "./SiderSwitch";

class Sider extends React.Component {
    state = {
        showContent: false,
        activeItem: null
    };

    render() {
        const { showContent, activeItem } = this.state;
        const { menus } = this.props;
        return (
            <div style={styles.sider}>
                <SiderBar>
                    {menus.map(record => (
                        <SiderItem
                            key={record.type}
                            record={record}
                            activeItem={activeItem}
                            clickAction={this.clickSiderItem}
                        />
                    ))}
                </SiderBar>
                <SiderContent showContent={showContent} activeItem={activeItem}>
                    <SiderSwitch activeItem={activeItem}>
                        {this.props.children}
                    </SiderSwitch>
                </SiderContent>
            </div>
        );
    }

    clickSiderItem = item => {
        let type = this.state.activeItem && this.state.activeItem.type;
        let showContent =
            !this.state.showContent || type == item.type
                ? !this.state.showContent
                : this.state.showContent;
        this.setState({
            showContent: showContent,
            activeItem: showContent ? item : null
        });
    };
}

const styles = {
    sider: {
        height: "calc(100vh - 64px)",
        display: "flex"
    }
};

export default Sider;
