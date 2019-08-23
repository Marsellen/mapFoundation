const LOGIN_COOKIE_NAME = 'Authentication';

export function getAuthentication() {
    let userInfo = _getCookie(LOGIN_COOKIE_NAME);
    userInfo = userInfo ? JSON.parse(userInfo) : false;
    return userInfo;
}

export function authenticateSuccess(userInfo, autoLogin) {
    if (autoLogin) {
        _setCookie(LOGIN_COOKIE_NAME, JSON.stringify(userInfo));
    } else {
        logout();
    }
}

export function logout() {
    _setCookie(LOGIN_COOKIE_NAME, '', 0);
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
    let date = new Date();
    date.setDate(date.getDate() + expire);

    document.cookie =
        name +
        '=' +
        escape(value) +
        '; path=/' +
        (expire ? ';expires=' + date.toGMTString() : '');
}
