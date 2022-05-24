const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const watch = require('gulp-watch');

gulp.task('sass', function() {
    return gulp.src('./src/assets/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./src/assets/css/'))
})

gulp.task('watch', function(){
    gulp.watch('./src/assets/scss/**/*.scss', gulp.series('sass'))
})