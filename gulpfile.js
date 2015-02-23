var gulp       = require('gulp'),
    open       = require('gulp-open'),
    jade       = require('gulp-jade'),
    stylus     = require('gulp-stylus'),
    concat     = require('gulp-concat'),
    connect    = require('gulp-connect'),
    rename     = require('gulp-rename'),
    browserify = require('gulp-browserify'),
    port       = process.env.port || 3000;

gulp.task('browserify', function () {
    gulp.src('./src/components/main.jsx')
        .pipe(browserify({ transform: 'reactify' }))
        .pipe(rename('main.js'))
        .pipe(gulp.dest('./build/js/'));
});

gulp.task('open', function () {
    var options = {
        url: 'http://localhost:' + port
    };

    gulp.src('./build/index.html')
        .pipe(open('', options));
});

gulp.task('connect', function () {
    connect.server({
        root       : 'build',
        port       : port,
        livereload : true
    });
});

gulp.task('jade', function () {
    gulp.src('./src/index.jade')
        .pipe(jade({
            locals: {}
        }))
        .pipe(gulp.dest('./build/'));
});

gulp.task('stylus', function () {
    gulp.src('./src/style.styl')
        .pipe(stylus())
        .pipe(gulp.dest('./build/css/'));
});

gulp.task('js', function () {
    gulp.src('./build/js/*.js')
        .pipe(connect.reload());
});

gulp.task('html', function () {
    gulp.src('./build/*.html')
        .pipe(connect.reload());
});

gulp.task('css', function () {
    gulp.src('./build/css/*.css')
        .pipe(connect.reload());
});

gulp.task('watch', function () {
    gulp.watch('./build/js/*.js',   ['js']);
    gulp.watch('./build/*.html',    ['html']);
    gulp.watch('./build/css/*.css',    ['css']);
    gulp.watch('./src/components/*.jsx', ['browserify']);
    gulp.watch('./index.jade', ['jade']);
    gulp.watch('./src/style.styl', ['stylus']);
});

gulp.task('build', ['browserify', 'jade', 'stylus']);
gulp.task('develop', ['build', 'connect', 'open', 'watch']);
gulp.task('default', ['build']);
