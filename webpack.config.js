const { clear } = require("console");
const path = require("path");
const htmlWebpackPluin = require("html-webpack-plugin");
const { title } = require("process");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "production",

  entry: {
    main: path.resolve(__dirname, "./src/js/main.js"),
    about: path.resolve(__dirname, "./src/js/about.js"),
  },

  output: {
    path: path.resolve(__dirname, "public"),
    filename: "[name][contenthash].js",
    clean: true,
  },
  plugins: [
    new htmlWebpackPluin({
      title: "Countries | Home1",
      template: "./src/indexTemp.html",
      filename: "index.html",
      chunks: ["main"],
    }),
    new htmlWebpackPluin({
      title: "Countries | About1",
      template: "./src/pages/aboutTemp.html",
      filename: "about.html",
      chunks: ["about"],
    }),
    new MiniCssExtractPlugin(),
  ],

  //Dev server
  devServer: {
    static: {
      directory: path.resolve(__dirname, "public"),
    },
    port: 3000,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            targets: "defaults",
            presets: [["@babel/preset-env"]],
          },
        },
      },
    ],
  },
};
