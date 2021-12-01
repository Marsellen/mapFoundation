import React from 'react';
import { Checkbox, Icon } from 'antd';
import { observer, inject } from 'mobx-react';
import 'src/asset/less/render-mode.less';
import IconFont from 'src/component/common/iconFont';

@inject('AttributeStore')
@inject('DataLayerStore')
@observer
class ThemeModal extends React.Component {
    state = { isShow: true };

    render() {
        const { isShow } = this.state;
        const { className, title, indeterminate, allChecked, selectOptions } = this.props;
        return (
            <div className={`render-mode-modal ${className} ${isShow ? '' : 'hide'}`}>
                <div className="title" onClick={this.toggleSelect}>
                    <p>
                        <IconFont type="icon-guanlianguanxi" className="icon" />
                        {isShow && <span>{title}</span>}
                    </p>
                    <Icon type="double-left" style={{ fontSize: '12px' }} className="arrow" />
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
                            {selectOptions.map((item, index) => {
                                const { title, checked, key } = item;
                                return (
                                    <div key={`relSelectOption_${index}`}>
                                        <Checkbox
                                            checked={checked}
                                            onChange={e => this.handleChange(e, key)}
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

    //专题图的展开收起
    toggleSelect = () => {
        this.setState({
            isShow: !this.state.isShow
        });
    };
    //专题图单选toggle事件
    handleChange = (e, key) => {
        const { checked } = e.target;
        const { DataLayerStore, AttributeStore, handleChange } = this.props;
        //清除要素选中效果
        DataLayerStore.clearPick();
        //隐藏属性窗口
        AttributeStore.hide('other_close');
        //获取专题图已选图层，判断是否全选
        handleChange(checked, key);
        //取消选择
        DataLayerStore.unPick();
    };
    //专题图全选toggle事件
    handleCheckAllChange = e => {
        const { checked } = e.target;
        const { DataLayerStore, AttributeStore, handleCheckAllChange } = this.props;
        //清除要素选中效果
        DataLayerStore.clearPick();
        //隐藏属性窗口
        AttributeStore.hide('other_close');
        //获取专题图已选图层，判断是否全选
        handleCheckAllChange(checked);
        //取消选择
        DataLayerStore.unPick();
    };
}

export default ThemeModal;
