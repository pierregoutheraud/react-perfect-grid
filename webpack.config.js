module.exports.getConfig = function() {

  var webpack = require('webpack');
  var path = require('path');
  var autoprefixer = require('autoprefixer');

  var config = {
    entry: {
      app: [
        "./app/scripts/PerfectGrid.jsx"
      ]
    },
    output: {
      filename: 'react-perfect-grid.js',
      path: path.join(__dirname + '/build'),
      libraryTarget: 'umd',
      // library: 'ReactPerfectGrid'
    },
    resolve: {
      modulesDirectories: [
        path.join(__dirname + '/app/scripts/'),
        'node_modules'
      ],
    },
    plugins: [
      // new webpack.optimize.UglifyJsPlugin({
      //   compress: { warnings: false }
      // })
    ],
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
          ],
          loaders: ['babel-loader']
        }
      ]
    },
    postcss: function () {
      return [autoprefixer];
    },
    // externals: {
    //   react : 'React'
    // },
    externals: {
      'react': {
        'root': 'React',
        'commonjs': 'react',
        'commonjs2': 'react',
        'amd': 'react'
      },
      // 'react-dom': {
      //   'root': 'ReactDOM',
      //   'commonjs': 'react-dom',
      //   'commonjs2': 'react-dom',
      //   'amd': 'react-dom'
      // }
    }
  };

  return config;
}
