const gulp = require('gulp');
const sass = require('gulp-sass');

gulp.task('sass', () => {
  return gulp.src(['./src/sass/*.scss'])
    .pipe(sass())
    .pipe(gulp.dest('./public/styles'));
});

gulp.task('default', () => {
  console.log('Watching sass files for changes...');
  gulp.watch(['**/*.scss'], {usePolling: true}, gulp.parallel('sass'));
});