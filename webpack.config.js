"use strict";

const fs = require("fs");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const baseHeadContent = `
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta
    name="google-site-verification"
    content="xqrfbGYVmYX0vU5yH7nRskJutYw50ZRW1p5pSNFmY5E"
  />

  <link rel="icon" type="image/svg+xml" href="favicon.svg" sizes="16x16" />
  <link rel="icon" type="image/svg+xml" href="favicon.svg" sizes="32x32" />
  <link rel="icon" type="image/svg+xml" href="favicon.svg" sizes="64x64" />
  <link rel="apple-touch-icon" href="apple-touch.png" />
`;
const preBodyContent = `
  <svg class="cat"></svg>
`;
const postBodyContent = ``;
const baseContent = {
  baseHeadContent,
  preBodyContent,
  postBodyContent,
};

const chunks = {
  "emoji-sprinkle": "./src/projects/emoji-sprinkle.js",
};

const getIncludedChunks = (fileName) => {
  if (Object.keys(chunks).includes(fileName)) {
    return [fileName];
  }

  return [];
};

const titleOverrides = {
  "ac-tracker": "AC Tracker",
};

const projectFiles = fs.readdirSync("./src/projects");
const pages = projectFiles.map((file) => {
  const [fileName, extension] = file.split(".");

  if (extension === "ejs") {
    const titleOverride = titleOverrides[fileName];

    return {
      ...baseContent,
      template: `./src/projects/${fileName}.ejs`,
      filename: `${fileName}.html`,
      title: titleOverride
        ? titleOverride
        : fileName
            .split("-")
            .map(
              (word) =>
                word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
            )
            .join(" "),
      chunks: ["index", ...getIncludedChunks(fileName)],
      inject: "body",
    };
  }
});

module.exports = {
  entry: {
    index: "./src/index.js",
    ...chunks,
  },
  module: {
    rules: [
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
    ...pages.map((page) => new HtmlWebpackPlugin(page)),
    new HtmlWebpackPlugin({
      template: "./src/index.ejs",
      filename: "index.html",
      chunks: ["index"],
    }),
    new MiniCssExtractPlugin(),
    new CopyPlugin({
      patterns: [
        { from: "sitemap.xml", to: "." },
        { from: "robots.txt", to: "." },
      ],
    }),
  ],
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "",
  },
  mode: "production",
};
