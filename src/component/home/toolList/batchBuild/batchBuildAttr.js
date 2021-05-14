import React from 'react';
import { Form } from 'antd';
import BasicAttributesForm from 'src/component/home/attributesForm/basicAttributesForm';
import SettingStore from 'src/store/setting/settingStore';
@Form.create()
class BatchBuildAttr extends React.Component {
    constructor(props) {
        super(props);
        const tableDataMap = SettingStore.getConfig('TABLE_DATA_MAP');
        this.formConfig = tableDataMap.AD_LaneDivider.filter(item => item.domType != 'Text');
    }

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
                            formConfig={this.formConfig}
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
