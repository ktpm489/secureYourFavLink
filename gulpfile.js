var gulp = require('gulp')
var sass = require('gulp-ruby-sass')
var browserify = require('browserify')
var source = require('vinyl-source-stream')
var bundle = require('gulp-bundle-assets')
var gulpif = require('gulp-if');
var webserver = require('gulp-webserver');
var strip = require('gulp-strip-comments');

gulp.task('browserify', function() {
    // Grabs the app.js file
    return browserify('./app/app.js')
        // bundles it and creates a file called main.js
        .bundle()
        .pipe(source('main.js'))
        // saves it the public/js/ directory
        .pipe(gulp.dest('./public/js/'));
})

gulp.task('sass', ['browserify', 'stripJsComment'], function() {
    return sass([
        'app/stylesheets/app.scss',
    ]).pipe(gulp.dest('public/css'))
})

gulp.task('sassAsync', function() {
    return sass([
        'app/stylesheets/app.scss',
    ]).pipe(gulp.dest('public/css'))
})

gulp.task('watch', function() {
    gulp.watch('app/**/*.js', ['browserify'])
    gulp.watch('app/stylesheets/**/*.scss', ['sass'])
    gulp.watch('public/js/**/*.js', ['bundleDev'])
    gulp.watch('public/css/**/*.css', ['bundleDev'])
})

gulp.task('bundleDev', function() {
    return gulp.src('./bundle-dev.config.js')
        .pipe(bundle())
        .pipe(gulp.dest('./build'));
});

gulp.task('bundleProd', ['browserify', 'stripJsComment', 'sass'], function() {
    return gulp.src('./bundle-prod.config.js')
        .pipe(bundle())
        .pipe(gulp.dest('./build'));
});
gulp.task('stripJsComment', ['browserify'], function() {
    return gulp.src('./public/js/main.js')
        .pipe(strip())
        .pipe(gulp.dest('public/js'));
});
gulp.task('webserver', function() {
    gulp.src('./')
        .pipe(webserver({
            host: 'localhost',
            port: '3000',
            fallback: 'index.html',
            open: true,
        }));
});

// gulp.task('default', ['browserify','sass','bundleDev', 'watch', 'webserver'])
gulp.task('default', ['browserify', 'sassAsync', 'bundleDev', 'watch', 'webserver'])
gulp.task('build', ['browserify', 'stripJsComment', 'sass', 'bundleProd'])