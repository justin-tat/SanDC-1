const path = require("path");
var SRC_DIR = path.join(__dirname, "/public/client/src");
var DIST_DIR = path.join(__dirname, "/public/client/dist")
var CompressionPlugin = require('compression-webpack-plugin');


module.exports = {
  mode: 'production',
  entry: `${SRC_DIR}/index.js`,
  output: {
    filename: "bundle.js",
    path: DIST_DIR
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react"
            ]
          }
        }
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ]
  },
  plugins: [new CompressionPlugin()],
  optimization: {
    chunkIds: "size",
    moduleIds: "size",
    mangleExports: "size",
    nodeEnv: 'production',
    minimize: true
  }
}