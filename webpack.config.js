const path = require("path");

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

  devServer: {
    proxy: {
      "/api": "http://localhost:3000"
    },
    contentBase: path.join(__dirname, "public"), // boolean | string | array, static file location
    compress: true,
    https: false,
    noInfo: true // only errors & warns on hot reload
  }
};
