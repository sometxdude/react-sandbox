var gulp = require('gulp');
var reactify = require('reactify');
var browserify = require('gulp-browserify');

gulp.task('copy',function(){
  gulp.src('./app/src/js/index.js').pipe(browserify()).pipe(gulp.dest('./dest/js'));
});

gulp.task('default', function(){
console.log('hello')  ;
});
