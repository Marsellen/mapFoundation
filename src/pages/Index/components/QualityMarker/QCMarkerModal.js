import React from 'react';
import { Form, Button, Modal, Spin, Icon } from 'antd';
import { inject, observer } from 'mobx-react';
import 'less/components/qc-marker-modal.less';
// import { logDecorator } from 'src/utils/decorator';
import ConfigurableForm from 'src/components/ConfigurableForm';
import { ATTR_FORM_FIELD_MAP, QC_MARKER_FORM_CONFIG } from 'src/config/QCMarkerConfig';

@Form.create()
@inject('appStore')
@inject('TaskStore')
@inject('QCMarkerStore')
@inject('DataLayerStore')
@observer
class QCMarkerModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isLoading: false };
        this.handleHistory = this.handleHistory.bind(this);
    }

    handleCancel = () => {
        const { DataLayerStore } = this.props;
        Modal.confirm({
            title: '是否退出',
            okText: '确定',
            cancelText: '取消',
            onOk: DataLayerStore.exitMarker
        });
    };

    handleCancelModify = () => {
        const {
            QCMarkerStore: { setEditStatus }
        } = this.props;
        setEditStatus('visite');
    };

    handleModify = () => {
        const {
            QCMarkerStore: { setEditStatus }
        } = this.props;
        setEditStatus('modify');
    };

    handleDelete = () => {
        Modal.confirm({
            title: '您确认执行该操作？',
            okText: '确定',
            cancelText: '取消',
            onOk: this.handleDeleteMarker
        });
    };

    handleDeleteMarker = async () => {
        const {
            DataLayerStore: { exitMarker },
            QCMarkerStore: {
                currentMarker,
                currentMarker: { uuid, data: { properties, properties: { id } } = {} },
                deleteMarker,
                updateMarkerList
            }
        } = this.props;
        try {
            this.setState({ isLoading: true });
            //添加到数据库
            await deleteMarker({ id });
            //通过uuid删除要素
            window.markerLayer.layer.removeFeatureById(uuid);
            //更新质检标注列表
            updateMarkerList({ type: 'delete', id, marker: properties });
            //记录history
            this.handleHistory(currentMarker);
            this.release();
            this.setState({ isLoading: false });
        } catch (e) {
            this.setState({ isLoading: false });
            exitMarker();
            console.error(e.message, 3);
        }
    };

    handleSubmit = type => {
        this.props.form.validateFields(async (err, values) => {
            if (err) return;
            const {
                DataLayerStore: { exitMarker },
                QCMarkerStore,
                QCMarkerStore: {
                    updateCurrentMarker,
                    currentMarker: { data: { properties: { id } = {} } = {} },
                    updateMarkerList
                }
            } = this.props;
            try {
                this.setState({ isLoading: true });
                const param = this[`getParam_${type}`](values);
                //添加到数据库
                const res = await QCMarkerStore[`${type}Marker`](param);
                if (!res && !res.data) return;
                const newProperties = { ...param, ...res.data };
                //更新currentMarker
                const marker = updateCurrentMarker(newProperties);
                //将添加的属性更新到sdk
                window.markerLayer.layer.updateFeatures([marker]);
                //更新质检标注列表
                updateMarkerList({
                    type,
                    id,
                    marker: marker.data.properties
                });
                //记录history
                this.handleHistory(marker);
                this.release();
                this.setState({ isLoading: false });
            } catch (e) {
                this.setState({ isLoading: false });
                exitMarker();
                console.error(e.message, 3);
            }
        });
    };

    //更新历史记录，用于撤销回退
    // @logDecorator({ operate: '新建质检标注', skipRenderMode: true, skipHistory:true })
    async handleHistory(marker) {
        const history = { features: [[], [marker]] };
        return history;
    }

    release = () => {
        const {
            DataLayerStore: { exitEdit, activeEditor, fetchTargetLayers },
            QCMarkerStore: { exitMarker }
        } = this.props;
        exitEdit();
        activeEditor();
        fetchTargetLayers();
        exitMarker(false);
    };

    //获取新增质检标注参数
    getParam_insert = values => {
        const {
            QCMarkerStore: { currentMarker: { data: { geometry } = {} } } = {},
            TaskStore: { activeTask: { taskId, taskFetchId, processName } } = {},
            appStore: { loginUser: { name, roleCode } } = {}
        } = this.props;
        const fixPerson = roleCode === 'producer' ? name : null;
        const qcPerson = roleCode === 'quality' ? name : null;
        const param = {
            fixStatus: 1,
            fixStatusFetch: null,
            qcStatus: 1,
            qcStatusFetch: null,
            taskId, //工作流：任务id
            fetchId: taskFetchId, //工作流：任务批次号
            geom: JSON.stringify(geometry),
            errLevel: null,
            processName, //工作流：任务所在节点
            editDesc: null,
            fixPerson,
            qcPerson,
            ...values
        };
        return param;
    };

    //获取修改质检标注参数
    getParam_update = values => {
        const {
            QCMarkerStore: { currentMarker: { data: { properties } = {} } } = {},
            TaskStore: { activeTask: { taskFetchId } } = {},
            appStore: { loginUser: { name, roleCode } } = {}
        } = this.props;
        let roleParam;
        switch (roleCode) {
            case 'producer':
                roleParam = { fixPerson: name, fixStatusFetch: taskFetchId };
                break;
            case 'quality':
                roleParam = { qcPerson: name, qcStatusFetch: taskFetchId };
                break;
            default:
                break;
        }
        const param = {
            ...properties,
            ...values,
            ...roleParam
        };
        return param;
    };

    // marker编辑状态 + 用户角色 + 是否第一次访问 = 弹窗状态
    // 根据弹窗状态，获取对应表单配置
    getFormConfig = () => {
        const {
            appStore: { loginUser: { roleCode } } = {},
            QCMarkerStore: {
                editStatus,
                currentMarker: { data: { properties: { fetchId } = {} } = {} }
            },
            TaskStore: { activeTask: { taskFetchId } = {} }
        } = this.props;
        const isCreate = editStatus === 'create';
        const isVisite = editStatus === 'visite';
        const isModify = editStatus === 'modify';
        const isQuality = roleCode === 'quality';
        const isProductor = roleCode === 'producer';
        const isFirst = fetchId == taskFetchId;

        let formConfigName;
        if (isQuality && isCreate) {
            formConfigName = 'QC_CREATE_CONFIG';
        } else if (isQuality && isFirst && isVisite) {
            formConfigName = 'QC_FIRST_VISITE_CONFIG';
        } else if (isQuality && !isFirst && isVisite) {
            formConfigName = 'QC_NOT_FIRST_VISITE_CONFIG';
        } else if (isQuality && isFirst && isModify) {
            formConfigName = 'QC_FIRST_MOD_CONFIG';
        } else if (isQuality && !isFirst && isModify) {
            formConfigName = 'QC_NOT_FIRST_MOD_CONFIG';
        } else if (isProductor && isVisite) {
            formConfigName = 'FIX_VISITE_CONFIG';
        } else if (isProductor && isModify) {
            formConfigName = 'FIX_MOD_CONFIG';
        } else {
            formConfigName = 'QC_ONLEY_READ_CONFIG';
        }

        const formConfig = QC_MARKER_FORM_CONFIG[formConfigName];
        const newFormConfig = formConfig.map(item => {
            return { ...ATTR_FORM_FIELD_MAP[item.name], ...item };
        });

        return newFormConfig;
    };

    createMarkerFooter = () => {
        return (
            <div className="footer-wrap">
                <Button type="primary" size="small" onClick={() => this.handleSubmit('insert')}>
                    保存
                </Button>
            </div>
        );
    };

    visiteMarkerFooter = () => {
        const { isQCTask } = this.props.TaskStore;
        return (
            <div className="footer-wrap">
                {isQCTask && (
                    <Button type="danger" size="small" onClick={this.handleDelete} ghost>
                        删除
                    </Button>
                )}
                <Button type="primary" size="small" onClick={this.handleModify}>
                    修改
                </Button>
            </div>
        );
    };

    modifyMarkerFooter = () => {
        return (
            <div className="footer-wrap">
                <Button
                    className="cancel-button"
                    size="small"
                    onClick={this.handleCancelModify}
                    ghost
                >
                    取消
                </Button>
                <Button type="primary" size="small" onClick={() => this.handleSubmit('update')}>
                    保存
                </Button>
            </div>
        );
    };

    render() {
        const { isLoading } = this.state;
        const { QCMarkerStore, form } = this.props;
        const {
            visible,
            editStatus,
            currentMarker: { data: { properties = {} } = {} }
        } = QCMarkerStore;
        const formConfig = this.getFormConfig();
        const renderFooter = this[`${editStatus}MarkerFooter`];

        return (
            <Modal
                title={null}
                closable={false}
                visible={visible}
                mask={false}
                maskClosable={false}
                destroyOnClose={true}
                keyboard={false}
                width={320}
                wrapClassName="qc-marker-modal"
                footer={null}
                onCancel={this.handleCancel}
            >
                <Spin tip="Loading..." spinning={isLoading}>
                    <div className="title-wrap">
                        <span>质检标注</span>
                        <Icon
                            type="close"
                            className="close-icon"
                            onCancel={this.handleCancel}
                            id="check-result-close-btn"
                        />
                    </div>
                    <div className="content-wrap">
                        <ConfigurableForm
                            form={form}
                            updateKey={editStatus}
                            initData={properties}
                            formConfig={formConfig}
                            fieldChange={{
                                fixStatus: () => this.handleSubmit('update'),
                                qcStatus: () => this.handleSubmit('update')
                            }}
                        />
                    </div>
                    {renderFooter && renderFooter()}
                </Spin>
            </Modal>
        );
    }
}

export default QCMarkerModal;
