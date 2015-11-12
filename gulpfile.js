//build system
var gulp = require('gulp');

//handles dependencies
var webpack = require('webpack');

//transpiles es6/jsx to es5
// var babel = require('babel-loader');

//converts reatable stream from webpack into the gulp compatible stream
var source = require('vinyl-source-stream');

//css preprocessor
var sass = require('gulp-sass');

//desktop notifications on error
var notifier = require('node-notifier');

//boots up localhost and refreshes when changes are made
var browserSync = require('browser-sync');

//minifies js
var gulpCC = require('gulp-closurecompiler');

//minifies css
var minifyCss = require('gulp-minify-css');

var RAW_PATH = './raw/';
var RAW_JS_PATH = RAW_PATH + 'js/'
var RAW_SCSS_PATH = RAW_PATH + 'scss/';
var SCRIPTS_FILENAME = 'all.js';
var DEST_PATH = './www/';
var DEST_JS_PATH = DEST_PATH + 'js/';
var DEST_CSS_PATH = DEST_PATH + 'css/';
 
gulp.task('buildScripts', function (callback) {
  webpack({
    devtool: 'source-map',
    entry: [RAW_JS_PATH + 'index.js'],
    output: {
      path: DEST_JS_PATH,
      filename: SCRIPTS_FILENAME
    },
    module: {
        loaders: [
          {
            loader: 'babel',
            query: {
              presets: [
                'es2015',
                'react',
                'stage-0'
              ]
            }
          }
        ]
    },
    resolve: {
      alias: {
        'TweenLite': 'gsap/src/uncompressed/TweenLite'
      },
      modulesDirectories: ['./node_modules', RAW_JS_PATH]
    }
  }, function(err, stats) {
      if(err) {
        notifier.notify({title:'ERROR', message:'JavaScript'});
        console.log('ERROR:', err.message);
      }
      if(callback)
        callback();
  });
});

gulp.task('buildStyles', function() {
  gulp.src(RAW_SCSS_PATH + '**/*.scss')
    .pipe(sass().on('error', function(err){
      notifier.notify({title:'ERROR', message:'CSS'});
      sass.logError.bind(this)(err);
    }))
    .pipe(gulp.dest(DEST_CSS_PATH));
});

gulp.task('minify', function(){
  gulp.src(DEST_JS_PATH + SCRIPTS_FILENAME)
    .pipe(
      gulpCC({fileName: SCRIPTS_FILENAME})
    )
    .pipe(gulp.dest(DEST_JS_PATH));
  gulp.src(DEST_CSS_PATH + '*.css')
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(gulp.dest(DEST_CSS_PATH));
});

gulp.task('default', function () {
  browserSync.init([DEST_PATH + '**/*'], {
    port: 8001,
    server: {
      baseDir: DEST_PATH
    }
  });
  gulp.tasks.buildStyles.fn();
  gulp.tasks.buildScripts.fn();
  gulp.watch([RAW_SCSS_PATH + '**/*.scss'],['buildStyles']);
  gulp.watch([RAW_JS_PATH + '**/*.js'],['buildScripts']);
});
