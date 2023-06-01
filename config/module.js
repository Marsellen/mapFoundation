const deps = require('../package.json').dependencies;

module.exports = {
    moduleSetting: {
        // name: 必须, 唯一 ID, 作为输出的模块名
        name: 'mapFoundations',
        // 调用方引用的文件名称
        filename: 'remoteEntry.js',
        // exposes: 可选, 表示作为 Remote 时, export 哪些属性被消费
        exposes: {},
        // remotes: 可选, 表示作为 Host 时, 去消费哪些 Remote
        remotes: {
            oneMap: 'oneMap@http://localhost:8002/remoteEntry.js',
            ultron: 'ultron@http://localhost:8003/remoteEntry.js'
        },
        // shared: 可选, 优先用 Host 的依赖, 如果 Host 没有, 再用自己的
        shared: {
            // ...deps,
            react: {
                singleton: true
            },
            'react-dom': {
                singleton: true
            },
            'react-router-dom': {
                singleton: true
            }
            // antd: {
            //     singleton: true
            // }
        }
    }
};
