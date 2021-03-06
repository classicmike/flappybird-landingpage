var gulp = require('gulp');

var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var imagemin = require('gulp-imagemin');
var browserify = require('browserify');
var uglify = require('gulp-uglify');
var minifyHTML = require('gulp-minify-html');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

var critical = require('critical').stream;

// Javascript linting task
gulp.task('jshint', function(){
	return gulp.src('site/js/*.js')
	.pipe(jshint())
	.pipe(jshint.reporter('default'));
});

// Compile Sass task
gulp.task('sass', function(){
	return gulp.src('site/scss/**/*.scss')
	.pipe(sass())
	.pipe(gulp.dest('site/css'));
});

// Watch task
gulp.task('watch', function() {
    gulp.watch('site/js/*.js', ['jshint']);
    gulp.watch('site/scss/**/*.scss', ['sass']);
});

// Default task
gulp.task('default', ['jshint', 'sass', 'watch']);

// Minify index
gulp.task('html', ['styles'], function(){
	gulp.src('site/index.html')
    .pipe(critical({base: 'build/', inline: true, minify: true, extract: true, css: ['build/css/styles.css']}))
	.pipe(minifyHTML())
	.pipe(gulp.dest('build/'));
});

// Javascript build task, removes whitespace and concatenates all files
gulp.task('scripts', function(){
	return gulp.src('./site/js/*.js')
	.pipe(concat('app.js'))
	.pipe(uglify())
	.pipe(gulp.dest('./build/js'));
});

// Styles build task, concatenates all the files
gulp.task('styles', function(){
	gulp.src('site/css/*.css')
	.pipe(concat('styles.css'))
	.pipe(gulp.dest('build/css'));
});

// Image optimization task
gulp.task('images', function(){
	gulp.src('site/img/**/*')
	.pipe(imagemin())
	.pipe(gulp.dest('build/img'));
});

gulp.task('fonts', function(){
	gulp.src('site/fonts/*/*')
	.pipe(gulp.dest('build/fonts'));
});


// Build Task
gulp.task('build', ['jshint', 'sass', 'html', 'scripts', 'styles', 'images', 'fonts']);





