var path = require('path')
var utils = require('./utils')
var config = require('../config')
/**加载vue-loader的配置文件**/
var vueLoaderConfig = require('./vue-loader.conf')

/**查找目录的函数,查找到的目录是 和build同级目录下的文件
 *实际上就是根目录下的 /dir
 * **/
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot, //config index.js输出 '/'
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
        /**生产环境下，config index.js 输出 '/'**/
      ? config.build.assetsPublicPath
        /**开发模式下，config index.js 输出 '/' **/
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    modules: [
      resolve('src'),
      resolve('node_modules')
    ],
    alias: {
      'vue$': 'vue/dist/vue.common.js',
      'src': resolve('src'),
      'assets': resolve('src/assets'),
      'components': resolve('src/components'),
      'common': resolve('src/common')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: "pre",
        include: [resolve('src'), resolve('test')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        /**打包.vue文件**/
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        /**es5转换成es6执行**/
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        /**将小于1000kb的图片转换成base64**/
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}
