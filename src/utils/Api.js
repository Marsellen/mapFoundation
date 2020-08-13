export function ApiPath(url) {
    if (/^\//.test(url)) {
        return `/gateway/auth${url}`;
    } else {
        return `/gateway/auth/${url}`;
    }
}

export function IdApiPath(url) {
    if (/^\//.test(url)) {
        return `/gateway/imppublic${url}`;
    } else {
        return `/gateway/imppublic/${url}`;
    }
}

export function StoreApiPath(url) {
    if (/^\//.test(url)) {
        return `/gateway/store${url}`;
    } else {
        return `/gateway/store/${url}`;
    }
}

export function EditApiPath(url) {
    if (/^\//.test(url)) {
        return `/gateway/edit${url}`;
    } else {
        return `/gateway/edit/${url}`;
    }
}

export function TaskApiPath(url) {
    if (/^\//.test(url)) {
        return `/gateway/task${url}`;
    } else {
        return `/gateway/task/${url}`;
    }
}

export function ManualBuildApiPath(url) {
    if (/^\//.test(url)) {
        return `/gateway/manualBuild${url}`;
    } else {
        return `/gateway/manualBuild/${url}`;
    }
}

export function CheckApiPath(url) {
    if (/^\//.test(url)) {
        return `/gateway/check${url}`;
    } else {
        return `/gateway/check/${url}`;
    }
}

export function MarkerApiPath(url) {
    if (/^\//.test(url)) {
        return `/gateway/check-web${url}`;
    } else {
        return `/gateway/check-web/${url}`;
    }
}
