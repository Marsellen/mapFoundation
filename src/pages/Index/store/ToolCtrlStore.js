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
        if (!layer) {
            this.tools = TOOLS_MAP.EDIT;
            return;
        }
        this.tools = {
            ...TOOLS_MAP.EDIT,
            [DATA_LAYER_MAP[layer.layerName].type]: true
        };
    };
}

export default new ToolCtrlStore();
