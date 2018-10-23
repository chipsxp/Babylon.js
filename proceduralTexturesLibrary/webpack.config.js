const path = require('path');
const webpack = require('webpack');
const DtsBundleWebpack = require('dts-bundle-webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    context: __dirname,
    entry: {
        'babylonjs-procedural-textures': path.resolve(__dirname, './legacy/legacy.ts'),
    },
    output: {
        path: path.resolve(__dirname, '../dist/preview release/gui'),
        filename: 'babylonjs.proceduralTextures.min.js',
        libraryTarget: 'umd',
        library: {
            root: ["PTLIB"],
            amd: "babylonjs-procedural-textures",
            commonjs: "babylonjs-procedural-textures"
        },
        umdNamedDefine: true,
        //devtoolModuleFilenameTemplate: "[absolute-resource-path]"
    },
    resolve: {
        extensions: [".js", '.ts']
    },
    externals: {
        babylonjs: {
            root: "BABYLON",
            commonjs: "babylonjs",
            commonjs2: "babylonjs",
            amd: "babylonjs"
        }
    },
    devtool: "source-map",
    module: {
        rules: [{
            test: /\.tsx?$/,
            loader: 'awesome-typescript-loader',
            options: {
                configFileName: '../../proceduralTexturesLibrary/tsconfig.json',
                declarationDir: '../../dist/preview release/proceduralTexturesLibrary/build'
            }
        }]
    },
    mode: "production",
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: false,
        //open: true,
        port: 9000
    },
    plugins: [
        new CleanWebpackPlugin([
            path.resolve(__dirname, './src/**/*.js'),
            path.resolve(__dirname, './src/**/*.map')
        ]),
        // moved out of here due to the way gulp works...
        /*new DtsBundleWebpack({
            name: "babylonjs-gui",
            main: path.resolve(__dirname, '../dist/preview release/gui/build/index.d.ts'),
            out: path.resolve(__dirname, '../dist/preview release/gui/babylon.gui.module.d.ts'),
            baseDir: path.resolve(__dirname, '../dist/preview release/gui/build/'),
            headerText: "BabylonJS GUI"
        }),*/
        new webpack.WatchIgnorePlugin([
            /\.js$/,
            /\.d\.ts$/,
            /\.fx$/
        ])
    ],
    watchOptions: {
        ignored: [path.resolve(__dirname, './dist/**/*.*'), 'node_modules']
    }
}