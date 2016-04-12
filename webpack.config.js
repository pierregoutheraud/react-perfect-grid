module.exports.getConfig = function(type, port) {

  port = (typeof port === 'undefined' || !port) ? 9001 : port;

  var webpack = require('webpack');
  var path = require('path');
  var autoprefixer = require('autoprefixer');

  var config = {
    entry: {
      app: []
    },
    output: {
      filename: 'react-perfect-grid.js',
      path: path.join(__dirname + '/build'),
      publicPath: '/js/',
      libraryTarget: 'umd',
      library: 'ReactPerfectGrid'
    },
    resolve: {
      modulesDirectories: [
        path.join(__dirname + '/app/scripts/'),
        // path.join(__dirname + '/app/styles/'),
        'node_modules'
      ],
      // alias:{
      //   "matches-selector/matches-selector": "desandro-matches-selector",
      //   "eventEmitter/EventEmitter": "wolfy87-eventemitter",
      //   "get-style-property/get-style-property": "desandro-get-style-property"
      // }
      // extensions: ['', '.js', '.jsx']

      // root: __dirname + '/app/scripts',
      // alias: {
      //   jquery: 'jquery/dist/jquery.min.js'
      // },
      // fallback: path.join(__dirname, 'node_modules')
    },
    plugins: [
      // new webpack.ProvidePlugin({
      //     $: "jquery",
      //     jQuery: "jquery",
      //     "window.jQuery": "jquery"
      // }),
    ],
    debug : type === 'dev',
    module: {
      loaders: [
        {
          test: /\.css$/,
          loader: 'style-loader!css-loader!postcss-loader'
        },
        {
          test: /\.scss$/,
          include: [
            path.join(__dirname, 'app/styles')
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
            path.join(__dirname, 'app/scripts')
          ],
          loaders: ['babel-loader']
        }
      ]
    },
    postcss: function () {
      return [autoprefixer];
    },
  };

  if (type === 'prod') {

    config.entry.app = [
      "./app/scripts/GridImages.jsx"
    ]

    config.plugins.push(
      new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
      })
    )

    config.externals = {
      'react': {
        'root': 'React',
        'commonjs': 'react',
        'commonjs2': 'react',
        'amd': 'react'
      },
      'react-dom': {
        'root': 'ReactDOM',
        'commonjs': 'react-dom',
        'commonjs2': 'react-dom',
        'amd': 'react-dom'
      }
    }

  } else if (type === 'dev') {

    config.devtool = 'eval';

    config.entry.app = [
      'webpack-dev-server/client?http://localhost:'+port, // WebpackDevServer host and port
      'webpack/hot/only-dev-server',
      // "webpack/hot/dev-server",
      "./app/scripts/App.jsx"
    ];

    config.plugins.push(
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin()
    );

    config.module.loaders[3].loaders = ['react-hot','babel-loader'];

  }

  // if (type === 'test') {
  //   config.resolve.modulesDirectories.unshift(
  //     path.join(__dirname + '/app/tests/mocks/'),
  //     path.join(__dirname + '/app/tests/')
  //   );
  //   config.module.loaders[0].include.push( path.join(__dirname, '/app/tests') );
  // }

  // console.log( config );

  return config;
}
