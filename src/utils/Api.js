export function ApiPath(url) {
    if (/^\//.test(url)) {
        return `/gateway${url}`;
    } else {
        return `/gateway/${url}`;
    }
}

export function IdApiPath(url) {
    if (/^\//.test(url)) {
        return `/id_service${url}`;
    } else {
        return `/id_service/${url}`;
    }
}

export function updateBoundaryApiPath(url) {
    if (/^\//.test(url)) {
        return `/update_boundary_service${url}`;
    } else {
        return `/update_boundary_service/${url}`;
    }
}

export function EditApiPath(url) {
    if (/^\//.test(url)) {
        return `/edit_service${url}`;
    } else {
        return `/edit_service/${url}`;
    }
}

export function TaskApiPath(url) {
    if (/^\//.test(url)) {
        return `/task_service${url}`;
    } else {
        return `/task_service/${url}`;
    }
}
