var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')

var publicPath = process.env.NODE_ENV==='production'?'/':'/dist/'

module.exports = {
  entry: './src/main.js',
  externals:{
    iview:"iview",
    vue:"Vue",
    "highlight.js":"hljs",
    katex:"katex"
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath:publicPath,
    filename: 'build.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
        loader: 'url-loader?limit=1024'
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: false,
    host:"0.0.0.0",
    disableHostCheck:true,
      //historyApiFallback:{
      //index:'/dist/index.html'//index.html为当前目录创建的template.html
      //}
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new HtmlWebpackPlugin({
      title:'RainboyBlog',
      template:'index.html',
      inject:'body',
    }),
    new CopyWebpackPlugin([
      {from:"./static",to:"./static"},
      {from:"./aboutme.md"},
    ])
  ])
}
