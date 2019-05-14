/**
 *  async http request
 */

import axios from 'axios';

const APIBaseUrl = '//www.ecarx.com.cn/api/';

async function request(option) {
  let params = {
    baseURL: APIBaseUrl
  };
  if (Object.prototype.toString.call(option) === '[object String]') {
    params.url = option;
    params.method = 'GET';
  } else {
    params = Object.assign(params, option);
    if ((option.method).toUpperCase() === 'GET') {
      params.params = params.data;
      delete params.data;
    }
    let slotParams = option.slotParams;
    if (slotParams) {
      for (let key in slotParams) {
        if (slotParams.hasOwnProperty(key)) {
          params.url = params.url.replace(`{${key}}`, slotParams[key]);
        }
      }
    }
  }
  const res = await axios(params);
  if (res.data) {
    return {
      data: res.data,
      headers: res.headers
    };
  }
  return Promise.reject(new Error('No response data.'));
}

/**
 * 异常处理程序
 */

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

const errorHandler = error => {
  const { response = {} } = error;
  const errortext = codeMessage[response.status] || response.statusText;
  const { status, url } = response;

  if (status === 401) {
    /*
    notification.error({
      message: '未登录或登录已过期，请重新登录。',
    });
    // @HACK
    window.g_app._store.dispatch({
      type: 'login/logout',
    });
    */
    return;
  }
  notification.error({
    message: `请求错误 ${status}: ${url}`,
    description: errortext,
  });
  // environment should not be used
  if (status === 403) {
    //router.push('/exception/403');
    return;
  }
  if (status <= 504 && status >= 500) {
    //router.push('/exception/500');
    return;
  }
  if (status >= 404 && status < 422) {
    //router.push('/exception/404');
  }
};

export default request;