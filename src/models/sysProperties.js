import EditorService from '../services/EditorService';

class sysProperties {
    constructor() {
        this.configs = {
            ZT1: 7,
            ZT2: 5,
            drawNodeDensity: 0.5,
            finePollingInterval: 1,
            overallPollingInterval: 5,
            pavementZ: 6,
            pointLimit: 5000000,
            pollingInterval: 2,
            pollingLimit: 180,
            repairNodeDensity: 0.5,
            scaleSize: 13,
            startZ: 6,
            statisticInterval: 10,
            viewChangeDelay: 500
        };
    }

    async loadConfigs() {
        let result = await EditorService.sysProperties();
        Object.assign(this.configs, result?.data ?? {});
    }

    getConfig(key) {
        return this.configs[key];
    }
}

export default new sysProperties();
