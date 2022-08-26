import React from 'react';
import { Button, Icon, Modal } from 'antd';
import EditableCard from './editableCard';
import _ from 'lodash';
import NewAttrModal from './newAttrModal';
import 'less/attributes-modal.less';

class AttrsForm extends React.Component {

    newAttrs = attrType => {
        return () => {
            this.batchAssign = false;
            this.modal.show(attrType);
        };
    };
    // 批量限速修改
    batchAssignEdit = (attrType, title) => {
        return () => {
            this.modal.title = title;
            this.modal.batchAssign = this.batchAssign;
            this.modal.show(attrType);
        };
    };
    // 批量删除
    onBatchAssignDelete = (value) => {
        return () => {
            this.batchAssign = false;
            Modal.confirm({
                title: '删除后无法撤回，确认删除？',
                okText: '确定',
                cancelText: '取消',
                onOk: () => {
                    const { onBatchAssignDelete } = this.props;
                    onBatchAssignDelete(value);
                }
            });

        };


    };



    onDelete = attrType => {
        const { form, onDelete } = this.props;
        return value => {
            onDelete(attrType, value);
            let fieldKey = 'attrs.' + attrType;
            const records = form.getFieldValue(fieldKey);
            form.setFieldsValue({
                [fieldKey]: records.filter(item => item.sourceId !== value.sourceId)
            });
        };
    };

    render = () => {
        const { form, onOk, attrs, attrType, readonly, updateKey, batchAssign } = this.props;
        this.batchAssign = batchAssign;


        const newEnable = !readonly;
        const text = attrType === 'AD_Lane_RS' ? '交通限制信息' : '交通限速信息';
        const isAD_Lane_Speed = attrType === 'AD_Lane_Speed' ? true : false;

        return (
            <div className="attr_box">
                <p>{text}   </p>
                {batchAssign && isAD_Lane_Speed && (
                    <div> <div className="attr">
                        最高限速批量修改
                        {
                            !readonly && (
                                <Button onClick={this.batchAssignEdit(attrType, '最高限速批量修改')} className="newEdit-edit" title="编辑">
                                    <Icon type="edit" />
                                </Button>
                            )}
                        {!readonly && (
                            <Button onClick={this.onBatchAssignDelete(1)} className="newEdit-del" title="删除">
                                <Icon type="delete" />
                            </Button>
                        )}
                    </div>
                        <div className="attr">
                            最低限速批量修改
                            {
                                !readonly && (
                                    <Button onClick={this.batchAssignEdit(attrType, '最低限速批量修改')} className="newEdit-edit" title="编辑">
                                        <Icon type="edit" />
                                    </Button>
                                )}
                            {!readonly && (
                                <Button onClick={this.onBatchAssignDelete(2)} className="newEdit-del" title="删除">
                                    <Icon type="delete" />
                                </Button>
                            )}
                        </div></div>

                )}

                {(attrs[attrType] || []).map((rs, index) =>
                    form.getFieldDecorator(`attrs.${attrType}[${index}]`, {
                        initialValue: {
                            ...rs,
                            properties: {
                                ...rs.properties
                            }
                        }
                    })(
                        <EditableCard
                            key={updateKey + Math.random()}
                            index={index}
                            readonly={readonly}
                            onDelete={this.onDelete(attrType)}

                        />

                    )
                )}

                {newEnable && (
                    <div className="attr-form-btn">
                        <Button onClick={this.newAttrs(attrType)} title={`添加交通${text}`}>
                            <Icon type="plus" />
                        </Button>
                    </div>
                )}
                <NewAttrModal onRef={modal => (this.modal = modal)} handleSave={onOk} />
            </div>
        );
    };
}

export default AttrsForm;
