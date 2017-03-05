require('./check-versions')()

var config = require('../config')
if (!process.env.NODE_ENV) {
  /**设置默认的NODE_ENV是开发模式  development**/
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV) //在dev.env.js里面配置 development
}

var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
/** webpack的配置文件就是 webpack.dev.conf 相当于webpack.config.js 在下面webpack实例化的时候传入**/
var webpackConfig = require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port  //8080
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable //设置代理

/** 引入数据文件 **/
var appDate=require(path.join(__dirname,'../','data.json'));
var app = express()
/** 定义路由 **/
var apiRouters=express.Router();

apiRouters.get('/seller',function(req,res,next){
  res.json({
    status:1,
    data:appDate.seller
  })
});
apiRouters.get('/goods',function(req,res,next){
  res.json({
    status:1,
    data:appDate.goods
  })
});
apiRouters.get('/rating',function(req,res,next){
  res.json({
    status:1,
    data:appDate.ratings
  })
});

app.use('/api',apiRouters);
var compiler = webpack(webpackConfig)


var devMiddleware = require('webpack-dev-middleware')(compiler, {
  /**在webpack.base.conf里面
   */
  publicPath: webpackConfig.output.publicPath,  /**这里的输出值是 '/'**/
  quiet: true  /**不打印信息**/
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
/**用来处理vue-router的问题
 * 例如  localhost   显示home页面
 * vue-router 跳转到 foo页面  这时候没问题
 * 但是重新刷新页面，localhost/foo express是无法定位到资源，所以会调到404页面
 */
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
/** path.posix提供path的方法，不过是以posix兼容的方式**/
/** config.dev.assetsPublicPath  '/'
 *  config.dev.assetsSubDirectory 'static'
 */
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
/**定义服务器的静态目录为 /static**/
app.use(staticPath, express.static('./static'))
/**定义服务器访问的地址和端口**/
var uri = 'http://localhost:' + port


devMiddleware.waitUntilValid(function () {
  console.log('> Listening at ' + uri + '\n')
})

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }

  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
})
