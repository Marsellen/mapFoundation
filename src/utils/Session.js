const LOGIN_COOKIE_NAME = 'Authentication';
const CURRENT_EDITING_TASK = 'CurrentEditingTask';

export function getAuthentication() {
    let userInfo = _getCookie(LOGIN_COOKIE_NAME);
    userInfo = userInfo ? JSON.parse(userInfo) : false;
    return userInfo;
}

export function getCurrentEditingTaskId() {
    let currentTask = _getCookie(CURRENT_EDITING_TASK);
    currentTask = currentTask ? JSON.parse(currentTask) : '';
    return currentTask;
}

export function authenticateSuccess(userInfo, autoLogin) {
    
    if (autoLogin) {
        _setCookie(LOGIN_COOKIE_NAME, JSON.stringify(userInfo), 1);
    } else {
        _setCookie(LOGIN_COOKIE_NAME, JSON.stringify(userInfo));
    }
}

export function logout(task) {
    if (task) {
        _setCookie(LOGIN_COOKIE_NAME, '', 0);
        _setCookie(CURRENT_EDITING_TASK, JSON.stringify(task), 0);
    } else {
        _setCookie(CURRENT_EDITING_TASK, '', 0);
        _setCookie(LOGIN_COOKIE_NAME, '', 0);
    }
}

function _getCookie(name) {
    var value = '; ' + document.cookie;
    var parts = value.split('; ' + name + '=');
    if (parts.length === 2) {
        return unescape(
            parts
                .pop()
                .split(';')
                .shift()
        );
    }
    return '';
}

function _setCookie(name, value, expire) {
    let str = name + '=' + escape(value);
    if (expire > 0) {
        let date = new Date();
        date.setDate(date.getDate() + expire);
        document.cookie =
            str +
            '; path=/' +
            (expire ? ';expires=' + date.toGMTString() + 1 : '');
    } else {
        document.cookie = str;
    }
}
