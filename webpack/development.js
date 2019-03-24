const merge = require('webpack-merge');
const common = require('./common');

module.exports = (env, options) =>
  merge.smart(
    {
      mode: 'development',
      devtool: 'cheap-module-eval-source-map',

      module: {
        rules: [
          {
            test: /\.css$/,
            use: ['style-loader'],
          },
        ],
      },

      optimization: {
        removeAvailableModules: false,
        mergeDuplicateChunks: false,
        removeEmptyChunks: false,
        splitChunks: false,
      },
    },
    common(env, options)
  );
