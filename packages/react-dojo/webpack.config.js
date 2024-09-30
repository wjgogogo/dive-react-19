const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  mode: "development",
  devtool: "cheap-module-source-map",
  entry: "./dojo/index.jsx",
  resolve: {
    alias: {
      react: path.resolve(__dirname, "./source-code/react/packages/react"),
      "react-client": path.resolve(
        __dirname,
        "./source-code/react/packages/react-client"
      ),
      "react-dom": path.resolve(
        __dirname,
        "./source-code/react/packages/react-dom"
      ),
      "react-dom-bindings": path.resolve(
        __dirname,
        "./source-code/react/packages/react-dom-bindings"
      ),
      "react-reconciler": path.resolve(
        __dirname,
        "./source-code/react/packages/react-reconciler"
      ),
      scheduler: path.resolve(
        __dirname,
        "./source-code/react/packages/scheduler"
      ),
      shared: path.resolve(__dirname, "./source-code/react/packages/shared"),
    },
  },
  module: {
    rules: [
      {
        enforce: "pre",
        exclude: /@babel(?:\/|\\{1,2})runtime/,
        test: /\.(js|mjs|jsx|css)$/,
        loader: "source-map-loader",
      },
      {
        test: /\.(js|mjs|jsx)$/,
        loader: "babel-loader",
        options: {
          presets: [
            [
              "@babel/preset-react",
              {
                development: true,
                runtime: "automatic",
                // runtime: "classic",
              },
            ],
            ["@babel/preset-flow"],
          ],
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
        sideEffects: true,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./public/index.html"),
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("development"),
      __UMD__: true,
      __DEV__: true,
      __EXPERIMENTAL__: true,
      __PROFILE__: false,
    }),
  ],
  devServer: {
    static: {
      directory: path.resolve(__dirname, "public"),
    },
    port: 8080,
    hot: false,
    client: {
      progress: true,
      overlay: false,
    },
  },
};
