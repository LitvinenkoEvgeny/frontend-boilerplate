const path = require('path');
const defaults = require('./defaults');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackSpriteSmith = require('webpack-spritesmith');

module.exports = {
    output: {
        path: path.join(__dirname, '..', 'dist', 'assets'),
        filename: '[name].[hash].js',
        publicPath: defaults.publicPath
    },

    devServer: {
        contentBase: path.join(__dirname, '..', 'dist'),
        historyApiFallback: true,
        hot: true,
        publicPath: defaults.publicPath
    },

    resolve: {
        //webpack 2:
        modules: ["node_modules", defaults.pngSpritesFolder]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: '!!pug-loader!src/index.pug',
            filename: '../index.html',
            alwaysWriteToDisk: true
        }),
        new WebpackSpriteSmith({
            src: {
                cwd: defaults.pngSpritesFolder,
                glob: '*.png'
            },
            target: {
                image: defaults.pngSpritesOutputPath,
                css: defaults.pngSpritesCssOutputPath
            },
            apiOptions:{
                cssImageRef: '/dist/assets/img/sprite.png'
            },
        })
    ]
};
