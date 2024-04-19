module.exports = {
  entry: "./index.js",
  output: {
    filename: "bundle.js",
  },
  mode: "none",
  node: false,
  module: {
    rules: [
      {
        test: /\.m?js$/,
        use: {
          loader: "sass-loader",
        },
      },
    ],
  },
}
