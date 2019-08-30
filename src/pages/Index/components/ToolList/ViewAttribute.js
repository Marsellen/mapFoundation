import React, { Fragment } from 'react';
import ToolIcon from 'src/components/ToolIcon';
import { Modal } from 'antd';
import AdTable from 'src/components/AdTable';
import { COLUMNS_CONFIG } from 'src/config/PropertiesTableConfig';
import { getLayerItems } from 'src/utils/vectorCtrl/propertyTableCtrl';
import 'less/components/ViewAttribute.less';

class ViewAttribute extends React.Component {
    constructor() {
        super();
        this.state = {
            visible: false,
            columns: [],
            dataSource: []
        };
    }
    render() {
        return (
            <Fragment>
                <ToolIcon icon="huitui_" title="属性列表" action={this.show} />
                <Modal
                    visible={this.state.visible}
                    title="标记图层"
                    footer={null}
                    // content={this.renderContent()}
                    onCancel={this.handleCancel}
                    className="layerScroll"
                    >
                    {this.renderContent()}
                </Modal>
            </Fragment>
        );
    }

    renderContent = () => {
        const { columns, dataSource } = this.state;
        console.log('columns:', columns);
        
        return <AdTable columns={columns} dataSource={dataSource} />;
    };

    getData = () => {
        let columns = COLUMNS_CONFIG['AD_LaneDivider'];
        let dataSource = getLayerItems('AD_LaneDivider');
        this.setState({ columns, dataSource });
    };

    show = () => {
        this.setState({
            visible: true
        });
        this.getData();
    };

    handleCancel = () => {
        this.setState({
            visible: false
        });
    };
}

export default ViewAttribute;
