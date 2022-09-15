import { observable, configure, action } from 'mobx';
import { DATA_LAYER_MAP } from 'src/config/dataLayerConfig';
import DataLayerStore from './dataLayerStore';
import { getEditLayerDisabled, getLayerEditAble } from 'src/util/permissionCtrl';

configure({ enforceActions: 'always' });
class RightMenuStore {
    features;
    cloneFeatures;
    @observable visible;
    @observable option;
    @observable menus;
    @observable zIndex;
    @observable isCurrentLayer;

    //清除上一次选中要素
    @action clearFeatures = () => {
        this.features = null;
        this.cloneFeatures = null;
    };

    @action show = (features, option, zIndex, isCurrentLayer, event) => {

        this.zIndex = zIndex || 'auto'; //让右键弹窗隐藏起来
        this.isCurrentLayer = isCurrentLayer; //当前选中要素和当前编辑图层是否一致
        this.features = features;
        this.cloneFeatures = JSON.parse(JSON.stringify(this.features));
        this.option = option;
        if (features.length === 0) return;
        //根据不同模式，获取不同右键菜单
        switch (DataLayerStore.editStatus) {
            case 'normal':
                this.fetchNomalMenus(event);
                break;
            case 'union_break':
                this.fetchUnionBreakMenus();
                break;
            default:
                this.fetchNomalMenus(event);
                break;
        }
        //菜单栏无内容时不显示
        if (this.menus.length !== 0) this.visible = true;
    };

    @action hide = () => {
        this.visible = false;
    };

    //根据选择要素的数量获取右键菜单
    getRightTools = (layerName, featuresL, event) => {

        let rightTools = [];
        if (featuresL === 1) {
            rightTools = DATA_LAYER_MAP[layerName].rightTools;
            if (!event) {
                rightTools = rightTools.flatMap(item => (item === 'force_delete' ? [] : [item]));
            }
        } else if (featuresL === 2) {
            //所选要素数量等于2时，隐藏批量线合并
            rightTools = DATA_LAYER_MAP[layerName].groupRightTools;
            rightTools = rightTools.flatMap(item => (item === 'batch_merge_line' ? [] : [item]));
        } else if (featuresL > 2 && featuresL <= 12) {
            //所选要素数量大于2时，隐藏合并
            rightTools = DATA_LAYER_MAP[layerName].groupRightTools;
            rightTools = rightTools.flatMap(item => (item === 'merge_line' ? [] : [item]));
        } else if (featuresL > 12) {
            //所选要素数量大于12时，隐藏批量删除
            rightTools = DATA_LAYER_MAP[layerName].groupRightTools;
            rightTools = rightTools.flatMap(item =>
                item === 'delete' || item === 'merge_line' ? [] : [item]
            );
        }
        return rightTools;
    };

    // 获取普通模式右键菜单
    @action fetchNomalMenus = event => {

        this.menus = [];
        // // 判断图层右键菜单是否可用（用户角色）
        // if (!getLayerEditAble()) return;
        // // 判断图层是否可以设置为编辑图层（是否开始任务）
        // if (getEditLayerDisabled()) return;
        const featuresL = this.features.length;
        const layerName = this.features[0].layerName;
        // 非当前编辑图层要素不显示操作列表
        if (!this.isCurrentLayer) return;
        // 获取操作列表
        let rightTools = this.getRightTools(layerName, featuresL, event);
        if (this.zIndex !== -1) {
            this.menus = rightTools; //右键菜单显示时
        } else {
            this.menus = [...this.menus, ...rightTools]; //右键菜单隐藏时
        }
    };

    // 获取联合打断模式右键菜单
    @action fetchUnionBreakMenus = () => {

        this.menus = [];
        const layerNames = ['AD_LaneDivider', 'AD_RS_Barrier'];
        const isErrorSelect = this.features.some(
            feature => !layerNames.includes(feature.layerName)
        );
        if (isErrorSelect) return;
        if (this.features.length === 1) {
            this.menus = ['break_line'];
        } else {
            this.menus = ['break_line_by_point', 'break_line_by_line'];
        }
    };

    @action delete = () => {
        this.visible = false;
        return this.features;
    };

    @action getFeatures = () => {
        return this.cloneFeatures;
    };
}

export default new RightMenuStore();
