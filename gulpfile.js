var gulp = require('gulp')
var babel = require('gulp-babel')
var scss = require('gulp-scss')

var paths = {
  scss: './src/scss/*.scss',
  js: './src/**/*.es6',
  app: './app'
}

gulp.task("scss", function () {
  return gulp.src(paths.scss)
    .pipe(scss())
    .pipe(gulp.dest(paths.app))
})

gulp.task('babel', function () {
  return gulp.src(paths.js)
    .pipe(babel())
    .on('error', function(err) {
      console.log('Babel thrown an error>>>', err)

      this.emit('end')
    })
    .pipe(gulp.dest(paths.app))
})

gulp.task('watch', function() {
  gulp.watch(paths.js, ['babel'])
  gulp.watch(paths.scss, ['scss'])
})

gulp.task('default', ['babel', 'scss', 'watch'])
