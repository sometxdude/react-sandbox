var gulp = require('gulp'),
    connect = require('gulp-connect'),
    open = require("gulp-open"),
    browserify = require('gulp-browserify'),
    clean = require('gulp-clean'),
    changed = require('gulp-changed'),
    imagemin = require('gulp-imagemin'),
    size = require('gulp-size'),
    concat = require('gulp-concat'),
    runsequence = require('run-sequence'),
    port = process.env.port || 3031;

var DEST = 'build';
// browserify and transform JSX
gulp.task('browserify', function() {
    gulp.src('./src/app.js')
      .pipe(browserify({transform: 'reactify'}))
      .pipe(gulp.dest(DEST+'/js'));
});

// launch browser in a port
gulp.task('open', function(){
  var options = {
    url: 'http://localhost:' + port,
  };
  gulp.src('./app/index.html')
  .pipe(open('', options));
});

// live reload server
gulp.task('connect', function() {
  connect.server({
    root: 'app',
    port: port,
    livereload: true
  });
});

// live reload js
gulp.task('js', function () {
  gulp.src('./app/dist/**/*.js')
    .pipe(connect.reload());
});

// live reload html
gulp.task('html', function () {
  gulp.src('./app/*.html')
    .pipe(connect.reload());
});

// watch files for live reload
gulp.task('watch', function() {
    gulp.watch('app/dist/js/*.js', ['js']);
    gulp.watch('app/index.html', ['html']);
    gulp.watch('app/src/js/**/*.js', ['browserify']);
});


gulp.task('cleanbuild',function(){
  runsequence('clean',['build'])
})

gulp.task('build',['browserify','pages','styles','images','assets'])

gulp.task('default', ['browserify','pages','images','assets']);

gulp.task('serve', ['browserify', 'connect', 'open', 'watch']);

gulp.task('clean', function () {
  return gulp.src(DEST, {read: false})
    .pipe(clean());
});
// HTML Pages
gulp.task('pages', function() {
  return gulp.src('src/pages/**')
    .pipe(changed(DEST))
    .pipe(gulp.dest(DEST))
    .pipe(size({title: 'pages'}));
});
// CSS
gulp.task('styles', function() {
  return gulp.src('src/styles/**')
    .pipe(changed(DEST))
    .pipe(gulp.dest(DEST+'/css'))
    .pipe(size({title: 'css'}));
});
// Static files
gulp.task('assets', function() {
  return gulp.src('src/assets/**')
    .pipe(changed(DEST))
    .pipe(gulp.dest(DEST))
    .pipe(size({title: 'assets'}));
});

// Images
gulp.task('images', function() {
  return gulp.src('src/images/**')
    .pipe(changed(DEST + '/images'))
    .pipe(imagemin({
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest(DEST + '/images'))
    .pipe(size({title: 'images'}));
});
