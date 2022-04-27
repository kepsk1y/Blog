const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();

function compile_sass() {
    return gulp.src('./source/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./assets/css'))
    .pipe(browserSync.stream());
};

function watch() {
    browserSync.init({
       server: {
           baseDir: "./",
           googlechrome: '-browser "chrome.exe"'
       },
       port: 8080
   });
   
   gulp.watch('./source/**/*.scss', compile_sass) 
 
   gulp.watch("./*.html").on('change', browserSync.reload);
 }

 gulp.task('compile_sass', compile_sass);

 gulp.task('watch', watch);

 gulp.task('dev', gulp.series('compile_sass', 'watch'));
