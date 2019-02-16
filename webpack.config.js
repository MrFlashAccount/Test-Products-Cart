const path = require('path');
const BitBarWebpackProgressPlugin = require('bitbar-webpack-progress-plugin');

module.exports = {
  entry: path.resolve(__dirname, 'src/index.tsx'),
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'astroturf/css-loader'],
      },
      {
        test: /\.tsx?$/,
        use: ['ts-loader', { loader: 'astroturf/loader' }],
        exclude: /node_modules/,
      },
    ],
  },

  resolve: {
    modules: ['src', 'node_modules'],
    extensions: ['.js', '.ts', '.tsx'],
  },

  plugins: [new BitBarWebpackProgressPlugin()],

  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 9000,
    compress: true,
    open: true,
    https: false,
    noInfo: true,
    inline: true,
  },
};
