import React from 'react';
import { Form, Button, Modal, Spin, message } from 'antd';
import { inject, observer } from 'mobx-react';
import ConfigurableForm from 'src/component/common/configurableForm';
import { MARKER_FIELD_CONFIG, MARKER_FORM_CONFIG } from 'src/config/markerConfig/markerFormConfig';
import SeniorModal from 'src/component/common/seniorModal';
import 'less/qc-marker-modal.less';
import BuriedPoint from 'src/util/buriedPoint';
import { getImgPath } from 'src/util/taskUtils';

const formLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
};

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

    //右上角关闭窗口埋点
    buriedPointCancel = e => {
        if (!e) return;
        const { QCMarkerStore } = this.props;
        switch (QCMarkerStore.editStatus) {
            case 'create':
                BuriedPoint.toolBuriedPointEnd('new_qc_marker', 'close');
                break;
            case 'modify':
                BuriedPoint.toolBuriedPointEnd('modify_qc_marker', 'close');
                break;
            default:
                break;
        }
    };

    //loading开始埋点
    buriedPointLoadStart = type => {
        switch (type) {
            case 'insert':
                BuriedPoint.toolLoadBuriedPointStart('new_qc_marker', 'save_button');
                break;
            case 'modify':
                BuriedPoint.toolLoadBuriedPointStart('modify_qc_marker', 'save_button');
                break;
            case 'shortcut_modity':
                BuriedPoint.toolBuriedPointStart('modify_qc_marker', 'shortcut_modity');
                BuriedPoint.toolLoadBuriedPointStart('modify_qc_marker', 'shortcut_modity');
                break;
            default:
                break;
        }
    };

    //关闭
    handleCancel = e => {
        const { QCMarkerStore } = this.props;
        this.buriedPointCancel(e);
        QCMarkerStore.exitMarker();
    };

    handleCancelModify = () => {
        const { QCMarkerStore, DataLayerStore } = this.props;
        QCMarkerStore.setEditStatus('visite', 'cancel');
        if (DataLayerStore.editType === 'choose_error_feature') {
            DataLayerStore.exitChooseErrorFeature();
        }
    };

    handleModify = () => {
        const { QCMarkerStore } = this.props;
        QCMarkerStore.setEditStatus('modify', 'modify_button');
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
            DataLayerStore,
            QCMarkerStore: {
                currentMarker,
                currentMarker: { uuid, data: { properties, properties: { id } } = {} },
                deleteMarker,
                updateMarkerList
            }
        } = this.props;
        try {
            this.setState({ isLoading: true });
            BuriedPoint.toolBuriedPointStart('modify_qc_marker', 'delete_button');
            BuriedPoint.toolLoadBuriedPointStart('modify_qc_marker', 'conform_delete');
            //添加到数据库
            const res = await deleteMarker({ id });
            if (!res) throw Error('标注delete失败');
            //通过uuid删除要素
            window.markerLayer.layer.removeFeatureById(uuid);
            //更新质检标注列表
            updateMarkerList({ type: 'delete', id, marker: properties });
            //记录history
            this.handleHistory(currentMarker);
            BuriedPoint.toolLoadBuriedPointEnd('modify_qc_marker', 'success');
            BuriedPoint.toolBuriedPointEnd('modify_qc_marker', 'success');
            this.release();
            DataLayerStore.editor.clear();
            this.setState({ isLoading: false });
            message.success('已删除质检标注');
        } catch (e) {
            BuriedPoint.toolLoadBuriedPointEnd('modify_qc_marker', 'error');
            BuriedPoint.toolBuriedPointEnd('modify_qc_marker', 'error');
            this.setState({ isLoading: false });
            this.handleCancel();
            console.error(e.message, 3);
        }
    };

    handleChange = (name, value, formData) => {
        this.handleSubmit('shortcut_modity', false, formData);
    };

    handleSubmit = (type, isExit = true, formData = {}) => {
        const {
            TaskStore,
            QCMarkerStore,
            QCMarkerStore: {
                updateCurrentMarker,
                currentMarker: { data: { properties: { id } = {} } = {} },
                updateMarkerList
            }
        } = this.props;
        const { activeTask } = TaskStore;
        const isInsert = type === 'insert';
        if (!isInsert && !id) return; //修改marker时，没有id，不可修改
        const markerType = isInsert ? 'insert' : 'update';
        const toolType = isInsert ? 'new_qc_marker' : 'modify_qc_marker';
        this.props.form.validateFields(async (err, values) => {
            if (err) return;
            try {
                this.buriedPointLoadStart(type);
                this.setState({ isLoading: true });
                formData = { ...values, ...formData };
                const param = this[`getParam_${markerType}`](formData);
                //添加到数据库
                const res = await QCMarkerStore[`${markerType}Marker`](param);
                if (!res || !res.data) throw Error(`标注${markerType}失败`);
                const qcPath = getImgPath(activeTask, res.data?.qcPath);
                const newProperties = { ...param, ...res.data, qcPath };
                //更新currentMarker
                const marker = updateCurrentMarker(newProperties);
                //将添加的属性更新到sdk
                window.markerLayer.layer.updateFeatures([marker]);
                //更新质检标注列表
                updateMarkerList({
                    type: markerType,
                    id,
                    marker: marker.data.properties
                });
                //记录history
                this.handleHistory(marker);
                BuriedPoint.toolLoadBuriedPointEnd(toolType, 'success');
                BuriedPoint.toolBuriedPointEnd(toolType, 'success');
                isExit && this.release();
                this.setState({ isLoading: false });
                message.success(isInsert ? '质检标注生成' : '质检标注修改成功');
            } catch (e) {
                BuriedPoint.toolLoadBuriedPointEnd(toolType, 'error');
                BuriedPoint.toolBuriedPointEnd(toolType, 'error');
                this.setState({ isLoading: false });
                this.handleCancel();
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
        const { QCMarkerStore } = this.props;
        QCMarkerStore.exitMarker();
    };

    transforString = () => {
        const reg = /^[\'\"]+|[\'\"]+$/g;
        let str = window.map.viewer.renderer.domElement.toDataURL('image/png');
        str = str.replace(reg, '');
        return str;
    };

    //获取新增质检标注参数
    getParam_insert = values => {
        const qcPath = this.transforString();
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
            qcPath,
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
        const { index, ...markerProperties } = properties;
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
            fixStatus: 1,
            fixStatusFetch: null,
            qcStatus: 1,
            qcStatusFetch: null,
            errLevel: null,
            editDesc: null,
            fixPerson: null,
            qcPerson: null,
            fieldName: null,
            ...markerProperties,
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
            TaskStore: { activeTask: { taskFetchId, processName, postProcess } = {} }
        } = this.props;
        const isCreate = editStatus === 'create';
        const isVisite = editStatus === 'visite';
        const isModify = editStatus === 'modify';
        const isQuality = roleCode === 'quality';
        const isProductor = roleCode === 'producer';
        const isMsQcTask = processName === 'imp_check_after_recognition';
        const isMbQcTask = processName === 'imp_check_after_manbuild'; 
        const isSecondQcTask = processName === 'imp_map_second_check'; 

        const isSecondQcBack = postProcess === 2; // 是否是二次质检环节打回的任务
        const isFirst = fetchId == taskFetchId;

        let formConfigName;
        if (isQuality && isCreate && isMsQcTask) {
            formConfigName = 'MS_QC_CREATE_CONFIG';
        } else if (isQuality && isCreate && isMbQcTask && !isSecondQcBack) {
            formConfigName = 'MB_QC_CREATE_CONFIG';
        } else if (isQuality && isCreate && isMbQcTask && isSecondQcBack) {
            formConfigName = 'SECOND_QC_CREATE_CONFIG';
        } else if (isQuality && isCreate && isSecondQcTask && isDesignatedTask) {
            formConfigName = 'SECOND_QC_CREATE_CONFIG';
        } else if (isQuality && isFirst && isVisite && isMsQcTask) {
            formConfigName = 'MS_QC_FIRST_VISITE_CONFIG';
        } else if (isQuality && isFirst && isVisite && isMbQcTask && !isSecondQcBack) {
            formConfigName = 'MB_QC_FIRST_VISITE_CONFIG';
        } else if (isQuality && isFirst && isVisite && isMbQcTask && isSecondQcBack) {
            formConfigName = 'SECOND_QC_FIRST_VISITE_CONFIG';
        } else if (isQuality && isFirst && isVisite && isSecondQcTask && isDesignatedTask) {
            formConfigName = 'SECOND_QC_FIRST_VISITE_CONFIG';
        } else if (isQuality && !isFirst && isVisite && isMsQcTask) {
            formConfigName = 'MS_QC_NOT_FIRST_VISITE_CONFIG';
        } else if (isQuality && !isFirst && isVisite && isMbQcTask && !isSecondQcBack) {
            formConfigName = 'MB_QC_NOT_FIRST_VISITE_CONFIG';
        } else if (isQuality && !isFirst && isVisite && isMbQcTask && isSecondQcBack) {
            formConfigName = 'SECOND_QC_NOT_FIRST_VISITE_CONFIG';
        } else if (isQuality && !isFirst && isVisite && isSecondQcTask && isDesignatedTask) {
            formConfigName = 'SECOND_QC_NOT_FIRST_VISITE_CONFIG';
        } else if (isQuality && isFirst && isModify && isMsQcTask) {
            formConfigName = 'MS_QC_FIRST_MOD_CONFIG';
        } else if (isQuality && isFirst && isModify && isMbQcTask && !isSecondQcBack) {
            formConfigName = 'MB_QC_FIRST_MOD_CONFIG';
        } else if (isQuality && isFirst && isModify && isMbQcTask && isSecondQcBack) {
            formConfigName = 'SECOND_QC_FIRST_MOD_CONFIG';
        } else if (isQuality && isFirst && isModify && isSecondQcTask && isDesignatedTask) {
            formConfigName = 'SECOND_QC_FIRST_MOD_CONFIG';
        } else if (isProductor && isVisite) {
            formConfigName = 'FIX_VISITE_CONFIG';
        } else if (isProductor && isModify) {
            formConfigName = 'FIX_MOD_CONFIG';
        } else {
            formConfigName = 'QC_READ_ONLEY_CONFIG';
        }
        const formConfig = MARKER_FORM_CONFIG()[formConfigName];
        const newFormConfig = formConfig.map(item => {
            return { ...MARKER_FIELD_CONFIG()[item.name], ...item };
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
        const {
            QCMarkerStore: {
                currentMarker: { data: { properties: { fetchId } = {} } = {} }
            },
            TaskStore: { isQcTask, activeTask: { taskFetchId } = {} }
        } = this.props;
        const isFirst = fetchId == taskFetchId;

        return (
            <div className="footer-wrap">
                {isQcTask && isFirst && (
                    <Button type="danger" size="small" onClick={this.handleDelete} ghost>
                        删除
                    </Button>
                )}
                {!(isQcTask && !isFirst) && (
                    <Button type="primary" size="small" onClick={this.handleModify}>
                        修改
                    </Button>
                )}
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
                <Button type="primary" size="small" onClick={() => this.handleSubmit('modify')}>
                    保存
                </Button>
            </div>
        );
    };

    resizeCallback = () => {
        if (this.state.resized) return;
        this.setState({ resized: true });
    };

    render() {
        const { isLoading, resized } = this.state;
        const { QCMarkerStore, form } = this.props;
        const {
            visible,
            editStatus,
            currentMarker: { data: { properties = {} } = {} }
        } = QCMarkerStore;
        const formConfig = this.getFormConfig();
        const renderFooter = this[`${editStatus}MarkerFooter`];

        return (
            <SeniorModal
                key={`${editStatus}_${properties.id}`}
                title="质检标注"
                zIndex={1001}
                visible={visible}
                mask={false}
                maskClosable={false}
                keyboard={false}
                wrapClassName={`qc-marker-modal ${resized && 'resized'}`}
                footer={null}
                onCancel={this.handleCancel}
                resizeOptions={{ HResizeable: false, minHeight: 500 }}
                resizeCallback={this.resizeCallback}
            >
                <Spin tip="Loading..." spinning={isLoading}>
                    <div className="content-wrap">
                        <ConfigurableForm
                            form={form}
                            formLayout={formLayout}
                            initData={properties}
                            formConfig={formConfig}
                            fieldChange={{
                                fixStatus: this.handleChange,
                                qcStatus: this.handleChange,
                                qcLink: this.handleChange
                            }}
                        />
                    </div>
                    {renderFooter && renderFooter()}
                </Spin>
            </SeniorModal>
        );
    }
}

export default QCMarkerModal;
