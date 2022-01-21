export default class Tree {
    setFirstFloor = (checked, obj, isFirst, mode) => {
        switch (mode) {
            case 'checked':
                obj.checked = checked;
                break;
            case 'disabled':
                obj.disabled = !checked;
                break;
            case 'mixin':
                //mixin是checked和disabled的结合，点其它层级改disabled状态，点最后一个层级改checked状态
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

    setSecondFloor = (secondObj, obj, mode) => {
        switch (mode) {
            case 'checked':
                secondObj.checked = obj.checked;
                break;
            case 'disabled':
                secondObj.disabled = obj.disabled;
                break;
            case 'mixin':
                secondObj.disabled = obj.disabled || !obj.checked;
                break;
            default:
                break;
        }
    };

    setCheckCallback = callback => {
        this.checkCallback = callback;
    };

    //递归对象，更新当前层级及其子层级的checked状态
    loopData = (checked, obj, isFirst, mode) => {
        const children = obj.children;
        this.setFirstFloor(checked, obj, isFirst, mode);
        //递归遍历，直到找到最里层
        if (children) {
            Object.keys(children).forEach(secondKey => {
                const secondObj = children[secondKey];
                const secondChildren = secondObj.children;
                if (secondChildren) {
                    this.loopData(checked, secondObj, false, mode);
                } else {
                    this.setSecondFloor(secondObj, obj, mode);
                    this.checkCallback && this.checkCallback(secondObj);
                }
            });
        } else {
            this.checkCallback && this.checkCallback(obj);
        }
    };

    //根据对象子层级的勾选状态，设置对象的勾选状态
    getCheckStatus = obj => {
        const keys = Object.keys(obj);
        let isChecked;
        let isUnChecked;
        let isIndeterminate;
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            const val = obj[key];
            if (val.checked) isChecked = true;
            if (!val.checked) isUnChecked = true;
            if (val.indeterminate) isIndeterminate = true;
            if (isChecked && isUnChecked && isIndeterminate) break;
        }
        return {
            checked: isChecked,
            indeterminate: (isChecked && isUnChecked) || isIndeterminate
        };
    };

    //递归完整对象，更新父层级的checked状态
    loopAllData = (obj, parent) => {
        Object.values(obj).forEach(item => {
            if (!item.children) return;
            const { checked, indeterminate } = this.getCheckStatus(item.children);
            const isChanged = item.checked !== checked || item.indeterminate !== indeterminate;
            item.checked = checked;
            item.indeterminate = indeterminate;
            if (parent && isChanged) {
                const {
                    checked: parentChecked,
                    indeterminate: parentIndeterminate
                } = this.getCheckStatus(parent.children);
                parent.checked = parentChecked;
                parent.indeterminate = parentIndeterminate;
            }
            this.loopAllData(item.children, item);
        });
    };

    //根据key，找到当前点击的层级
    getObj = (data, key) => {
        const keyArr = key.split('|');
        let obj = data;
        keyArr.forEach((item, index) => {
            obj = index === 0 ? obj?.[item] : obj?.children?.[item];
        });
        return obj;
    };

    //设置checked和disabled，显隐图层
    toggleChecked = (data, key, checked, mode) => {
        try {
            const obj = this.getObj(data, key);
            this.loopData(checked, obj, true, mode);
            // 如果是checked模式，需要联动改动所有层级的checked状态
            if (mode === 'checked') this.loopAllData(data);
        } catch {
            console.log('toggleChecked 异常 ' + key);
        }
    };

    //设置伸缩状态
    toggleStretch = (data, key) => {
        const obj = this.getObj(data, key);
        obj.stretched = !obj.stretched;
    };
}
