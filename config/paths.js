const path = require('path');

module.exports = {
    env: getEnv('NODE_ENV', 'dev'),
    // Source files
    src: path.resolve(__dirname, '../src'),
    // Production build files
    build: path.resolve(__dirname, './dist'),
    // Static files that get copied to build folder
    public: path.resolve(__dirname, '../public'),
    // node_modules 路径
    nodeModules: path.resolve(__dirname, '../node_modules'),
    // 样式文件地址
    less: path.resolve(__dirname, '../src/asset/less/')
};

function getEnv(key, defaultValue) {
    return process.env[key.toUpperCase()] || process.env[key.toLowerCase()] || defaultValue;
}
