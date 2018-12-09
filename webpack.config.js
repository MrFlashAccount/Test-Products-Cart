const path = require("path");
const webpack = require('webpack');

module.exports = {
  entry: path.resolve(__dirname, "src/index.tsx"),
  devtool: "source-map",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },

  module: {
    rules: [{ test: /\.tsx?$/, loader: "ts-loader" }]
  },

  resolve: {
    modules: ["src", "node_modules"],
    extensions: [".js", ".ts", ".tsx"]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],

  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 9000,
    compress: true,
    open: true,
    hot: true,
    https: false,
    noInfo: true,
    inline: true
  }
};
