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
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                        plugins: ["@babel/plugin-transform-object-assign"],
                    },
                },
            },
            {
                test: /\.js$/,
                loader: "webpack-remove-debug",
            },
        ],
    },
}
