var gulp = require('gulp'),
    open = require('gulp-open'),
    concat = require('gulp-concat'),
    connect = require('gulp-connect'),
    browserify = require('gulp-browserify'),
    port = process.env.port || 3000;

gulp.task('browserify', function () {
    gulp.src('./src/components/main.jsx')
        .pipe(browserify({ transform: 'reactify' }))
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
        root        : 'build',
        port        : port,
        livereload  : true
    });
});

gulp.task('js', function () {
    gulp.src('./build/js/*.js')
        .pipe(connect.reload());
});

gulp.task('html', function () {
    gulp.src('./build/*.html')
        .pipe(connect.reload());
});

gulp.task('watch', function () {
    gulp.watch('./build/js/*.js',   ['js']);
    gulp.wathc('./build/*.html',    ['html']);
    gulp.watch('./src/components/*.jsx', ['browserify']);
});

gulp.task('build', ['browserify']);
gulp.task('default', ['browserify', 'connect', 'open', 'watch']);
