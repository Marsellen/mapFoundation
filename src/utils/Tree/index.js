export default class Tree {
    constructor(mode) {
        this.mode = mode || 'checked'; //"checked" 或者 "disabled"
    }

    setFirstFloor = (checked, obj, isFirst) => {
        switch (this.mode) {
            case 'checked':
                obj.checked = checked;
                break;
            case 'disabled':
                //当前点击层级，只改变其checked；非当前点击层级，只改变期disabled
                if (isFirst) {
                    obj.checked = checked;
                } else {
                    obj.disabled = !checked;
                }
                break;
            default:
                break;
        }
    };

    setSecondFloor = (secondObj, obj) => {
        switch (this.mode) {
            case 'checked':
                secondObj.checked = obj.checked;
                break;
            case 'disabled':
                secondObj.disabled = obj.disabled || !obj.checked;
                break;
            default:
                break;
        }
    };

    handleOption = obj => {
        const { checked, disabled, layerKey, layerName } = obj;
        const layer = window[layerName];
        const isShow = checked && !disabled;
        isShow ? layer.show(layerKey) : layer.hide(layerKey);
    };

    //递归多工程资料图层对象
    loopData = (checked, obj, isFirst) => {
        const children = obj.children;
        this.setFirstFloor(checked, obj, isFirst);
        //递归遍历，直到找到最里层
        if (children) {
            Object.keys(children).forEach(secondKey => {
                const secondObj = children[secondKey];
                const secondChildren = secondObj.children;
                if (secondChildren) {
                    this.loopData(checked, secondObj);
                } else {
                    this.setSecondFloor(secondObj, obj);
                    this.handleOption(secondObj);
                }
            });
        } else {
            this.handleOption(obj);
        }
    };

    //根据key，找到当前点击的层级
    getObj = (data, key) => {
        const keyArr = key.split('|');
        let obj = data;
        keyArr.forEach((item, index) => {
            obj = index === 0 ? obj[item] : obj.children[item];
        });
        return obj;
    };

    //设置checked和disabled，显隐图层
    toggleChecked = (data, key, checked) => {
        const obj = this.getObj(data, key);
        this.loopData(checked, obj, true);
    };

    //设置伸缩状态
    toggleStretch = (data, key) => {
        const obj = this.getObj(data, key);
        obj.stretched = !obj.stretched;
    };
}
