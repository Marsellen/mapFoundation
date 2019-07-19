import { observable, configure, action } from 'mobx';
import { TOOLS_MAP } from 'src/config/ToolsConfig';
import { DATA_LAYER_MAP } from 'src/config/DataLayerConfig';

configure({ enforceActions: 'always' });
class ToolCtrlStore {
    @observable tools;

    @action init = () => {
        this.tools = TOOLS_MAP.EDIT;
    };

    @action updateByEditLayer = layer => {
        if (!layer || !DATA_LAYER_MAP[layer.layerName]) {
            this.tools = TOOLS_MAP.EDIT;
            return;
        }
        let editTools = DATA_LAYER_MAP[layer.layerName].tools.reduce(
            (tools, tool) => {
                tools[tool] = true;
                return tools
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
