import { observable, configure, action } from 'mobx';

configure({ enforceActions: 'always' });
class AttributeStore {
    @observable attributes = [];

    @action setAttributes = properties => {
        this.attributes = Object.keys(properties).map(key => {
            return { attribute: key, value: properties[key] };
        });
    };
}

export default new AttributeStore();
