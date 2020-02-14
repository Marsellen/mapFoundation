import React from 'react';
import { Checkbox, Icon } from 'antd';
import { observer, inject } from 'mobx-react';
import 'src/assets/less/components/render-mode.less';

@inject('DataLayerStore')
@inject('PictureShowStore')
@inject('RenderModeStore')
@observer
class RelationRenderMode extends React.Component {
    state = { isShow: false };

    render() {
        const { isShow } = this.state;
        const { PictureShowStore, RenderModeStore } = this.props;
        const { visible } = PictureShowStore;
        const { indeterminate, allChecked, relSelectOptions } = RenderModeStore;
        return (
            <div className={`relation-render-mode ${visible ? 'move' : ''}`}>
                <div className="title" onClick={this.toggleSelect}>
                    <span>关联关系专题图</span>
                    <Icon
                        type="down"
                        className={`arrow ${isShow ? 'up' : ''}`}
                    />
                </div>

                {isShow && (
                    <dl>
                        <dt>
                            <Checkbox
                                onChange={this.handleCheckAllChange}
                                indeterminate={indeterminate}
                                checked={allChecked}
                            >
                                全选
                            </Checkbox>
                        </dt>
                        <dd>
                            {relSelectOptions.map((item, index) => {
                                const { title, checked, key } = item;
                                return (
                                    <div key={`relSelectOption_${index}`}>
                                        <Checkbox
                                            checked={checked}
                                            onChange={e =>
                                                this.handleChange(e, key)
                                            }
                                        >
                                            {title}
                                        </Checkbox>
                                    </div>
                                );
                            })}
                        </dd>
                    </dl>
                )}
            </div>
        );
    }

    toggleSelect = () => {
        this.setState({
            isShow: !this.state.isShow
        });
    };

    handleChange = (e, key) => {
        const { checked } = e.target;
        const { RenderModeStore, DataLayerStore } = this.props;
        const { selectRel, resetFeatureColor } = RenderModeStore;

        DataLayerStore.clearPick();
        selectRel(checked, key);
        resetFeatureColor();
    };

    handleCheckAllChange = e => {
        const { checked } = e.target;
        const { RenderModeStore, DataLayerStore } = this.props;
        const { selectAllRel, resetFeatureColor } = RenderModeStore;

        DataLayerStore.clearPick();
        selectAllRel(checked);
        resetFeatureColor();
    };
}

export default RelationRenderMode;
