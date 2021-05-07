import React from 'react';
import { Form } from 'antd';
import { TABLE_DATA_MAP } from 'config/ADMapDataConfig';
import BasicAttributesForm from 'src/component/home/attributesForm/basicAttributesForm';

const formConfig = TABLE_DATA_MAP.AD_LaneDivider.filter(item => item.domType != 'Text');
@Form.create()
class BatchBuildAttr extends React.Component {
    render() {
        const { form, activeFeature, formItemChange } = this.props;
        return (
            <div className="batch-build-attr-wrap">
                <div className="batch-build-attr-title">属性设置</div>
                <div className="batch-build-attr-content">
                    <Form hideRequiredMark={true} colon={false} labelAlign="left">
                        <BasicAttributesForm
                            form={form}
                            initData={activeFeature?.attr}
                            formConfig={formConfig}
                            fieldChange={{ default: formItemChange }}
                            formStatus={true}
                        />
                    </Form>
                </div>
            </div>
        );
    }
}

export default BatchBuildAttr;
