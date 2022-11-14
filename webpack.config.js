"use strict";

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: ["./index.js"],
  module: {
    rules: [
      {
        test: /\.(html)$/,
        loader: "html-loader",
        options: {
          attributes: {
            list: [
              "...",
              {
                tag: "img",
                attribute: "data-src",
                type: "src",
              },
              {
                tag: "link",
                attribute: "href",
                type: "src",
              },
              {
                tag: "source",
                attribute: "srcset",
                type: "src",
              },
            ],
          },
        },
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|mp3)$/i,
        type: "asset/resource",
        generator: {
          filename: "[name][ext]",
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "index.html",
    }),
    new MiniCssExtractPlugin(),
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "",
  },
  mode: "production",
};
