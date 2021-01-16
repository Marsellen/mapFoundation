import React from 'react';
import { observer, inject } from 'mobx-react';
import { Form } from 'antd';
import { FORM_CONFIG } from 'src/config/BatchBuildConfig';
import ConfigurableForm from 'src/components/ConfigurableForm';

const formLayout = {
    labelCol: { span: 10 },
    wrapperCol: { span: 14 }
};

@Form.create()
@inject('DataLayerStore')
@inject('BatchBuildStore')
@observer
class BatchBuildAttr extends React.Component {
    render() {
        const { form, activeFeature } = this.props;
        return (
            <div className="batch-build-attr-wrap">
                <div className="batch-build-attr-title">属性设置</div>
                <div className="batch-build-attr-content">
                    <ConfigurableForm
                        formLayout={formLayout}
                        form={form}
                        initData={activeFeature?.attr}
                        formConfig={FORM_CONFIG}
                        fieldChange={{ default: this.props.formItemChange }}
                    />
                </div>
            </div>
        );
    }
}

export default BatchBuildAttr;
