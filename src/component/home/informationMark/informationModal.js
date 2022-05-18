import React from 'react';
import { Form, Button, Modal, Spin, message } from 'antd';
import { inject, observer } from 'mobx-react';
import ConfigurableForm from 'src/component/common/configurableForm';
import {
    INFOMATION_FIELD_CONFIG,
    INFOMATION_FORM_CONFIG
} from 'src/config/informationConfig/informationFormConfig';
import SeniorModal from 'src/component/common/seniorModal';
import 'less/information-modal.less';
import BuriedPoint from 'src/util/buriedPoint';
import { getImgPath } from 'src/util/taskUtils';
import WKT from 'terraformer-wkt-parser';

const formLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
};

@Form.create()
@inject('appStore')
@inject('TaskStore')
@inject('InformationStore')
@inject('DataLayerStore')
@observer
class InformationModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isLoading: false };
        this.handleHistory = this.handleHistory.bind(this);
    }

    //右上角关闭窗口埋点
    buriedPointCancel = e => {
        if (!e) return;
        const { InformationStore } = this.props;
        switch (InformationStore.editStatus) {
            case 'create':
                BuriedPoint.toolBuriedPointEnd('new_information_mark', 'close');
                break;
            case 'modify':
                BuriedPoint.toolBuriedPointEnd('modify_information_mark', 'close');
                break;
            default:
                break;
        }
    };

    //loading开始埋点
    buriedPointLoadStart = type => {
        switch (type) {
            case 'insert':
                BuriedPoint.toolLoadBuriedPointStart('new_information_mark', 'save_button');
                break;
            case 'modify':
                BuriedPoint.toolLoadBuriedPointStart('modify_information_mark', 'save_button');
                break;
            case 'shortcut_modity':
                BuriedPoint.toolBuriedPointStart('modify_information_mark', 'shortcut_modity');
                BuriedPoint.toolLoadBuriedPointStart('modify_information_mark', 'shortcut_modity');
                break;
            default:
                break;
        }
    };

    //关闭
    handleCancel = e => {
        const { InformationStore } = this.props;
        this.buriedPointCancel(e);
        InformationStore.exitMarker();
    };

    handleCancelModify = () => {
        const { InformationStore, DataLayerStore } = this.props;
        InformationStore.setEditStatus('visite', 'cancel');
        if (DataLayerStore.editType === 'choose_inform_feature') {
            DataLayerStore.exitChooseInformFeature();
        }
        if (DataLayerStore.editType === 'change_inform_feature') {
            DataLayerStore.exitChangeInformFeature();
        }
    };

    handleModify = () => {
        const { InformationStore } = this.props;
        InformationStore.setEditStatus('modify', 'modify_button');
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
            InformationStore: {
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
            window.informationLayer.layer.removeFeatureById(uuid);
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

    transforString = () => {
        const reg = /^[\'\"]+|[\'\"]+$/g;
        let str = window.map.viewer.renderer.domElement.toDataURL('image/png');
        str = str.replace(reg, '');
        return str;
    };

    //获取新增质检标注参数
    getParam_insert = values => {
        const {
            InformationStore: { currentMarker: { data: { geometry } = {} } } = {},
            TaskStore: { activeTask: { taskId } } = {},
            appStore: { loginUser: { name, username } } = {}
        } = this.props;
        const editTaskId = taskId;
        const param = {
            createUser: username,
            editTaskId,
            detailedView: 1, //1 审批通过
            source: 3, //3 编辑平台反馈
            featureWkt: WKT.convert(geometry),
            ...values
        };
        return param;
    };

    //获取修改质检标注参数
    getParam_update = values => {};

    handleSubmit = (type, isExit = true, formData = {}) => {
        const {
            InformationStore,
            InformationStore: {
                toggleSubSuc,
                updateCurrentMarker,
                currentMarker: { data: { properties: { id } = {} } = {} },
                updateMarkerList
            }
        } = this.props;
        const isInsert = type === 'insert';
        if (!isInsert && !id) return; //修改marker时，没有id，不可修改
        const markerType = isInsert ? 'insert' : 'update';
        const toolType = isInsert ? 'new_information_mark' : 'modify_information_mark';
        this.props.form.validateFields(async (err, values) => {
            if (err) return;
            try {
                this.buriedPointLoadStart(type);
                this.setState({ isLoading: true });
                formData = { ...values, ...formData };
                const param = this[`getParam_${markerType}`](formData);
                //添加到数据库
                const res = await InformationStore[`${markerType}Marker`](param);
                if (!res || res.code !== 1) throw Error(`标注${markerType}失败`);
                const newProperties = { ...param, geom: param?.featureWkt, ...res.data };
                //更新currentMarker
                const marker = updateCurrentMarker(newProperties);
                //将添加的属性更新到sdk
                window.informationLayer.layer.updateFeatures([marker]);
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
                toggleSubSuc(true);
                isExit && this.release();
                this.setState({ isLoading: false });
                message.success(isInsert ? '资料问题录入成功' : '资料问题修改成功');
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
        const { InformationStore } = this.props;
        InformationStore.exitMarker();
    };

    // marker编辑状态 + 用户角色 + 是否第一次访问 = 弹窗状态
    // 根据弹窗状态，获取对应表单配置
    getFormConfig = () => {
        const {
            appStore: { loginUser: { roleCode } } = {},
            InformationStore: {
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
        if (isCreate) {
            formConfigName = 'MS_QC_CREATE_CONFIG';
        } else {
            formConfigName = 'QC_READ_ONLEY_CONFIG';
        }
        const formConfig = INFOMATION_FORM_CONFIG()[formConfigName];
        const newFormConfig = formConfig.map(item => {
            return { ...INFOMATION_FIELD_CONFIG()[item.name], ...item };
        });

        return newFormConfig;
    };

    createMarkerFooter = () => {
        return (
            <div className="footer-wrap">
                <Button type="primary" size="small" onClick={() => this.handleSubmit('insert')}>
                    保存
                </Button>
                <p className="inform-desc">保存后可在底图智能运营平台中情报列表查看</p>
            </div>
        );
    };

    visiteMarkerFooter = () => {
        const {
            InformationStore: {
                currentMarker: { data: { properties: { fetchId } = {} } = {} }
            },
            TaskStore: { isQcTask, activeTask: { taskFetchId } = {} }
        } = this.props;
        const isFirst = fetchId == taskFetchId;

        return (
            <div className="footer-wrap">
                {/* {isQcTask && isFirst && (
                    <Button type="danger" size="small" onClick={this.handleDelete} ghost>
                        删除
                    </Button>
                )}
                {!(isQcTask && !isFirst) && (
                    <Button type="primary" size="small" onClick={this.handleModify}>
                        修改
                    </Button>
                )} */}
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
        const { InformationStore, form } = this.props;
        const {
            visible,
            editStatus,
            currentMarker: { data: { properties = {} } = {} }
        } = InformationStore;
        const formConfig = this.getFormConfig();
        console.log('editStatus:', editStatus);
        const renderFooter = this[`${editStatus}MarkerFooter`];
        // const renderFooter = this.createMarkerFooter;

        return (
            <SeniorModal
                key={`${editStatus}_${properties.id}`}
                title="资料问题情报"
                zIndex={1001}
                visible={visible}
                mask={false}
                maskClosable={false}
                keyboard={false}
                wrapClassName={`inform-modal ${resized && 'resized'}`}
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

export default InformationModal;
