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

export function ManualBuildApiPath(url) {
    if (/^\//.test(url)) {
        return `/manualBuild_service${url}`;
    } else {
        return `/manualBuild_service/${url}`;
    }
}

export function CheckApiPath(url) {
    if (/^\//.test(url)) {
        return `/check_service${url}`;
    } else {
        return `/check_service/${url}`;
    }
}
