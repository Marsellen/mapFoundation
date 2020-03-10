import { observable, configure, action } from 'mobx';
import { TOOLS_MAP } from 'src/config/ToolsConfig';
import { DATA_LAYER_MAP } from 'src/config/DataLayerConfig';

const initEditTools = TOOLS_MAP.EDIT;

configure({ enforceActions: 'always' });
class ToolCtrlStore {
    @observable tools;
    @observable drawTools = [];

    @action init = () => {
        this.tools = initEditTools;
        this.drawTools = [];
    };

    @action updateByEditLayer = (layer, userInfo) => {
        let layerName = layer && layer.layerName;
        let roleCode = userInfo && userInfo.roleCode;
        if (!DATA_LAYER_MAP[layerName]) {
            this.init();
            return;
        }

        if (roleCode == 'producer' && layerName == 'AD_Map_QC') {
            this.init();
            return;
        }

        let editTools = DATA_LAYER_MAP[layerName].tools.reduce(
            (tools, tool) => {
                tools[tool] = true;
                return tools;
            },
            {}
        );
        this.tools = {
            ...initEditTools,
            ...editTools
        };

        this.drawTools = DATA_LAYER_MAP[layerName].drawTools;
    };
}

export default new ToolCtrlStore();
