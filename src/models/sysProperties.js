import EditorService from '../services/EditorService';

class sysProperties {
    constructor() {
        this.configs = {};
    }

    async loadConfigs() {
        let configs = await EditorService.sysProperties();
        Object.assign(this.configs, configs);
    }

    getConfig(key) {
        return this.configs[key];
    }
}

export default new sysProperties();
