import { observable, configure, action, computed } from 'mobx';
import { LAYER_TEXT_MAP } from 'src/config/TextConfigMap';
import TextVectorConfig from 'src/config/TextVectorConfig';
import {
    TYPE_SELECT_OPTION_MAP,
    TABLE_DATA_MAP
} from 'src/config/ADMapDataConfig';

configure({ enforceActions: 'always' });
class DefineModeStore {}

export default new DefineModeStore();
