import React from 'react';
import { observer, inject } from 'mobx-react';
import ThemeModal from 'src/component/home/renderMode/themeModal';

@inject('RenderModeStore')
@observer
class RelModeTheme extends React.Component {
    render() {
        const { RenderModeStore } = this.props;
        const { indeterminate, allChecked, relSelectOptions, selectRel, selectAllRel } =
            RenderModeStore;
        return (
            <ThemeModal
                className="relation-render-mode"
                title="关联关系专题图"
                indeterminate={indeterminate}
                allChecked={allChecked}
                selectOptions={relSelectOptions}
                handleChange={selectRel}
                handleCheckAllChange={selectAllRel}
            />
        );
    }
}

export default RelModeTheme;
