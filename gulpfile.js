var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    rename = require("gulp-rename"),
    cleanCSS = require('gulp-clean-css'),
    del = require('del'),
    uglify = require('gulp-uglify'),
    pump = require('pump'),
    concat = require('gulp-concat')

gulp.task('css', ['clean'], function() {
    return gulp.src('./css/*.css')
        .pipe(concat('transition.css'))
        .pipe(autoprefixer())
        .pipe(cleanCSS())
        .pipe(rename({ suffix: '-min' }))
        .pipe(gulp.dest('./css'))
})
gulp.task('js', function(fn) {
    pump([
            gulp.src('./src/*.js'),
            // uglify(),
            gulp.dest('./')
        ],
        fn
    );
})
gulp.task('clean', function(fn) {
    return del(['./css/*-min.css'], fn)
})

gulp.task('default', ['css', 'js'])

gulp.task('watch', function() {
    gulp.watch(['./src/*.js', './css/*.css'], ['default'])
})