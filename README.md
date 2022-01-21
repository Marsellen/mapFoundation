## 项目启动

### 依赖项安装

yarn 依赖安装

> yarn install

依赖包更新

> 修改 package.json 中依赖包版本号，重新执行 yarn install

addis-viz-sdk 主版本和次版本更新

> 需要手动修改 package.json 中 yarn update-sdk 命令中的版本号，再执行 yarn update-sdk

addis-viz-sdk 小版本更新，直接执行下方命令更新

> yarn update-sdk

### 服务启动

> yarn start

## 编写指南

### layout 篇

> 项目布局为上-左右结构：头部、侧边栏工作区、展示内容主体。
> 展示内容主体路由配置样例：

```javascript
import React from 'react';
import { withRouter, Switch, Redirect } from 'react-router-dom';
import LoadableComponent from '../../util/LoadableComponent';
import PrivateRoute from '../PrivateRoute';

// 模块引入
const Home = LoadableComponent(() => import('src/pages/Home/index')); //参数一定要是函数，否则不会懒加载，只会代码拆分

@withRouter
class ContentMain extends React.Component {
    componentDidMount() {
        this.props.MenuStore.initMenus();
    }

    render() {
        return (
            <div style={{ position: 'relative' }}>
                <Switch>
                    {/* 模块路由声明 */}
                    <PrivateRoute
                        exact
                        path="home"
                        component={LoadableComponent(() => import('src/pages/Home/index'))}
                    />

                    {/* 默认路由 */}
                    <Redirect exact from="/" to="/home" />
                </Switch>
            </div>
        );
    }
}

export default ContentMain;
```

### mobx 状态管理篇

1. 项目使用 mobx 进行状态管理，在根目录的 index.js 里统一注入 store：

```javascript
// ...
import store from './store'; //统一引入store

ReactDOM.render(
    <BrowserRouter>
        <LocaleProvider locale={zh_CN}>
            <Provider {...store}>
                <App />
            </Provider>
        </LocaleProvider>
    </BrowserRouter>,
    document.getElementById('root')
);
registerServiceWorker();
```

2. 在 src/store/index.js 中统一管理 store

```javascript
import appStore from './appStore';
import MenuStore from './MenuStore';
import stepFormStore from 'src/demo/Entry/FormDemo/store';

const store = {
    appStore,
    MenuStore,
    stepFormStore
};
export default store;
```

3. store 的实现

```javascript
import { observable, flow } from 'mobx';
import CommonService from '../service/common.service'; //引入service

class MenuStore {
    @observable menus = []; //@observable 声明该属性会被关联组件监听，当其改变时，会使关联组件重新渲染
    @observable state = 'pending'; // 'pending' / 'done' / 'error'

    // 获取menu配置
    // flow函数介绍见 [https://cn.mobx.js.org/best/actions.html]
    initMenus = flow(function* () {
        // <- 注意*号，这是生成器函数！
        this.state = 'pending';
        this.menus = [];
        try {
            // 调用请求，参数为请求数据参数，同axios参数配置，方法返回promise对象
            const menus = yield CommonService.getMenus({ id: 222 });
            // 异步代码块会被自动包装成动作并修改状态
            this.state = 'done';
            this.menus = menus;
        } catch (error) {
            this.state = 'error';
        }
    });
}

export default new MenuStore();
```

4. 组件与 store 关联

```javascript
import React from 'react';
import CustomMenu from '../CustomMenu/index';
import { inject, observer } from 'mobx-react';

@inject('MenuStore') //注入MenuStore
@observer //将组件设置为观察者
class SiderNav extends React.Component {
    componentDidMount() {
        this.props.MenuStore.initMenus(); //组件第一次渲染前获取数据
    }

    render() {
        const { state, menus } = this.props.MenuStore; //根据获取到的menus数据渲染页面
        return (
            <div>
                <CustomMenu menus={menus} />
            </div>
        );
    }
}

export default SiderNav;
```

### resource 简介篇

> resource 是基于 axios 的 http 请求服务组件，使用时需引入该组件，引入返回函数对象。

1. service 资源配置示例

