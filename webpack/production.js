const merge = require('webpack-merge');
const common = require('./common');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = (env, options) =>
  merge.smart(
    {
      module: {
        rules: [
          {
            test: /\.css$/,
            use: [{ loader: MiniCssExtractPlugin.loader }],
          },
        ],
      },
    },
    common(env, options),
    {
      mode: 'production',

      output: {
        filename: '[name].[hash].js',
      },

      plugins: [
        new MiniCssExtractPlugin({
          filename: '[name].[hash].css',
          chunkFilename: '[id].[hash].css',
        }),
        new OptimizeCSSAssetsPlugin({}),
      ],

      optimization: {
        runtimeChunk: 'single',
        splitChunks: {
          chunks: 'all',
          minSize: 0,
        },
      },
    }
  );
