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
