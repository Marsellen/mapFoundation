export function locationPath(url) {
    if (/^\//.test(url)) {
        return `http://localhost:8080${url}`
    } else {
        return `http://localhost:8080/${url}`
    }
}

export function ApiPath(url) {
    if (/^\//.test(url)) {
        return `ecarx.com${url}`
    } else {
        return `ecarx.com/${url}`
    }
}