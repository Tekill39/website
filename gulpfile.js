//подключение модуля gulp
const gulp = require('gulp');
//concat 
const concat = require('gulp-concat');

const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync').create();
const sourcemaps= require('gulp-sourcemaps');
//const sass= require('gulp-sass');
const less= require('gulp-less');

/*const cssFiles = [
    './src/css/main.css',
    './src/css/media.css'
]*/
const cssFiles = [
    './src/css/main.less',
    './src/css/media.less'
]
const jsFiles = [
    './src/js/lib.js',
    './src/js/main.js'
]

//Tusk на стили css
function styles(){
return gulp.src(cssFiles)
.pipe(sourcemaps.init())
.pipe(less())

//объединение файлов в один
.pipe (concat('style.css'))

//Минимизация кода стилей
.pipe(cleanCSS({level: 2}))
.pipe(sourcemaps.write('./'))
//создание общей папки стилей
.pipe(gulp.dest('./build/css'))
.pipe(browserSync.stream());

} 
//Tusk  scripts JS
function scripts() {
    return gulp.src(jsFiles)
    //объединение файлов скрипта в один
    .pipe (concat('script.js'))

    //Минимизация кода скриптов
    .pipe(uglify())

    //создание общей папки скриптов
    .pipe(gulp.dest('./build/js'))
    .pipe(browserSync.stream());

}
//Function view
function watch(){
    browserSync.init({
        server: {
           baseDir: "./"
                }
    });
//следить за CSS файлами
gulp.watch('./src/css/**/*.less', styles)
//следить за JS файлами
gulp.watch('./src/js/**/*.js', scripts)
gulp.watch("./*.html").on('change', browserSync.reload);
}

//Вызывем функции
gulp.task('styles', styles);
gulp.task('scripts', scripts);
gulp.task('watch', watch);
gulp.task('build', gulp.parallel('styles', 'scripts'));
gulp.task('dev', gulp.series('build', 'watch'));

