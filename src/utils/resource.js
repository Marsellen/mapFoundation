import axios from 'axios';
import { getAuthentication } from './Session';

const BASIC_METHODS = ['get', 'post', 'put'];

/**
 * url format
 * @param str
 * @returns {str}
 */
function urlFormat(url, params) {
    // 根据params内容替换对应的占位符
    Object.keys(params).map(key => {
        let reg = new RegExp(':' + key + '\\b', 'g');
        if (reg.test(url)) {
            url = url.replace(reg, params[key]);
            delete params[key];
        }
    });
    url = url.replace(/\/:[a-z]+?\b/gi, ''); //去除未被替换的占位符
    return url;
}

function request(defaultUrl, extraParams, option) {
    return function(data) {
        return new Promise((resolve, reject) => {
            let params;
            if (Array.isArray(data)) {
                params = data;
            } else {
                params = {
                    ...extraParams,
                    ...option.extraParams,
                    ...data
                };
            }
            let key;
            if (option.method === 'get' || !option.method) {
                key = 'params';
            } else {
                key = 'data';
            }

            // TODO
            let userInfo = getAuthentication();
            let Authentication = userInfo ? userInfo.token : '';
            let config = {
                ...option,
                url: urlFormat(option.url || defaultUrl, params),
                [key]: params,
                headers: { 'Content-Type': 'application/json', Authentication }
            };
            axios(config)
                .then(response => {
                    resolve(response.data);
                })
                .catch(reject);
        });
    };
}

/**
 * resource注册服务
 * @param {string} defaultUrl 全局默认url
 * @param {object} extraParams 全局默认参数
 * @param {object} options 资源配置参数集合
 * @parma {options} key 资源调用方法名称
 * @parma {options} value 资源调用方法参数
 * @returns {object} resource 资源服务对象
 */
function resource(defaultUrl, extraParams, options) {
    let $resource = {};
    BASIC_METHODS.forEach(key => {
        $resource[key] = request(defaultUrl, extraParams, { method: key });
    });
    Object.keys(options).map(key => {
        $resource[key] = request(defaultUrl, extraParams, options[key]);
    });
    return $resource;
}

export default resource;
