const path = require('path');
const webpack = require("webpack");
const merge = require("webpack-merge");
const common = require('./webpack.common.conf');

module.exports = merge(common, {
    mode: 'development'
});