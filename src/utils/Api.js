export function IDApiPath(url) {
    if (/^\//.test(url)) {
        return `/api/id_service${url}`
    } else {
        return `/api/id_service/${url}`
    }
}
