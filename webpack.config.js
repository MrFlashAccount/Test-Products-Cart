const path = require('path');

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

  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    historyApiFallback: true,
    compress: true,
    port: 9000,
    hot: true,
    open: true,
  },
};
