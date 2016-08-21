var gulp 				= require('gulp');
var watch               = require('gulp-watch');
var path 				= require('path');
var cleanCSS            = require('gulp-clean-css');
var sass                = require('gulp-sass');
var concat              = require('gulp-concat');
var sourcemaps          = require('gulp-sourcemaps');
var uglify              = require('gulp-uglify');

gulp.task('default', ['watch']);

gulp.task('sass', function () {
    return gulp.src('app/assets/css/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('app/bin/css/'));
});

gulp.task('scripts', function () {
    return gulp.src('app/assets/js/*.js')
        .pipe(sourcemaps.init())
        .pipe(concat('all.js'))
        .pipe(uglify({ mangle: false }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('app/bin/js'));
});

gulp.task('watch', function () {
    gulp.watch('app/assets/css/*.scss', ['sass']);
    gulp.watch('app/assets/js/*.js', ['scripts']);
});