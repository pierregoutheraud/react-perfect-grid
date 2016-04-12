var path = require('path'),
    WebpackDevServer = require("webpack-dev-server"),
    del = require("del"),
    webpack = require("webpack"),
    webpackStream = require('webpack-stream'),
    runSequence = require('run-sequence');

var gulp = require('gulp'),
    gulpUtil = require('gulp-util'),
    gulpSize = require('gulp-size'),
    gulpMinifyHtml = require('gulp-minify-html'),
    gulpConnect = require('gulp-connect');

// set variable via $ gulp --type prod --style games
var environment = gulpUtil.env.t || gulpUtil.env.type || 'dev';
// var style = gulpUtil.env.style || 'games';
var cdnHostname = '//live-chat.dmcdn.net';
var livereloadPort = 35729;

// console.log('Environment: ' + environment);
var isProduction = environment === 'prod';

var port = gulpUtil.env.port || 9999;
var app = 'app/';
var build = 'build/';
var server = 'server/';
var public = 'public/';

// copy images
gulp.task('images', function(cb) {
  return gulp.src(public + 'images/**/*')
    .pipe(gulpSize({ title : 'images' }))
    .pipe(gulp.dest(build + 'images/'))
});

gulp.task("webpack-dev-server", function(callback) {
    var webpackConfigDev = require('./webpack.config.js').getConfig('dev', port);
    var compiler = webpack(webpackConfigDev);

    new WebpackDevServer(compiler, {
      contentBase: 'public/', // where index.html is
      publicPath: '/js/', // js bundle path
      historyApiFallback: true,
      hot: true
    }).listen(port, "localhost", function(err) {
        if(err) throw new gutil.PluginError("webpack-dev-server", err);
        // Server listening
        gulpUtil.log("[webpack-dev-server]", "http://localhost:"+port+"/webpack-dev-server/index.html");
        // keep the server alive or continue?
        // callback();
    });

});

gulp.task('scripts', function(cb) {

  var webpackConfig = require('./webpack.config.js').getConfig('prod', port);
  return gulp.src("./app/scripts/DmChat.jsx")
    .pipe(webpackStream(webpackConfig))
    // .pipe($.uglify())
    .pipe(gulpSize({ title : 'js' }))
    .pipe(gulp.dest(build));

});

gulp.task('serve', function() {
  gulpConnect.server({
    host: '0.0.0.0',
    root: build,
    port: port
  });
});

// copy html from app to dist
gulp.task('html', function(cb) {
  return gulp.src(public + 'index.html')
    .pipe(gulpMinifyHtml())
    .pipe(gulpSize({ title : 'html' }))
    .pipe(gulp.dest(build));
});

gulp.task('copy', function(cb) {
  return gulp.src(public + 'updates.xml')
    .pipe(gulpSize({ title : 'copy' }))
    .pipe(gulp.dest(build));
});

// clean dist
gulp.task('clean', function(cb) {
  return del([build + '*'], cb);
});

// build as react component
gulp.task('dev', function(callback) {
  runSequence(
    // 'images',
    'webpack-dev-server',
    callback
  );
});

// waits until clean is finished then builds the project
gulp.task('build', function(callback){
  runSequence(
    'clean',
    ['images', 'scripts'/*, 'html'*/],
    callback
  );
});

gulp.task('build-serve', function(callback) {
  runSequence(
    'build',
    'serve',
    callback
  );
});
