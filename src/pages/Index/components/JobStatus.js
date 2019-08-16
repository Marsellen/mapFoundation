import React from 'react';
import { Modal, Button } from 'antd';
import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import Authed from 'src/store/Authed';

@withRouter
@inject('appStore')
@observer
class JobStatus extends React.Component {
    constructor(props) {
        super(props);
    }

    state = { visible: false };

    render() {
        return (
            <div className="flex flex-center">
                <Button>获取任务</Button>
                <Button onClick={this.submitJob}>提交任务</Button>
            </div>
        );
    }
    submitJob = () => {
        Modal.confirm({
            title: '提交任务',
            content: '是否提交当前任务',
            okText: '确定',
            cancelText: '取消'
        });
    };
}

export default JobStatus;
