import React from 'react';
import { inject, observer } from 'mobx-react';
import CONFIG from 'src/config';
import { Modal, Descriptions, Button, Select, message, Form } from 'antd';
import 'src/assets/less/components/hotkey.less';
import ToolIcon from 'src/components/ToolIcon';

const taskType = [
    {
        name: 'imp_recognition',
        type: 'MS',
        isLocal: false
    },
    {
        name: 'imp_check_after_recognition',
        type: 'MS_QC',
        isLocal: false
    },
    {
        name: 'imp_manbuild',
        type: 'MB',
        isLocal: false
    },
    {
        name: 'imp_check_after_manbuild',
        type: 'MB_QC',
        isLocal: false
    },
    {
        name: 'imp_recognition',
        type: 'MSD',
        isLocal: true
    },
    {
        name: 'imp_manbuild',
        type: 'MBD',
        isLocal: true
    }
];

const processName = [
    {
        name: 'imp_recognition',
        label: '人工识别'
    },
    {
        name: 'imp_check_after_recognition',
        label: '人工识别后质检'
    },
    {
        name: 'imp_manbuild',
        label: '人工构建'
    },
    {
        name: 'imp_check_after_manbuild',
        label: '人工构建后质检'
    }
];

const ROLE_CODE = ['producer_leader', 'quality_leader'];

@Form.create()
@inject('TaskStore')
@inject('appStore')
@inject('FeedbackStore')
@inject('ResourceLayerStore')
@observer
class FeedBack extends React.Component {
    constructor() {
        super();
        this.state = {
            visible: false,
            loading: false
        };
    }

    render() {
        const { TaskStore, appStore } = this.props;
        const { isEditableTask } = TaskStore;
        const { loginUser } = appStore;
        const { visible } = this.state;
        const isEdit = isEditableTask && ROLE_CODE.includes(loginUser.roleCode);
        return (
            <div className={isEdit ? 'feedback' : 'feedback-disabled'}>
                <span onClick={isEdit ? this.toggle : null}>
                    <ToolIcon icon="wentifankui" />
                    问题反馈
                </span>
                <Modal
                    className="feedback-modal"
                    footer={this.renderFooter()}
                    title={<span className="modal-title">问题数据反馈</span>}
                    visible={visible}
                    maskClosable={false}
                    onCancel={this.handleCancel}
                    width={650}
                >
                    {this.feedBackList()}
                </Modal>
            </div>
        );
    }

    feedBackList = () => {
        const {
            TaskStore,
            appStore,
            ResourceLayerStore: { multiProjectMap },
            form: { getFieldDecorator }
        } = this.props;
        const { activeTask } = TaskStore;
        const { loginUser } = appStore;
        const pjIndex = processName.findIndex(item => {
            return item.name === activeTask.processName;
        });
        // const projectNameArr = [
        //     '20191210130058_XIANGKONGZHU_SHANGHAI_AFA1119',
        //     '20200601130058_XIANGKONGZHU_SHANGHAI_AFA1119',
        //     '20201203142404_XIANGKONGZHU_SHANGHAI_AFA1119'
        // ];
        const projectNameArr = Object.keys(multiProjectMap) || [];
        return (
            <div className="feedback-content">
                <div className="feedback-eg">注：会将当前任务内的所有矢量数据打包反馈</div>
                <Descriptions
                    className="path-content"
                    title={<span className="feedback-title">环境基本信息</span>}
                >
                    <Descriptions.Item>
                        环境地址: {activeTask.Input_imp_data_path}
                        <br />
                        编辑平台版本: {CONFIG.version}
                        <br />
                    </Descriptions.Item>
                </Descriptions>
                <div className="feedback-title">任务基本信息</div>
                <div className="task-info">
                    <div className="task-info-label">工程名称</div>
                    <div className="task-info-value">
                        <Form>
                            <Form.Item>
                                {getFieldDecorator('projectNames', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请选择工程名称'
                                        }
                                    ]
                                })(
                                    <Select
                                        mode="multiple"
                                        allowClear
                                        maxTagTextLength={10}
                                        maxTagCount={2}
                                    >
                                        {projectNameArr.map((item, index) => (
                                            <Select.Option key={index} value={item}>
                                                {item}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                )}
                            </Form.Item>
                        </Form>
                    </div>
                </div>
                <div className="task-info">
                    <div className="task-info-label">工作人员</div>
                    <div className="task-info-value">
                        {loginUser.name} {loginUser.roleName}
                    </div>
                </div>
                <div className="task-info">
                    <div className="task-info-label">任务编号</div>
                    <div className="task-info-value">{activeTask.taskId}</div>
                </div>
                <div className="task-info task-info-bottom">
                    <div className="task-info-label">任务类型&amp;状态</div>
                    <div className="task-info-value">
                        {activeTask.isLocal
                            ? processName[pjIndex].label
                            : `${activeTask.nodeDesc}-${activeTask.manualStatusDesc}`}
                    </div>
                </div>
            </div>
        );
    };

    renderFooter = () => {
        return (
            <div>
                <Button className="cancelBtn" onClick={this.handleCancel}>
                    取消
                </Button>
                <Button type="primary" loading={this.state.loading} onClick={this.setFeedback}>
                    反馈
                </Button>
            </div>
        );
    };

    setFeedback = async e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll(async (error, values) => {
            if (!error) {
                const {
                    FeedbackStore,
                    ResourceLayerStore: { multiProjectMap }
                } = this.props;
                this.setState({ loading: true });
                try {
                    let tracks = values.projectNames.map(projectName => {
                        return multiProjectMap[projectName].children.track.layerMap;
                    });
                    const res = await FeedbackStore.feedback(tracks);
                    message.success(res.message, 3);
                    this.setState({
                        visible: false,
                        loading: false
                    });
                } catch (e) {
                    if (e.message !== '取消保存') {
                        Modal.error({
                            title: '反馈失败！',
                            content: (
                                <div className="fail-modal">
                                    <p>问题数据反馈失败，</p>
                                    <p>请再次提交反馈申请。</p>
                                </div>
                            ),
                            okText: '确定'
                        });
                        this.setState({ visible: false });
                    }
                    this.setState({ loading: false });
                }
            }
        });
    };

    toggle = () => {
        this.setState({
            visible: true
        });
    };

    handleCancel = () => {
        this.setState({
            visible: false
        });
    };
}
export default FeedBack;
