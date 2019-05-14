import resource from 'src/common/resource'
import { locationPath } from 'src/common/api'

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
    let service = resource(locationPath('/mock/menu.json')/*全局默认url*/, {all_config: '11'} /*全局请求额外参数*/, {
        getMenus: {  // 参数同axios参数，新增了extraParams的参数配置
            url: locationPath('/mock/menu.json'), //请求路由
            extraParams: { id: 123 }  //请求额外参数
        },
        addMenus: {
            url: locationPath('/mock/menu.json'),
            method: 'post'  //设置请求为post请求，默认为get
        },
        getTools: {
            url: locationPath('/mock/tools.json'),
            // `transformRequest` 允许在向服务器发送前，修改请求数据
            // 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
            // 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
            transformRequest: [function (data) {
                // 对 data 进行任意转换处理

                return data;
            }]
        }
    })

    // 可扩展导出文件、打开新的游览器页面等方法
    service.export = function () {
        var url = 'http://somehost/somefile.zip'
        var filename = 'what-you-want.txt'
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(url))
        element.setAttribute('download', filename)

        element.style.display = 'none'
        document.body.appendChild(element)

        element.click()

        document.body.removeChild(element)
    }

    return service
})()