```javascript
// src/service/common.services.js

// 引入resource
import resource from 'src/util/resource';

export default (function () {
    // 调用resouce函数
    /**
     * resource注册服务
     * @param {string} defaultUrl 全局默认url
     * @param {object} extraParams 全局默认参数
     * @param {object} options 资源配置参数集合
     * @param {options} key 资源调用方法名称
     * @param {options} value 资源调用方法参数
     * @returns {object} resource 资源服务对象
     */
    let service = resource(
        locationPath('/mock/menu.json') /*全局默认url*/,
        { all_config: '11' } /*全局请求额外参数*/,
        {
            getMenus: {
                // 参数同axios参数，新增了extraParams的参数配置
                url: locationPath('/mock/menu.json'), //请求路由
                extraParams: { id: 123 } //请求额外参数
            },
            addMenus: {
                url: locationPath('/mock/menu.json'),
                method: 'post' //设置请求为post请求，默认为get
            },
            getTools: {
                url: locationPath('/mock/tools.json'),
                // `transformRequest` 允许在向服务器发送前，修改请求数据
                // 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
                // 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
                transformRequest: [
                    function (data) {
                        // 对 data 进行任意转换处理

                        return data;
                    }
                ] //更多参数设置看下一篇： axios配置详解
            }
        }
    );

    // 可扩展导出文件、打开新的游览器页面等方法
    service.export = function () {
        var url = 'http://somehost/somefile.zip';
        var filename = 'what-you-want.txt';
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(url));
        element.setAttribute('download', filename);

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    };

    return service;
})();
```

2. store 调用示例

```javascript
import { observable, flow } from 'mobx';
import CommonService from '../service/common.service'; //引入service

class MenuStore {
    @observable menus = [];
    @observable state = 'pending'; // 'pending' / 'done' / 'error'

    // 获取menu配置
    initMenus = flow(function* () {
        // <- 注意*号，这是生成器函数！
        this.state = 'pending';
        this.menus = [];
        try {
            // 调用请求，参数为请求数据参数，同axios参数配置，方法返回promise对象
            const menus = yield CommonService.getMenus({ id: 222 });
            // 异步代码块会被自动包装成动作并修改状态
            this.state = 'done';
            this.menus = menus;
        } catch (error) {
            this.state = 'error';
        }
    });
}

export default new MenuStore();
```

3. resource 生成的默认请求
    > resource 会根据传入的第一、二个参数生成默认的 get、post、put 三种请求，主要适用于单独的资源 service。forExample：

```javascript
// service配置，文件名： MenuService.js
import resource from 'src/util/resource'

export default (function () {
    let service = resource(locationPath('/mock/menu/:id.json'), {}, {

    })

    return service
})()


// store调用，文件名：MenuStore.js
    import MenuService from 'MenuService'
    ...

    initMenus = flow(function * () { // <- 注意*号，这是生成器函数！
        this.state = 'pending'
        this.menus = []
        try {
            const menus = yield MenuService.get()  //会调用如 /mock/menu.json 的get请求
            this.state = 'done'
            this.menus = menus
        } catch (error) {
            this.state = 'error'
        }
    })

    getMenu = flow(function * (id) { // <- 注意*号，这是生成器函数！
        this.state = 'pending'
        try {
            const menu = yield MenuService.get({id: id})  //会调用如 /mock/menu/:id.json 的get请求
            this.state = 'done'
            this.menu = menu
        } catch (error) {
            this.state = 'error'
        }
    })

    editMenu = flow(function * (id) { // <- 注意*号，这是生成器函数！
        this.state = 'pending'
        try {
            const menu = yield MenuService.put({id: id, data: {}})  //会调用如 /mock/menu/:id.json 的put请求
            this.state = 'done'
        } catch (error) {
            this.state = 'error'
        }
    })

    addMenu = flow(function * (id) { // <- 注意*号，这是生成器函数！
        this.state = 'pending'
        try {
            const menu = yield MenuService.post({menu: {}})  //会调用如 /mock/menu.json 的post请求
            this.state = 'done'
        } catch (error) {
            this.state = 'error'
        }
    })

```

### axios 配置详解篇

> 以下 axios 支持的参数，均可以在 service 中配置。

