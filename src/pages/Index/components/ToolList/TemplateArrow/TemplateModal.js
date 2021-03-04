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
        const { templateMap, templateType, templateSize } = this.state;
        const templateTypes = Object.keys(templateMap);
        const templateSizes = templateMap[templateType]?.map(temp => temp.templateSize) || [];
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
                    模板尺寸
                    <Select
                        placeholder="选择模板尺寸"
                        onChange={this.templateSizeOnChange}
                        value={templateSize}
                        className="select-input"
                    >
                        {templateSizes.map(size => (
                            <Select.Option key={size}>{size}</Select.Option>
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
            temp.templateSize = temp.templateSize.toFixed(2);
            templateMap[templateType].push(temp);
        });
        let { templateType, templateSize } = data[0];
        this.setState({ templateMap, templateType, templateSize });
        this.onChange({ templateType, templateSize });
    }

    templateTypeOnChange = value => {
        const { templateMap, templateSize } = this.state;
        let hasSameSize = templateMap[value].some(temp => temp.templateSize === templateSize);
        if (hasSameSize) {
            this.setState({ templateType: value });
            this.onChange({ templateType: value, templateSize: templateSize });
        } else {
            let templateSize = templateMap[value][0].templateSize;
            this.setState({ templateType: value, templateSize: templateSize });
            this.onChange({ templateType: value, templateSize: templateSize });
        }
    };

    templateSizeOnChange = value => {
        this.setState({ templateSize: value });
        this.onChange({ templateType: this.state.templateType, templateSize: value });
    };

    onChange = ({ templateType, templateSize }) => {
        const { templateMap } = this.state;
        let template = templateMap[templateType].find(temp => temp.templateSize == templateSize);
        this.props.onChange(template);
    };
}

export default TemplateModal;
