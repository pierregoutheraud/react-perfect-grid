module.exports.getConfig = function(port) {

  port = (typeof port === 'undefined' || !port) ? 9001 : port;

  var webpack = require('webpack');
  var path = require('path');
  var autoprefixer = require('autoprefixer');

  var config = {
    entry: {
      app: [
        'webpack-dev-server/client?http://localhost:'+port, // WebpackDevServer host and port
        'webpack/hot/only-dev-server',
        // "webpack/hot/dev-server",
        "./website/App.jsx"
      ]
    },
    output: {
      filename: 'website.js',
      path: path.join(__dirname),
      // publicPath: '/js/',
      // libraryTarget: 'umd',
      // library: 'ReactPerfectGrid'
    },
    resolve: {
      modulesDirectories: [
        path.join(__dirname + '/app/scripts/'),
        'node_modules'
      ],
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: { warnings: false }
      })
    ],
    debug : true,
    devtool: 'eval',
    module: {
      loaders: [
        {
          test: /\.css$/,
          loader: 'style-loader!css-loader!postcss-loader'
        },
        {
          test: /\.scss$/,
          include: [
            path.join(__dirname, 'app/styles'),
            path.join(__dirname, 'website')
          ],
          loader: 'style-loader!css-loader!postcss-loader!sass-loader'
        },
        {
          // test: /\.(ttf|eot|woff|woff2|svg|png|gif|jpg).*$/,
          test: /\.(png|woff|woff2|eot|ttf|svg)$/,
          loaders: ['file-loader']
        },
        {
          test: /\.jsx?$/,
          include: [
            path.join(__dirname, 'app/scripts'),
            path.join(__dirname, 'website')
          ],
          loaders: ['react-hot','babel-loader']
        }
      ]
    },
    postcss: function () {
      return [autoprefixer];
    },
  };

  return config;
}
