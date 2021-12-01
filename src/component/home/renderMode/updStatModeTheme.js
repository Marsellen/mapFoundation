import React from 'react';
import { observer, inject } from 'mobx-react';
import ThemeModal from 'src/component/home/renderMode/themeModal';

@inject('UpdStatModeStore')
@observer
class UpdStatModeTheme extends React.Component {
    render() {
        const { UpdStatModeStore } = this.props;
        const { indeterminate, allChecked, updStatCheckgroup, handleChecked, handleAllChecked } =
            UpdStatModeStore;
        return (
            <ThemeModal
                className="update-render-mode"
                title="更新标识专题图"
                indeterminate={indeterminate}
                allChecked={allChecked}
                selectOptions={updStatCheckgroup}
                handleChange={handleChecked}
                handleCheckAllChange={handleAllChecked}
            />
        );
    }
}

export default UpdStatModeTheme;
