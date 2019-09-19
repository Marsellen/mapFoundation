import { observable, configure, action } from 'mobx';
import { TOOLS_MAP } from 'src/config/ToolsConfig';
import { DATA_LAYER_MAP } from 'src/config/DataLayerConfig';

configure({ enforceActions: 'always' });
class ToolCtrlStore {
    @observable tools;

    @action init = () => {
        this.tools = TOOLS_MAP.EDIT;
    };

    @action updateByEditLayer = (layer, userInfo) => {
        let layerName = layer && layer.layerName;
        let roleCode = userInfo && userInfo.roleCode;
        if (!DATA_LAYER_MAP[layerName]) {
            this.tools = TOOLS_MAP.EDIT;
            return;
        }

        if (roleCode == 'producer' && layerName == 'AD_Map_QC') {
            this.tools = TOOLS_MAP.EDIT;
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
            ...TOOLS_MAP.EDIT,
            ...editTools
        };
    };
}

export default new ToolCtrlStore();
