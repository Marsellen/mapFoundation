import { observable, configure, action } from 'mobx';
import { TOOLS_MAP } from 'src/config/ToolsConfig';
import { DATA_LAYER_MAP } from 'src/config/DataLayerConfig';

configure({ enforceActions: 'always' });
class ToolCtrlStore {
    @observable tools;

    @action init = () => {
        this.tools = TOOLS_MAP.EDIT;
    };

    // @param toolItem={RESOURCE_LOADER: false}
    @action updateEditTool = toolItem => {
        if (!toolItem) return;
        this.tools = { ...this.tools, ...toolItem };
    };

    @action updateByEditLayer = ({ layerName } = {}, { roleCode } = {}) => {
        if (!DATA_LAYER_MAP[layerName]) {
            this.tools = this.tools;
            return;
        }

        if (roleCode == 'producer' && layerName == 'AD_Map_QC') {
            this.tools = this.tools;
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
            ...this.tools,
            ...editTools
        };
    };
}

export default new ToolCtrlStore();
