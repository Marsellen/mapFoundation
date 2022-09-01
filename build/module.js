module.exports = {
    moduleSetting: {
        // name: 必须, 唯一 ID, 作为输出的模块名
        name: 'editorApp',
        // library: 必须, 其中这里的 name 为作为 umd 的 name
        library: { type: 'var', name: 'editorApp' },
        // 调用方引用的文件名称
        filename: 'remote.js',
        // exposes: 可选, 表示作为 Remote 时, export 哪些属性被消费
        exposes: {
            // 模块名称
            './App': './src/index.js'
        },
        // remotes: 可选, 表示作为 Host 时, 去消费哪些 Remote
        remotes: {
            gistool: 'gistool'
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
        local: ['http://ad-board-dev.ecarxmap.com/remote.js'],
        dev: ['https://ad-board-dev.ecarxmap.com/remote.js'],
        test: ['https://ad-board-test.ecarxmap.com/remote.js'],
        pre: ['https://ad-board-pre.ecarxmap.com/remote.js'],
        prd: ['https://ad-board.ecarxmap.com/remote.js']
    },
    publicPath: {
        local: 'http://localhost:15900/',
        dev: 'http://ad-editor-dev.ecarxmap.com/',
        test: 'http://ad-editor-test.ecarxmap.com/',
        pre: 'http://ad-editor-pre.ecarxmap.com/',
        prd: 'http://ad-editor.ecarxmap.com/'
    }
};
