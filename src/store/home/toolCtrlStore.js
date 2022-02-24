import { observable, configure, action } from 'mobx';
import { TOOLS_MAP } from 'src/config/toolsConfig';
import { DATA_LAYER_MAP } from 'src/config/dataLayerConfig';
import TaskStore from './taskStore';
import appStore from 'src/store/common/appStore';

configure({ enforceActions: 'always' });
class ToolCtrlStore {
    @observable tools;
    @observable updateKey;
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
        this.updateKey = Math.random();
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