```javascript
{
  // `url` 是用于请求的服务器 URL
  url: '/user',

  // `method` 是创建请求时使用的方法
  method: 'get', // 默认是 get

  // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
  // 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
  baseURL: 'https://some-domain.com/api/',

  // `transformRequest` 允许在向服务器发送前，修改请求数据
  // 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
  // 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
  transformRequest: [function (data) {
    // 对 data 进行任意转换处理

    return data;
  }],

  // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
  transformResponse: [function (data) {
    // 对 data 进行任意转换处理

    return data;
  }],

  // `headers` 是即将被发送的自定义请求头
  headers: {'X-Requested-With': 'XMLHttpRequest'},

  // `params` 是即将与请求一起发送的 URL 参数
  // 必须是一个无格式对象(plain object)或 URLSearchParams 对象
  params: {
    ID: 12345
  },

  // `paramsSerializer` 是一个负责 `params` 序列化的函数
  // (e.g. https://www.npmjs.com/package/qs, http://api.jquery.com/jquery.param/)
  paramsSerializer: function(params) {
    return Qs.stringify(params, {arrayFormat: 'brackets'})
  },

  // `data` 是作为请求主体被发送的数据
  // 只适用于这些请求方法 'PUT', 'POST', 和 'PATCH'
  // 在没有设置 `transformRequest` 时，必须是以下类型之一：
  // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
  // - 浏览器专属：FormData, File, Blob
  // - Node 专属： Stream
  data: {
    firstName: 'Fred'
  },

  // `timeout` 指定请求超时的毫秒数(0 表示无超时时间)
  // 如果请求话费了超过 `timeout` 的时间，请求将被中断
  timeout: 1000,

  // `withCredentials` 表示跨域请求时是否需要使用凭证
  withCredentials: false, // 默认的

  // `adapter` 允许自定义处理请求，以使测试更轻松
  // 返回一个 promise 并应用一个有效的响应 (查阅 [response docs](#response-api)).
  adapter: function (config) {
    /* ... */
  },

  // `auth` 表示应该使用 HTTP 基础验证，并提供凭据
  // 这将设置一个 `Authorization` 头，覆写掉现有的任意使用 `headers` 设置的自定义 `Authorization`头
  auth: {
    username: 'janedoe',
    password: 's00pers3cret'
  },

  // `responseType` 表示服务器响应的数据类型，可以是 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
  responseType: 'json', // 默认的

  // `xsrfCookieName` 是用作 xsrf token 的值的cookie的名称
  xsrfCookieName: 'XSRF-TOKEN', // default

  // `xsrfHeaderName` 是承载 xsrf token 的值的 HTTP 头的名称
  xsrfHeaderName: 'X-XSRF-TOKEN', // 默认的

  // `onUploadProgress` 允许为上传处理进度事件
  onUploadProgress: function (progressEvent) {
    // 对原生进度事件的处理
  },

  // `onDownloadProgress` 允许为下载处理进度事件
  onDownloadProgress: function (progressEvent) {
    // 对原生进度事件的处理
  },

  // `maxContentLength` 定义允许的响应内容的最大尺寸
  maxContentLength: 2000,

  // `validateStatus` 定义对于给定的HTTP 响应状态码是 resolve 或 reject  promise 。如果 `validateStatus` 返回 `true` (或者设置为 `null` 或 `undefined`)，promise 将被 resolve; 否则，promise 将被 rejecte
  validateStatus: function (status) {
    return status >= 200 && status < 300; // 默认的
  },

  // `maxRedirects` 定义在 node.js 中 follow 的最大重定向数目
  // 如果设置为0，将不会 follow 任何重定向
  maxRedirects: 5, // 默认的

  // `httpAgent` 和 `httpsAgent` 分别在 node.js 中用于定义在执行 http 和 https 时使用的自定义代理。允许像这样配置选项：
  // `keepAlive` 默认没有启用
  httpAgent: new http.Agent({ keepAlive: true }),
  httpsAgent: new https.Agent({ keepAlive: true }),

  // 'proxy' 定义代理服务器的主机名称和端口
  // `auth` 表示 HTTP 基础验证应当用于连接代理，并提供凭据
  // 这将会设置一个 `Proxy-Authorization` 头，覆写掉已有的通过使用 `header` 设置的自定义 `Proxy-Authorization` 头。
  proxy: {
    host: '127.0.0.1',
    port: 9000,
    auth: : {
      username: 'mikeymike',
      password: 'rapunz3l'
    }
  },

  // `cancelToken` 指定用于取消请求的 cancel token
  // （查看后面的 Cancellation 这节了解更多）
  cancelToken: new CancelToken(function (cancel) {
  })
}
```
