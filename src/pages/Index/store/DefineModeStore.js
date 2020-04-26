import { observable, configure, action, computed } from 'mobx';
import { LAYER_VECTOR_MAP } from 'src/config/VectorConfigMap.js';
import VectorsConfig from 'src/config/VectorsConfig';
import {
    TYPE_SELECT_OPTION_MAP,
    TABLE_DATA_MAP
} from 'src/config/ADMapDataConfig';

configure({ enforceActions: 'always' });
class DefineModeStore {
    @observable vectorConfig = {}; //符号默认配置，页面根据这个字段渲染

    //初始化符号配置
    @action initLayerTextConfig = () => {
        this.vectorConfig = JSON.parse(JSON.stringify(LAYER_VECTOR_MAP));
    };
}

export default new DefineModeStore();
