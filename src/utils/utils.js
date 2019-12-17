/**
 * 生成指定区间的随机整数
 * @param min
 * @param max
 * @returns {number}
 */
export function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

export function addClass(dom, className) {
    let oriName = dom.className;
    if (oriName) {
        let newName = oriName + ' ' + className;
        dom.className = newName;
    } else {
        dom.className = className;
    }
}

export function removeClass(dom, className) {
    let oriName = dom.className;
    if (oriName) {
        let classNames = oriName.split(' ');
        dom.className = classNames.filter(name => name !== className).join(' ');
    }
}

//节流函数
export function throttle(fn, time, context) {
    var lock, args, wrapperFn, later;

    later = function() {
        // reset lock and call if queued
        lock = false;
        if (args) {
            wrapperFn.apply(context, args);
            args = false;
        }
    };

    wrapperFn = function() {
        if (lock) {
            // called too soon, queue to call later
            args = arguments;
        } else {
            // call and lock until later
            fn.apply(context, arguments);
            setTimeout(later, time);
            lock = true;
        }
    };

    return wrapperFn;
}

export const funDownload = (content, filename) => {
    var datastr =
        'data:text/json;charset=utf-8,' +
        encodeURIComponent(JSON.stringify(content));
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute('href', datastr);
    downloadAnchorNode.setAttribute('download', `${filename}.json`);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
};

/**
 * 数组去重
 * @param {Array} array 数组
 * @param {Function} func 可选，函数返回数组项中唯一项校验对象
 * @returns {Array} 去重后数组
 */
export const uniqObjectArray = (array, func) => {
    let uniqArray = [];
    return array.reduce((total, item) => {
        let uniqItem = func ? func(item) : item;
        if (!uniqArray.includes(uniqItem)) {
            uniqArray.push(uniqItem);
            total.push(item);
        }
        return total;
    }, []);
};
