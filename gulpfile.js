const gulp = require('gulp');
const sass = require('gulp-sass');
const nodemon = require('gulp-nodemon');

gulp.task('sass', () => {
  return gulp.src(['./src/sass/*.scss'])
    .pipe(sass())
    .pipe(gulp.dest('./public/styles'));
});

gulp.task('server', () => {

});

gulp.task('local', () => {
  nodemon({
    script: 'server/index.js',
    ext: 'scss js',
    tasks: ['sass']
  });
});

gulp.task('default', () => {
  return gulp.task('sass')();
});