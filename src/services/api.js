import request from './request'

export async function queryProjectNotice() {
    return request('/api/project/notice');
}
