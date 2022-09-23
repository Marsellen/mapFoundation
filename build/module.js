module.exports = {
    moduleSetting: {
        // name: 必须, 唯一 ID, 作为输出的模块名
        name: 'ultron',
        // library: 必须, 其中这里的 name 为作为 umd 的 name
        library: { type: 'var', name: 'ultron' },
        // 调用方引用的文件名称
        filename: 'remote.js',
        // exposes: 可选, 表示作为 Remote 时, export 哪些属性被消费
        exposes: {
            // 模块名称
            './app': './src/app'
        },
        // remotes: 可选, 表示作为 Host 时, 去消费哪些 Remote
        remotes: {},
        // shared: 可选, 优先用 Host 的依赖, 如果 Host 没有, 再用自己的
        shared: {
            react: {
                singleton: true
            },
            'react-dom': {
                singleton: true
            },
            antd: {
                singleton: true
            }
        }
    },
    remoteUrls: {
        local: [],
        dev: [],
        test: [],
        pre: [],
        prd: []
    },
    publicPath: {
        local: 'http://localhost:15901/',
        dev: 'http://localhost:15901/',
        test: 'http://ad-ultron-test.ecarxmap.com/',
        pre: 'http://ad-ultron-pre.ecarxmap.com/',
        prd: 'http://ad-ultron.ecarxmap.com/'
    }
};
