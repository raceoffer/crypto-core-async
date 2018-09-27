'use strict';

const webpack = require('webpack');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

var config = {
  entry: path.resolve(__dirname, 'webworker.js'),
  devtool: 'source-map',
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          cache: true,
          parallel: true,
          sourceMap: true,
          ie8: false,
          safari10: true
        }
      })
    ]
  },
  resolve: {
    modules: ['node_modules']
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  plugins: [
    new webpack.DefinePlugin({
      window: {}
    })
  ]
};

module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    config.optimization = { minimize: false };
  
    config.output = {
      path: __dirname,
      filename: 'webworker-dev.bundle.js'
    };
  } else {
    config.output = {
      path: __dirname,
      filename: 'webworker-prod.bundle.js'
    };
  }
  return config;
};
