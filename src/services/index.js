import axios from 'axios';
import { getAuthentication, logout } from 'src/utils/Session';
import { Modal, message } from 'antd';
import { SERVICE_MAP } from 'src/config/ServiceMapConfig';

const TIME_OUT = 60000;

const ERROR_MAP = {
    '500': '服务异常，请联系系统管理员',
    '504': '服务超时，请稍后重试'
};

const handleMessage = content => {
    message.warning(content);
};

const logoutModal = title => {
    Modal.error({
        title,
        okText: '确定',
        cancelText: '取消',
        onOk: () => {
            logout();
            window.location.reload();
        }
    });
};

// http response 拦截器
axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        const { response } = error;
        if (response) {
            const { status, data } = response;

            let errorMsg = ERROR_MAP[status + ''];
            if (errorMsg) {
                return Promise.reject(new Error(errorMsg));
            }
            const { code } = data;

            // 返回 401 清除token信息并跳转到登录页面
            if (status === 401) {
                if (code === 1016) {
                    logoutModal('您的账号已在其他地点登陆，请重新登陆');
                } else {
                    logoutModal('token失效，请重新获取');
                }
            }

            return Promise.reject(error.response.data);
        }
        return Promise.reject(error);
    }
);

/*
 * @param {object} config 必填，配置对象
 * @params {function} successCallback 成功回调
 * @params {function} errorCallback 失败回调
 */
const resource = ({ config, successCallback, errorCallback }) => {
    if (!config) return;

    const { token = '', username = '' } = getAuthentication() || {};
    const newConfig = {
        ...config,
        timeout: TIME_OUT,
        headers: {
            'Content-Type': 'application/json',
            Authentication: token,
            userName: username
        }
    };

    return axios(newConfig)
        .then(response => {
            const { data: respData = {} } = response || {};
            const { code, errcode, errmsg, message: resMessage } = respData;

            if (errcode && errmsg) {
                throw new Error(`${errcode} : ${errmsg}`);
            } else {
                if (successCallback) {
                    successCallback(respData);
                } else {
                    if (code && code !== 1) {
                        throw new Error(`${code} : ${resMessage}`);
                    }
                    return respData;
                }
            }
        })
        .catch(error => {
            const { config } = error || {};
            const { timeout, url } = config || {};

            if (timeout === TIME_OUT) {
                const serviceKey = Object.keys(SERVICE_MAP).find(item => {
                    return url.includes(item);
                });
                const serviceName = SERVICE_MAP[serviceKey];

                throw new Error(`${serviceName}请求超时 ${url}`);
            } else {
                errorCallback && errorCallback(error);
            }

            throw error;
        });
};

export default resource;
