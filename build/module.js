module.exports = {
    moduleSetting: {
        // name: 必须, 唯一 ID, 作为输出的模块名
        name: 'ultronApp',
        // library: 必须, 其中这里的 name 为作为 umd 的 name
        library: { type: 'var', name: 'ultronApp' },
        // 调用方引用的文件名称
        filename: 'remote.js',
        // exposes: 可选, 表示作为 Remote 时, export 哪些属性被消费
        exposes: {
            // 模块名称
            './App': './src/index.js'
        },
        // remotes: 可选, 表示作为 Host 时, 去消费哪些 Remote
        remotes: {
            editorApp: 'editorApp'
        },
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
        local: ['http://ad-editor-dev.ecarxmap.com/remote.js'],
        dev: ['https://ad-editor-dev.ecarxmap.com/remote.js'],
        test: ['https://ad-editor-test.ecarxmap.com/remote.js'],
        pre: ['https://ad-editor-pre.ecarxmap.com/remote.js'],
        prd: ['https://ad-editor.ecarxmap.com/remote.js']
    },
    publicPath: {
        local: 'http://localhost:15900/',
        dev: 'http://ad-ultron-dev.ecarxmap.com/',
        test: 'http://ad-ultron-test.ecarxmap.com/',
        pre: 'http://ad-ultron-pre.ecarxmap.com/',
        prd: 'http://ad-ultron.ecarxmap.com/'
    }
};
