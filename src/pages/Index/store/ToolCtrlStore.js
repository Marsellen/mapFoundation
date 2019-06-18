import { observable, configure, action } from 'mobx';
import { TOOLS_MAP } from 'src/config/ToolsConfig';

configure({ enforceActions: 'always' });
class ToolCtrlStore {
    @observable tools;

    @action init = () => {
        this.tools = TOOLS_MAP.EDIT;
    };
}

export default new ToolCtrlStore();
