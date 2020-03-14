import React from 'react';
import { Checkbox, Icon } from 'antd';
import { observer, inject } from 'mobx-react';
import 'src/assets/less/components/render-mode.less';
import IconFont from 'src/components/IconFont';

@inject('AttributeStore')
@inject('DataLayerStore')
@inject('PictureShowStore')
@inject('RenderModeStore')
@observer
class RelationRenderMode extends React.Component {
    state = { isShow: true };

    render() {
        const { isShow } = this.state;
        const { PictureShowStore, RenderModeStore } = this.props;
        const { visible } = PictureShowStore;
        const { indeterminate, allChecked, relSelectOptions } = RenderModeStore;
        return (
            <div className={`relation-render-mode ${visible ? 'move' : ''}`}>
                <div
                    className={`title ${isShow ? 'on' : ''}`}
                    onClick={this.toggleSelect}>
                    <p>
                        <IconFont type="icon-guanlianguanxi" className="icon" />
                        {isShow && <span>关联关系专题图</span>}
                    </p>
                    <Icon
                        type="double-right"
                        style={{ fontSize: '12px' }}
                        className="arrow"
                    />
                </div>

                {isShow && (
                    <dl>
                        <dt>
                            <Checkbox
                                onChange={this.handleCheckAllChange}
                                indeterminate={indeterminate}
                                checked={allChecked}>
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
                                            }>
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
    //专题图的展开收起
    toggleSelect = () => {
        this.setState({
            isShow: !this.state.isShow
        });
    };
    //专题图单选toggle事件
    handleChange = (e, key) => {
        const { checked } = e.target;
        const { RenderModeStore, DataLayerStore, AttributeStore } = this.props;
        const { selectRel } = RenderModeStore;
        //清除要素选中效果
        DataLayerStore.clearPick();
        //隐藏属性窗口
        AttributeStore.hide();
        //获取专题图已选图层，判断是否全选
        selectRel(checked, key);
        //取消选择
        DataLayerStore.unPick();
    };
    //专题图全选toggle事件
    handleCheckAllChange = e => {
        const { checked } = e.target;
        const { RenderModeStore, DataLayerStore, AttributeStore } = this.props;
        const { selectAllRel } = RenderModeStore;
        //清除要素选中效果
        DataLayerStore.clearPick();
        //隐藏属性窗口
        AttributeStore.hide();
        //获取专题图已选图层，判断是否全选
        selectAllRel(checked);
        //取消选择
        DataLayerStore.unPick();
    };
}

export default RelationRenderMode;
