const merge = require('webpack-merge');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const prod = require('./production');

module.exports = (env, options) =>
  merge(prod(env, options), { plugins: [new BundleAnalyzerPlugin({ analyzerPort: 9999 })] });
