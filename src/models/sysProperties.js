import EditorService from '../services/EditorService';

class sysProperties {
    constructor() {
        this.configs = {};
    }

    async loadConfigs() {
        let result = await EditorService.sysProperties();
        if (!result.data) return;
        Object.assign(this.configs, result.data);
    }

    getConfig(key) {
        return this.configs[key];
    }
}

export default new sysProperties();
