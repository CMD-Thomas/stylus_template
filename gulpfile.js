var gulp        = require('gulp');
var stylus 			= require('gulp-stylus');
var minifyCSS 	= require('gulp-minify-css');
var uglify 			= require('gulp-uglify');
var rename 			= require('gulp-rename');
var concat 			= require('gulp-concat');
var browserSync = require('browser-sync');

gulp.task('bootstrap', function(){
	gulp.src('source/bootstrap/*.css')
		.pipe(minifyCSS())
		.pipe(gulp.dest('build/bootstrap'))
});

gulp.task('stylus', function () {
    gulp.src('source/stylus/*.styl')
        .pipe(stylus({compress: true, paths: ['source/stylus']}))
        .pipe(minifyCSS())
        .pipe(rename('style.css'))
        .pipe(gulp.dest('build/css'))
		.pipe(browserSync.reload({stream:true}))
});

gulp.task('js', function() {
  gulp.src(['source/js/*.js'])
    .pipe(concat('output.min.js')) 
    .pipe(uglify())
    .pipe(gulp.dest('build/js'))
	.pipe(browserSync.reload({stream:true}))
});

gulp.task('html', function(){
	gulp.src('source/html/*.html')
		.pipe(gulp.dest('build'))
		.pipe(browserSync.reload({stream:true}))
});

gulp.task('watch', function () {
   gulp.watch('source/stylus/*.styl', ['stylus']);
   gulp.watch('source/html/*.html', ['html']);
   gulp.watch('source/js/*.js', ['js']);
});

gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: "build"
    }
  });
});

gulp.task('default', ['bootstrap', 'stylus', 'js', 'html','browser-sync', 'watch']);
