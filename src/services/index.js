import axios from 'axios';
import { getAuthentication, logout } from 'src/utils/Session';
import { Modal, message } from 'antd';
import { SERVICE_MAP } from 'src/config/ServiceMapConfig';

const TIME_OUT = 60000;

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
        } else {
            return Promise.reject(error);
        }
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
                throw `${errcode} : ${errmsg}`;
            } else {
                if (successCallback) {
                    successCallback(respData);
                } else {
                    if (code) {
                        switch (code) {
                            case 1:
                                return respData;
                            case 509:
                                throw `${code} : ${resMessage}`;
                            default:
                                throw `${code} : ${resMessage}`;
                        }
                    } else {
                        return respData;
                    }
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

                handleMessage(`${serviceName}请求超时 ${url}`);
                console.error(`${serviceName}请求超时 ${url}`);
            } else {
                if (errorCallback) {
                    errorCallback(error);
                } else {
                    handleMessage(error || '请求失败');
                    console.error(error || '请求失败');
                }
            }
        });
};

export default resource;
