export function IdApiPath(url) {
    if (/^\//.test(url)) {
        return `/id_service${url}`;
    } else {
        return `/id_service/${url}`;
    }
}

export function FileApiPath(url) {
    if (/^\//.test(url)) {
        return `/nas_service${url}`;
    } else {
        return `/nas_service/${url}`;
    }
}

export function ShpApiPath(url) {
    if (/^\//.test(url)) {
        return `/shp_service${url}`;
    } else {
        return `/shp_service/${url}`;
    }
}
