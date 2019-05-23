import React from 'react';
import { Table, Button } from 'antd';
import { observer, inject } from 'mobx-react';
import EditForm from './EditForm';

const columns = [
    {
        title: 'Name',
        dataIndex: 'name'
    },
    {
        title: 'Age',
        dataIndex: 'age'
    },
    {
        title: 'Address',
        dataIndex: 'address'
    }
];

@inject('FeaturesStore')
@observer
class IndexedDB extends React.Component {
    state = {
        visible: false,
        initValues: null
    };

    componentDidMount() {
        this.props.FeaturesStore.init();
    }

    render() {
        const { features } = this.props.FeaturesStore;
        return (
            <div>
                <div style={{ marginBottom: 16 }}>
                    <Button type="primary" onClick={this.showModal}>
                        Add
                    </Button>
                </div>
                <Table
                    columns={columns}
                    dataSource={features}
                    rowKey={record => record.name + Math.random()}
                />
                <EditForm
                    visible={this.state.visible}
                    initValues={this.state.initValues}
                    onCancel={this.cancelModal}
                    handleSave={this.handleSave}
                />
            </div>
        );
    }

    showModal = () => {
        this.setState({ visible: true });
    };

    handleSave = value => {
        this.props.FeaturesStore.add(value);
        this.setState({ visible: false });
    };

    cancelModal = () => {
        this.setState({ visible: false });
    };
}

export default IndexedDB;
