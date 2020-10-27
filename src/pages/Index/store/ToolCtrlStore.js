import { observable, configure, action } from 'mobx';
import { TOOLS_MAP } from 'src/config/ToolsConfig';
import { DATA_LAYER_MAP } from 'src/config/DataLayerConfig';
import TaskStore from './TaskStore';
import appStore from 'src/store/appStore';

configure({ enforceActions: 'always' });
class ToolCtrlStore {
    @observable tools;
    @observable drawTools = [];
    @observable batchTools = [];

    @action init = () => {
        this.tools = this.getEditTools();
        this.drawTools = [];
        this.batchTools = [];
    };

    @action updateByEditLayer = layer => {
        let layerName = layer && layer.layerName;
        if (!DATA_LAYER_MAP[layerName]) {
            this.init();
            return;
        }

        let toolType = TaskStore.taskToolType;
        let editTools = DATA_LAYER_MAP[layerName].tools[toolType];
        editTools = editTools.reduce((tools, tool) => {
            tools[tool] = true;
            return tools;
        }, {});
        this.tools = {
            ...this.getEditTools(),
            ...editTools
        };

        this.drawTools = DATA_LAYER_MAP[layerName].drawTools[toolType];
        this.batchTools = DATA_LAYER_MAP[layerName].batchTools;
    };

    getEditTools = () => {
        let userInfo = appStore.loginUser;
        let roleCode = userInfo && userInfo.roleCode;
        if (roleCode == 'producer') {
            return TOOLS_MAP.EDIT;
        } else {
            return TOOLS_MAP.CHECK;
        }
    };
}

export default new ToolCtrlStore();
