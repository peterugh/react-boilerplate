//build system
var gulp = require('gulp');

//handles dependencies
var browserify = require('browserify');

//transpiles es6/jsx to es5
var babelify = require('babelify');

//converts reatable stream from browserify into the gulp compatible stream
var source = require('vinyl-source-stream');

//css preprocessor
var sass = require('gulp-sass');

//desktop notifications on error
var notifier = require('node-notifier');

//boots up localhost and refreshes when changes are made
var browserSync = require('browser-sync');

// necessary to have browsersync handle routing urls
var historyApiFallback = require('connect-history-api-fallback');

//minifies js
var gulpCC = require("gulp-closurecompiler");

//minifies css
var minifyCss = require('gulp-minify-css');

var RAW_PATH = './raw/';
var RAW_JS_PATH = RAW_PATH + 'js/'
var RAW_SCSS_PATH = RAW_PATH + 'scss/';
var SCRIPTS_FILENAME = 'all.js';
var DEST_PATH = './www/';
var DEST_JS_PATH = DEST_PATH + 'js/';
var DEST_CSS_PATH = DEST_PATH + 'css/';
 
gulp.task('buildScripts', function () {
  browserify({
    entries: RAW_JS_PATH + 'index.js',
    extensions: ['.js'],
    debug: true,
    paths: ['./raw/js/']
  })
    .transform(babelify, {presets: ["es2015", "stage-0", "react"]})
    .bundle()
    .on('error', function (err) {
      notifier.notify({title:'ERROR', message:'JavaScript'});
      console.log('ERROR:', err.message);
    })
    .pipe(source(SCRIPTS_FILENAME))
    .pipe(gulp.dest(DEST_JS_PATH));
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
      baseDir: DEST_PATH,
      middleware: [ historyApiFallback() ]
    }
  });
	gulp.tasks.buildStyles.fn();
	gulp.tasks.buildScripts.fn();
	gulp.watch([RAW_SCSS_PATH + '**/*.scss'],['buildStyles']);
  gulp.watch([RAW_JS_PATH + '**/*.js'],['buildScripts']);
});
 