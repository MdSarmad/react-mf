const { merge } = require("webpack-merge");
const { ModuleFederationPlugin } = require("webpack").container;
const commonConfig = require("./webpack.common");
const packageJSON = require("../package.json");

const devConfig = {
  mode: "development",
  devServer: {
    port: 8080,
    historyApiFallback: {
      index: "index.html",
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "container",
      remotes: {
        marketing: "marketing@http://localhost:8081/remoteEntry.js",
      },
      shared: packageJSON.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);