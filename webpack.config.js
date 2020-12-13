var path = require("path");
var htmlWebpackPlugin = require("html-webpack-plugin");
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
var { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = (env, argv) => {
  const isDevMode = !(
    argv.hasOwnProperty("mode") && argv.mode === "production"
  );

  const mode = process.env.NODE_ENV === "production" ? "prod" : "dev";
  const docsPath = "docs";

  return {
    entry: {
      name: "./src/index.js",
    },
    output: {
      path: path.resolve(__dirname, docsPath),
      filename: "[name].[hash].js",
    },
    resolve: {
      extensions: [".js", ".jsx",],
    },

    plugins: [
      new htmlWebpackPlugin({
        inject: true,
        template: "./src/index.html",
        filename: "index.html",
      }),

      new MiniCssExtractPlugin({
        filename: "[name].[hash].css",
      }),

      new CleanWebpackPlugin(),
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          use: [
            {
              loader: "babel-loader",
              options: {
                presets: ["@babel/preset-env"],
                plugins: ["@babel/plugin-proposal-object-rest-spread"],
              },
            },
          ],
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: "html-loader",
            },
          ],
        },
        {
          test: /\.(css|scss)$/i,
          use: [
            mode === "prod" ? "style-loader" : MiniCssExtractPlugin.loader,
            "css-loader",
            "sass-loader",
          ],
        },
        {
          test: /\.(png|jpg|jpeg|git)$/,
          use: [
            {
              loader: "url-loader",
              options: {
                name: "[name].[hash5].[ext]",
                limit: 10000,
                outputPath: "assets/images",
              },
            },
          ],
        },
        {
          test: /\.(eot|woff2?|ttf|otf|svg)$/,
          use: [
            {
              loader: "url-loader",
              options: {
                limit: 5000,
                name: "[name].[hash5].[ext]",
                outputPath: "assets/fonts",
              },
            },
          ],
        },
        {
          test: /\.(ogg|mp3|wav|mpe?g)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                limit: 5000,
                name: "[name].[hash5].[ext]",
                outputPath: "assets/sound",
              },
            },
          ],
        },
      ],
    },
    devServer: {
      contentBase: path.join(__dirname, docsPath),
      compress: true,
      port: 9001,
    },
    devtool: isDevMode ? "source-map" : false,
  };
};
