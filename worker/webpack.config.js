const path = require("path");
const webpack = require("webpack");

const mode = process.env.NODE_ENV || "production";
const dist = path.join(__dirname, "dist");

module.exports = {
  context: __dirname,
  output: {
    filename: `worker.${mode}.js`,
    path: dist
  },
  target: "webworker",
  devtool: "source-map",
  mode,
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    plugins: []
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        options: {
          transpileOnly: true
        }
      },
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
    ]
  }
};
