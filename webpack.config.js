var NpmInstallPlugin = require("npm-install-webpack-plugin");

module.exports = {
    entry: "./src/Main.js",
    output: {
        path: __dirname,
        filename: "build/bundle.js"
    },
	plugins: [
        new NpmInstallPlugin({
            dev: false,
            peerDependencies: true
        })
    ],
    module: {
        loaders: [
        ]
    }
};