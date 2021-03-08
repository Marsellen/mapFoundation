import { Select } from 'antd';
import React from 'react';
import SeniorModal from 'src/components/SeniorModal';
import EditorService from 'src/services/EditorService';

import 'less/components/arrow-template-modal.less';

class TemplateModal extends React.Component {
    state = { templateMap: {} };

    componentDidMount() {
        this.fetchTemplate();
    }

    render() {
        const { visible } = this.props;
        const { templateMap, templateType, templateSku } = this.state;
        const templateTypes = Object.keys(templateMap);
        const templateSkus = templateMap[templateType]?.map(temp => temp.templateSku) || [];
        return (
            <SeniorModal
                title="选择箭头模板"
                wrapClassName="arrow-template-modal-wrap"
                visible={visible}
                closable={false}
                footer={null}
                mask={false}
                maskClosable={false}
                className="small-modal"
            >
                <div className="select-box">
                    模板类型
                    <Select
                        placeholder="选择模板类型"
                        onChange={this.templateTypeOnChange}
                        value={templateType}
                        className="select-input"
                    >
                        {templateTypes.map(t => (
                            <Select.Option key={t}>{t}</Select.Option>
                        ))}
                    </Select>
                </div>
                <div className="select-box">
                    模板名称
                    <Select
                        placeholder="选择模板名称"
                        onChange={this.templateSkuOnChange}
                        value={templateSku}
                        className="select-input"
                    >
                        {templateSkus.map(name => (
                            <Select.Option key={name}>{name}</Select.Option>
                        ))}
                    </Select>
                    米
                </div>
            </SeniorModal>
        );
    }

    async fetchTemplate() {
        let { data } = await EditorService.queryArrowTemplate();
        if (!data || data.length == 0) return;
        let templateMap = {};
        data.forEach(temp => {
            let templateType = temp.templateType;
            if (!templateMap[templateType]) {
                templateMap[templateType] = [];
            }
            templateMap[templateType].push(temp);
        });
        let { templateType, templateSku } = data[0];
        this.setState({ templateMap, templateType, templateSku });
        this.onChange({ templateType, templateSku });
    }

    templateTypeOnChange = value => {
        const { templateMap, templateType, templateSku } = this.state;
        let template = templateMap[templateType].find(temp => temp.templateSku == templateSku);
        let sameSizeTemplate = templateMap[value].find(
            temp => temp.templateSize === template.templateSize
        );
        if (sameSizeTemplate) {
            this.setState({ templateType: value, templateSku: sameSizeTemplate.templateSku });
            this.onChange({ templateType: value, templateSku: sameSizeTemplate.templateSku });
        } else {
            let templateSku = templateMap[value][0].templateSku;
            this.setState({ templateType: value, templateSku });
            this.onChange({ templateType: value, templateSku });
        }
    };

    templateSkuOnChange = value => {
        this.setState({ templateSku: value });
        this.onChange({ templateType: this.state.templateType, templateSku: value });
    };

    onChange = ({ templateType, templateSku }) => {
        const { templateMap } = this.state;
        let template = templateMap[templateType].find(temp => temp.templateSku == templateSku);
        this.props.onChange(template);
    };
}

export default TemplateModal;
