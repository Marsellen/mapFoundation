module.exports = {
    moduleSetting: {
        // name: 必须, 唯一 ID, 作为输出的模块名
        name: 'mapFoundations',
        // library: 必须, 其中这里的 name 为作为 umd 的 name
        library: { type: 'var', name: 'mapFoundations' },
        // 调用方引用的文件名称
        filename: 'remote.js',
        // exposes: 可选, 表示作为 Remote 时, export 哪些属性被消费
        exposes: {},
        // remotes: 可选, 表示作为 Host 时, 去消费哪些 Remote
        remotes: {
            oneMap: "oneMap@http://localhost:8002/remote.js"
        },
        // shared: 可选, 优先用 Host 的依赖, 如果 Host 没有, 再用自己的
        shared: {
            react: {
                import: 'react', // the "react" package will be used a provided and fallback module
                shareKey: 'react', // under this name the shared module will be placed in the share scope
                shareScope: 'default', // share scope with this name will be used
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
    },
    // remoteUrls: {
    //     development: ['http://localhost:8002/remote.js'],
    //     production: []
    // },
    // publicPath: {
    //     development: 'http://localhost:8001/',
    //     production: ''
    // }
};
